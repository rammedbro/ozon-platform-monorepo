import type { Config } from 'stylelint';

import { IGNORED_PATHS } from '~/src/constants';

export const stylelintConfig: Config = {
  extends: '@bx-fe/stylelint-config',
  ignoreFiles: IGNORED_PATHS
};
