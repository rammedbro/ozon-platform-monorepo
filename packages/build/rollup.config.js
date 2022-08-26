const copy = require('rollup-plugin-copy');
const path = require('path');

const basePath = __dirname;
const distPath = path.join(basePath, 'dist');

module.exports = [
  {
    name: 'main',
    config: {
      plugins: [
        copy({
          targets: [
            { src: path.join(basePath, 'src', 'templates'), dest: distPath },
            { src: path.join(basePath, 'src', 'envs'), dest: distPath }
          ]
        })
      ]
    }
  },
  {
    name: 'webpack',
    config: {
      input: 'src/configs/webpack/index.ts',
      output: {
        file: 'dist/configs/webpack.config.js',
        format: 'cjs',
        exports: 'named'
      },
      external: [
        'vue-server-renderer/server-plugin'
      ]
    }
  },
  {
    name: 'jest',
    options: {
      types: false,
    },
    config: {
      input: 'src/configs/jest.ts',
      output: {
        file: 'dist/configs/jest.config.js',
        format: 'cjs',
        exports: 'default'
      },
      external: [
        'ts-jest/utils',
        'regenerator-runtime/runtime'
      ]
    }
  },
  {
    name: 'e2e',
    options: {
      types: false,
    },
    config: {
      input: 'src/configs/e2e.ts',
      output: {
        file: 'dist/configs/e2e.config.js',
        format: 'cjs',
        exports: 'default'
      },
      external: [
        'regenerator-runtime/runtime',
      ]
    }
  }
];
