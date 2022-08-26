import path from 'path';
import { pathsToModuleNameMapper } from 'ts-jest/utils';
import type { Config } from '@jest/types';

import {
  ROOT_DIR_PATH,
  TS_CONFIG_PATH,
  JEST_DIST_DIR_PATH,
  PLATFORM_TESTS_DIR_PATH,
  BABEL_CONFIG_PATH,
  TEAMS_DIR_PATH
} from '@bx-fe/platform-build';

const tsconfig = require(TS_CONFIG_PATH);
const config: Config.InitialOptions = {
  displayName: 'Ozon.ru',
  rootDir: ROOT_DIR_PATH,
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: [
    path.join(PLATFORM_TESTS_DIR_PATH, 'unit/setup.ts')
  ],
  globals: {
    'ts-jest': {
      tsconfig: TS_CONFIG_PATH,
      babelConfig: BABEL_CONFIG_PATH,
      diagnostics: false
    },
    // Turn off CSS compilation
    'vue-jest': {
      experimentalCSSCompile: false
    }
  },
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'vue', 'module.css', 'module.pcss', 'json', 'html'],
  moduleNameMapper: {
    '\\.(css|pcss)\\?module$': 'identity-obj-proxy',
    ...pathsToModuleNameMapper(tsconfig.compilerOptions.paths, { prefix: '<rootDir>/' })
  },
  testPathIgnorePatterns: [
    '/node_modules/'
  ],
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.vue$': '@vue/vue2-jest',
    '^.+\\.html$': 'html-loader-jest',
    '^.+\\.(css|pcss|svg)$': 'jest-transform-stub'
  },
  transformIgnorePatterns: [
    '/node_modules/(?!@fe/icons/)'
  ],
  reporters: [
    'default',
    path.join(PLATFORM_TESTS_DIR_PATH, 'unit/reporters/total-coverage-reporter.js'),
    ['jest-junit', { outputDirectory: path.join(JEST_DIST_DIR_PATH, 'report') }]
  ],
  coverageDirectory: path.join(JEST_DIST_DIR_PATH, 'coverage'),
  coverageReporters: ['text-summary', 'json-summary', 'lcov'],
  collectCoverageFrom: [
    path.join(TEAMS_DIR_PATH, '**/*.{js,ts}')
  ],
};

// Do not import in main build due to tree shaking
export default config;
