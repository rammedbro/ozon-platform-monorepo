import type { Linter } from 'eslint';

import { TS_CONFIG_PATH, WEBPACK_ALIAS_CONFIG_PATH, IGNORED_PATHS } from '~/src/constants';

export const eslintConfig: Linter.Config = {
  plugins: [
    '@bx-fe/vue'
  ],
  extends: [
    'plugin:@bx-fe/vue/typescript'
  ],
  settings: {
    'import/resolver': {
      webpack: {
        config: WEBPACK_ALIAS_CONFIG_PATH
      },
      typescript: {
        project: [
          TS_CONFIG_PATH
        ]
      }
    }
  },
  ignorePatterns: IGNORED_PATHS
};
