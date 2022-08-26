import path from 'path';
import nodeExternals from 'webpack-node-externals';
import VueSSRServerPlugin from '@bx-fe/vue/packages/vue-server-renderer/server-plugin';
import type { Configuration } from 'webpack';

import { compileWithWebpack } from '~/src/configs/webpack/utils/compile-with-webpack';
import { OzonClientManifestPlugin } from '~/src/configs/webpack/plugins/manifest/client';

export const createClientManifest = (cb) => {
  const compileConfig: Configuration = {
    entry: path.resolve('packages/build/tests/fixtures/app.js'),
    output: {
      path: path.resolve('dist'),
      filename: 'app.js',
      chunkFilename: '[name].js',
      publicPath: '/_nuxt/'
    },
    plugins: [
      new OzonClientManifestPlugin({
        filename: 'client.manifest.json'
      })
    ]
  };

  compileWithWebpack(compileConfig, fs => {
    const manifest = JSON.parse(
      fs.readFileSync(path.join(compileConfig.output.path, 'client.manifest.json'))
    );

    cb(manifest);
  });
};

export const createServerManifest = (file, cb) => {
  const compileConfig: Configuration = {
    target: 'node',
    devtool: false,
    entry: path.resolve(__dirname, '..', file),
    output: {
      path: path.resolve('dist'),
      filename: 'bundle.js',
      libraryTarget: 'commonjs2'
    },
    externals: [
      nodeExternals({
        modulesDir: 'node_modules'
      })
    ],
    plugins: [
      new VueSSRServerPlugin({
        filename: 'server.manifest.json'
      })
    ]
  };

  compileWithWebpack(compileConfig, fs => {
    const serverManifest = JSON.parse(
      fs.readFileSync(path.join(compileConfig.output.path, 'server.manifest.json'))
    );

    cb(serverManifest);
  });
};
