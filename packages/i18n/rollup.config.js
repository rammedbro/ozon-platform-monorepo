const path = require('path');
const multiInput = require('rollup-plugin-multi-input').default;

const basePath = __dirname;
const clientPath = path.join(basePath, 'src', 'app', 'client');

module.exports = [
  {
    name: 'main'
  },
  {
    name: 'client',
    options: {
      types: false,
    },
    config: {
      input: [
        path.join(clientPath, 'entries', '*.ts'),
        { pluralizers: path.join(clientPath, 'utils', 'pluralizers.ts') },
        { expose: path.join(clientPath, 'utils', 'expose.ts') }
      ],
      output: {
        dir: 'dist/app/client',
        file: undefined,
        format: 'esm',
      },
      plugins: [
        multiInput({ relative: clientPath })
      ],
      external: [
        '~/.build/translations.client',
        /dayjs\/esm\/locale/
      ]
    }
  },
  {
    name: 'builtin-lexemes',
    options: {
      types: false,
    },
    config: {
      input: 'src/builtin-lexemes.ts',
      output: {
        file: 'dist/builtin-lexemes.js',
        format: 'cjs',
        exports: 'default'
      },
    }
  },
];
