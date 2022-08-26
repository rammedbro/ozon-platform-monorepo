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
          targets: [{
            src: path.join(basePath, 'src', 'schemes'),
            dest: distPath
          }]
        })
      ],
      external: [
        '@bx-fe/vue/packages/vue-server-renderer',
        '@bx-fe/platform-build/dist/configs/webpack.config'
      ]
    }
  },
];
