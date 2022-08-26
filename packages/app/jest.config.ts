import type { Config } from '@jest/types';
import { pathsToModuleNameMapper } from 'ts-jest/utils';

import tsConfig from './tsconfig.json';

const config: Config.InitialOptions = {
  rootDir: '.',
  testEnvironment: 'jsdom',
  testMatch: [
    '<rootDir>/src/application/**/*.test.ts',
  ],
  moduleNameMapper: pathsToModuleNameMapper(
    tsConfig.compilerOptions.paths,
    { prefix: '<rootDir>/' }
  ),
};

export default config;
