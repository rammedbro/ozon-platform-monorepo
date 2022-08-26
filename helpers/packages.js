const fs = require('fs');
const path = require('path');
const lerna = require('@lerna/project');
const git = require('simple-git')();
const typescript2 = require('rollup-plugin-typescript2');
const typescriptCompiler = require('ttypescript');
const nodeResolve = require('@rollup/plugin-node-resolve').default;
const nodeExternals = require('rollup-plugin-node-externals').default;
const commonjs = require('@rollup/plugin-commonjs');
const json = require('@rollup/plugin-json');
const filesize = require('rollup-plugin-filesize');
const dts = require('rollup-plugin-dts').default;
const del = require('rollup-plugin-delete');
const deepmerge = require('deepmerge');
const { rollup } = require('rollup');

const { execSync } = require('./node');

function getPackagesCacheDecorator() {
  let cache;

  return async function () {
    if (!cache) {
      cache = await getPackages();
    }

    return cache;
  };
}

async function getPackages() {
  const packages = await lerna.getPackages(process.cwd());
  return packages.filter(pkg => !pkg.toJSON().private);
}

async function sortPackagesTopologically(packages) {
  const { stdout } = await execSync('npx lerna ls --toposort');
  const sortedPackages = stdout.trim().split('\n');

  return packages.sort((a, b) =>
    sortedPackages.indexOf(a.name) - sortedPackages.indexOf(b.name)
  );
}

async function getChangedPackagesFiles(since) {
  const packages = await getPackages();
  const changedPackages = packages.map(pkg => [
    path.relative(process.cwd(), pkg.location),
    [pkg, []]
  ]);
  const options = ['--stat', '--name-only', since].filter(Boolean);

  await git.fetch('origin', 'master');
  const strChangedFiles = await git.diff(options);
  const changedFiles = strChangedFiles.split('\n');
  changedFiles.forEach(file => {
    for (const [pkgPath, [, files]] of changedPackages) {
      if (file.startsWith(pkgPath)) {
        files.push(file);
      }
    }
  });

  return changedPackages
    .map(([, data]) => data)
    .filter(([, files]) => files.length > 0);
}

async function getChangedPackages(since) {
  const result = await getChangedPackagesFiles(since);
  return result.map(([pkg]) => pkg);
}

function getPackageDefaultRollupConfig(pkg, options = {}) {
  const {
    main,
    dependencies = {},
    peerDependencies = {},
  } = pkg.toJSON();
  const {
    types = true
  } = options;

  const config = {
    input: path.join(pkg.location, 'src', 'index.ts'),
    output: {
      file: path.join(pkg.location, main),
      format: 'cjs',
    },
    external: [
      pkg.name,
      ...Object.keys(dependencies),
      ...Object.keys(peerDependencies)
    ],
    plugins: [
      typescript2({
        typescript: typescriptCompiler,
        tsconfig: path.join(pkg.location, 'tsconfig.json'),
        check: true,
        abortOnError: true,
        useTsconfigDeclarationDir: true,
        tsconfigOverride: types ? {
          compilerOptions: {
            declaration: true,
            declarationMap: true,
            rootDir: pkg.location,
            outDir: 'dist/js',
            declarationDir: 'dist/dts',
          }
        } : undefined,
      }),
      nodeResolve({
        skip: ['lodash']
      }),
      nodeExternals(),
      commonjs({
        ignoreDynamicRequires: true,
      }),
      json(),
      filesize()
    ],
  };

  return config;
}

async function getPackageTypesRollupConfig(config) {
  const [scope, pkgName] = config.name.split('/');
  const packages = await getPackages();
  const pkg = packages.find(item => item.name === [scope, pkgName].join('/'));
  const declarationDir = path.join(pkg.location, 'dist', 'dts');

  const input = path.join(
    declarationDir,
    path.relative(pkg.location, path.dirname(config.config.input)),
    path.basename(config.config.input, '.ts') + '.d.ts'
  );
  const output = path.join(
    pkg.location,
    path.relative(pkg.location, path.dirname(config.config.output.file)),
    path.basename(config.config.output.file, '.js') + '.d.ts'
  );

  return {
    name: `${config.name}/types`,
    options: {
      types: false,
    },
    config: {
      input,
      output: {
        file: output,
        format: 'cjs'
      },
      plugins: [
        nodeExternals(),
        dts(),
        del({
          targets: [output],
          hook: 'buildStart'
        }),
        del({
          targets: declarationDir,
          hook: 'buildEnd'
        })
      ],
    }
  };
}

function getPackageRollupConfigs(pkg) {
  const configs = [];
  const localRollupConfigPath = path.join(pkg.location, 'rollup.config.js');

  if (fs.existsSync(localRollupConfigPath)) {
    const localRollupConfig = require(localRollupConfigPath);
    const localConfigs = localRollupConfig.map(config => ({
      ...config,
      name: `${pkg.name}/${config.name}`,
    }));
    const mergedConfigs = localConfigs.map(item => {
      const { external = 'merge' } = item.options || {};
      const config = item.config || {};
      const merged = {
        ...item,
        config: deepmerge(getPackageDefaultRollupConfig(pkg, item.options), config, {
          customMerge: key => {
            if (key === 'output') {
              return (a, b) => deepmerge(a, b, { arrayMerge: (target, source) => source });
            }

            if (key === 'external') {
              return (external === 'merge')
                ? (a, b) => [...a, ...b]
                : (a, b) => b;
            }

            return undefined;
          }
        })
      };

      const inMultiInputConfig = !!merged.config.plugins.find(plugin => plugin.pluginName === 'rollup-plugin-multi-input');
      if (!inMultiInputConfig) {
        merged.config.input = path.resolve(pkg.location, merged.config.input);
      }

      if (merged.config.output.dir) {
        merged.config.output.dir = path.resolve(pkg.location, merged.config.output.dir);
      } else {
        merged.config.output.file = path.resolve(pkg.location, merged.config.output.file);
      }

      merged.config.plugins.push(
        del({
          targets: merged.config.output.dir || merged.config.output.file,
          hook: 'buildStart'
        })
      );

      return merged;
    });

    configs.push(...mergedConfigs);
  } else {
    configs.push({ name: `${pkg.name}/main`, config: getPackageDefaultRollupConfig(pkg) });
  }

  return configs;
}

async function rollupPackageConfig(config) {
  const bundle = await rollup(config.config);
  await bundle.write(config.config.output);
  await bundle.close();

  const { types = true } = config.options || {};

  if (types) {
    await getPackageTypesRollupConfig(config)
      .then(rollupPackageConfig);
  }
}

module.exports = {
  getPackages: getPackagesCacheDecorator(),
  sortPackagesTopologically,
  getChangedPackages,
  getPackageRollupConfigs,
  rollupPackageConfig,
  getChangedPackagesFiles
};
