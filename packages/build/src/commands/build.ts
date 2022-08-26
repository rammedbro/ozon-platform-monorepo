import fs from 'fs-extra';
import path from 'path';
import glob from 'fast-glob';
import webpack from 'webpack';
import { buildHashMapFromCSSModuleFiles } from '@bx-fe/css-loader-hash-webpack-plugin';
import { isDirectory } from '@bx-fe/platform-shared';
import { prepareTranslations } from '@bx-fe/platform-i18n';
import type { IE2EScreenshotsScenario } from '@bx-fe/platform-types';

import {
  REV_PATH,
  PLATFORM_APP_DIR_PATH,
  PLATFORM_TEAMS_DIR_PATH,
  TEAMS_DIR_PATH,
  LAYOUTS_DIR_PATH,
  WEBPACK_CONFIG_PATH,
  STYLE_HASH_MAP_PATH,
  LEXEMES_HASH_MAP_PATH,
  TRANSLATIONS_CLIENT_BUILD_PATH,
  TRANSLATIONS_SERVER_BUILD_PATH,
  POSTCSS_CONFIG_PATH,
  GITLAB_CI_E2E_CONFIG_PATH,
  MOCKS_DIR_PATH
} from '~/src/constants';
import type {
  IWebpackOptions,
  TWebpackConfigs,
  IPlatformOptions,
  TPlatformCommandFnWithArgs
} from '~/src/types';

export const buildApp: TPlatformCommandFnWithArgs = async function (
  names: string[] = [],
  webpackOptions?: IWebpackOptions,
  platformOptions?: IPlatformOptions
): Promise<void> {
  const configs: TWebpackConfigs = require(WEBPACK_CONFIG_PATH).configs;
  let entries = Object.entries(configs);
  if (names.length) {
    entries = entries.filter(([name]) => names.includes(name));
  }

  await Promise.all(entries.map(([, configFn]) => new Promise<void>(((resolve, reject) => {
    webpack(configFn(webpackOptions, platformOptions), (err, stats) => {
      if (err || stats.hasErrors()) {
        reject(new Error(['Platform building has errors:', err, stats].join('\n')));
      }

      resolve();
    });
  }))));
};

export const buildRev: TPlatformCommandFnWithArgs = async function (): Promise<void> {
  const BUILD_INFO = {
    BRANCH_NAME: process.env.CI_COMMIT_REF_NAME || 'unknown',
    COMMIT_TITLE: process.env.CI_COMMIT_TITLE || 'unknown',
    COMMIT_SHA: process.env.CI_COMMIT_SHA || 'unknown',
    BUILD_DATE: new Date()
  };

  fs.outputFileSync(REV_PATH, JSON.stringify(BUILD_INFO), 'utf8');
};

export const buildStyleHashMap: TPlatformCommandFnWithArgs = function (): Promise<void> {
  return buildHashMapFromCSSModuleFiles([
    PLATFORM_TEAMS_DIR_PATH,
    TEAMS_DIR_PATH,
    LAYOUTS_DIR_PATH
  ], {
    outputPath: STYLE_HASH_MAP_PATH,
    configPath: POSTCSS_CONFIG_PATH,
  });
};

export const buildTranslations: TPlatformCommandFnWithArgs = function (): Promise<void> {
  return prepareTranslations(
    [
      PLATFORM_APP_DIR_PATH,
      PLATFORM_TEAMS_DIR_PATH,
      TEAMS_DIR_PATH,
    ],
    LEXEMES_HASH_MAP_PATH,
    TRANSLATIONS_CLIENT_BUILD_PATH,
    TRANSLATIONS_SERVER_BUILD_PATH
  );
};

export const buildResources: TPlatformCommandFnWithArgs = async function (): Promise<void> {
  await Promise.all([
    buildStyleHashMap(),
    buildTranslations(),
    buildRev()
  ]);
};

export const buildScreenshotsPipelineConfig: TPlatformCommandFnWithArgs = function (): void {
  const service = 'moon';
  const browsers = ['chrome', 'firefox', 'safari'];
  const configPath = path.join(__dirname, 'templates', '.gitlab-ci.e2e.yml');
  let config = fs.readFileSync(configPath, { encoding: 'utf-8' });

  function makeJob(service: string, browser: string, team: string): string {
    return `
    ${team}:${browser}:test:screenshot:
      <<: *test
      variables:
        E2E_BROWSER_SERVICE: ${service}
        E2E_BROWSER_NAME: ${browser}
        E2E_TEAM: ${team}`;
  }

  browsers.forEach(browser => {
    glob.sync(`${TEAMS_DIR_PATH}/*`).forEach(teamPath => {
      if (!isDirectory(teamPath)) return;

      const screenshotScenarios = glob.sync('screenshots/**/*.screenshot.ts', { cwd: teamPath });

      if (!screenshotScenarios.length) return;

      const team = path.basename(teamPath);
      config += '\n\n' + makeJob(service, browser, team);
    });
  });

  fs.writeFileSync(GITLAB_CI_E2E_CONFIG_PATH, config, { encoding: 'utf-8' });
};

export const buildScreenshotsComposerResponses: TPlatformCommandFnWithArgs = function (): void {
  glob.sync(`${TEAMS_DIR_PATH}/**/screenshots/**/*.screenshot.ts`)
    .forEach(scenarioPath => {
      const scenario: IE2EScreenshotsScenario = require(scenarioPath).default;
      const json = JSON.stringify(scenario.composerResponse);
      const outputPath = path.join(
        MOCKS_DIR_PATH,
        scenarioPath.replace('.screenshot.ts', '.json')
      );

      fs.writeFileSync(outputPath, json, { encoding: 'utf-8' });
    });
};
