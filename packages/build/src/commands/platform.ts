import fs from 'fs-extra';
import path from 'path';
import consola from 'consola';
import dotenv from 'dotenv';
import { installApplication } from '@bx-fe/platform-app';

import {
  tsConfigFn,
  lintStagedConfigFn,
  postcssConfig,
  eslintConfig,
  stylelintConfig,
  lsLintConfig,
  babelConfig
} from '~/src/configs';
import {
  NODE_MODULES_DIR_PATH,
  BABEL_CONFIG_PATH,
  POSTCSS_CONFIG_PATH,
  TS_CONFIG_PATH,
  JS_CONFIG_PATH,
  WEBPACK_CONFIG_PATH,
  SERVICE_WORKER_DIR_PATH,
  PLATFORM_DIR_PATH,
  JEST_CONFIG_PATH,
  E2E_CONFIG_PATH,
  ESLINT_CONFIG_PATH,
  STYLELINT_CONFIG_PATH,
  LSLINT_CONFIG_PATH,
  LINT_STAGED_CONFIG_PATH,
  IGNORED_PATHS,
  WEBPACK_ALIAS_CONFIG_PATH,
  PLATFORM_ENVS_DIR_PATH,
} from '~/src/constants';
import { getPlatformAliases } from '~/src/utils';
import type { TPlatformEnv } from '~/src/types';

function installTypescriptConfig(): void {
  const tsConfigJson = tsConfigFn().toJSON();
  fs.outputFileSync(TS_CONFIG_PATH, tsConfigJson, { encoding: 'utf-8' });
  fs.outputFileSync(JS_CONFIG_PATH, tsConfigJson, { encoding: 'utf-8' });
}

function installWebpackConfig(): void {
  const input = path.join(__dirname, 'configs', 'webpack.config.js');
  fs.copySync(input, WEBPACK_CONFIG_PATH);
}

function installWebpackAliasConfig(): void {
  const config = {
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue', '.json', '.html', '.css', '.pcss'],
      alias: getPlatformAliases()
    }
  };
  const content = `module.exports = ${JSON.stringify(config, null, 2)};`;
  fs.outputFileSync(WEBPACK_ALIAS_CONFIG_PATH, content, { encoding: 'utf-8' });
}

function installBabelConfig(): void {
  const content = `module.exports = ${JSON.stringify(babelConfig, null, 2)};`;
  fs.outputFileSync(BABEL_CONFIG_PATH, content, { encoding: 'utf-8' });
}

function installPostcssConfig(): void {
  const content = `module.exports = ${JSON.stringify(postcssConfig, null, 2)};`;
  fs.outputFileSync(POSTCSS_CONFIG_PATH, content, { encoding: 'utf-8' });
}

function installJestConfig(): void {
  const input = path.join(__dirname, 'configs', 'jest.config.js');
  fs.copySync(input, JEST_CONFIG_PATH);
}

function installE2EConfig(): void {
  const input = path.join(__dirname, 'configs', 'e2e.config.js');
  fs.copySync(input, E2E_CONFIG_PATH);
}

function installEslintConfig(): void {
  const content = JSON.stringify(eslintConfig, null, 2);
  fs.outputFileSync(ESLINT_CONFIG_PATH, content, { encoding: 'utf-8' });
}

function installStylelintConfig(): void {
  const content = JSON.stringify(stylelintConfig, null, 2);
  fs.outputFileSync(STYLELINT_CONFIG_PATH, content, { encoding: 'utf-8' });
}

function installLslintConfig(): void {
  const config =
    'ls:\n' +
    Object.entries(lsLintConfig).map(([ext, rule]) => `  ${ext}: ${rule}`).join('\n') + '\n' +
    'ignore:\n' +
    [
      ...IGNORED_PATHS,
      '.o3',
      '.husky',
      '.gitlab'
    ].map(item => `  - ${item}`).join('\n');
  fs.outputFileSync(LSLINT_CONFIG_PATH, config, { encoding: 'utf-8' });
}

function installLintStagedConfig(): void {
  const content = `module.exports = ${JSON.stringify(lintStagedConfigFn(), null, 2)};`;
  fs.outputFileSync(LINT_STAGED_CONFIG_PATH, content, { encoding: 'utf-8' });
}

function installConfigs(): void {
  installTypescriptConfig();
  installWebpackConfig();
  installWebpackAliasConfig();
  installBabelConfig();
  installPostcssConfig();
  installJestConfig();
  installE2EConfig();
  installLintStagedConfig();
  installEslintConfig();
  installStylelintConfig();
  installLslintConfig();
}

function installEnvs(): void {
  fs.copySync(
    path.join(__dirname, 'envs'),
    PLATFORM_ENVS_DIR_PATH
  );
}

function installServiceWorker(): void {
  fs.copySync(
    path.join(NODE_MODULES_DIR_PATH, '@bx-fe/ozon-sw/dist'),
    path.join(SERVICE_WORKER_DIR_PATH)
  );
}

export function platformInstall(): void {
  platformUninstall();

  installApplication(PLATFORM_DIR_PATH);
  installConfigs();
  installEnvs();
  installServiceWorker();
}

export function platformUninstall(): void {
  fs.removeSync(PLATFORM_DIR_PATH);
  fs.removeSync(TS_CONFIG_PATH);
  fs.removeSync(JS_CONFIG_PATH);
  fs.removeSync(LSLINT_CONFIG_PATH);
}

export function platformSetEnv(env: TPlatformEnv = 'prod'): void {
  dotenv.config({ path: path.join(PLATFORM_ENVS_DIR_PATH, `.env.${env}`) });
}

export function platformInfo(): void {
  consola.info('----------    Some information:    --------------');

  consola.success('Confluence');
  consola.info('- Ссылка на пространство BXFE в confluence - https://confluence.ozon.ru/display/BXFE');
  consola.info('- С чего начать? - https://confluence.ozon.ru/pages/viewpage.action?pageId=109811335');
  consola.info('- Как всё устроено, куда глядеть? - https://confluence.ozon.ru/pages/viewpage.action?pageId=109811383');

  consola.success('Slack');
  consola.info('- Общий чат по фронтенду - #frontend');
  consola.info('- Релизы фронта - #frontend_releases');
  consola.info('- Ревью кода bx-fe - #bx-fe-review');
  consola.info('- Полезные нотификации об ошибках - #bx-fe-errors/#bx-fe-alerts');
  consola.info('- Все вопросы по решению проблем с композером - #composer-user-group');
  consola.info('- Все вопросы по решению проблем с ci/cd - #ci-cd');
  consola.info('- Упали тесты, пиши сюда - #ui-tests-on-ts');
  consola.info('- Всё ломается здесь - #firefighters, #firefighters-stg');

  consola.success('Общее');
  consola.info('Для разработки необходимо скачать composer-proxy - https://gitlab.ozon.ru/bx/composer-proxy');
  consola.info('Как работать с router - https://gitlab.ozon.ru/frontend/ozon.ru/-/blob/master/application/core/router/README.md');
  consola.info('Наш ui-kit - https://gitlab.ozon.ru/bx-fe/ui-kit');

  consola.info('-------------------------------------------------\n\n');
}
