const path = require('path');
const copy = require('rollup-plugin-copy');

const basePath = __dirname;
const distPath = path.join(basePath, 'dist');

module.exports = [
  {
    name: 'main',
    config: {
      plugins: [
        copy({
          targets: [{
            src: ['src/*', '!src/layouts/*', '!src/index.ts'].map(pattern => path.join(basePath, pattern)),
            dest: path.join(distPath, 'lib')
          }]
        })
      ]
    }
  },
];
