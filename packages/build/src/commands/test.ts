import path from 'path';
import { runCLI } from 'jest';
import { Runner } from '@bx-fe/e2e-runner-app';
import type Jest from '@jest/types';

import {
  ROOT_DIR_PATH,
  PLATFORM_TESTS_DIR_PATH,
  TEAMS_DIR_PATH,
  JEST_CONFIG_PATH,
  E2E_CONFIG_PATH,
} from '~/src/constants';
import type { IPlatformOptions } from '~/src/types';

export async function testUnit(
  files: string[] = [],
  // @ts-ignore
  jestOptions: Jest.Config.Argv = {},
  platformOptions: IPlatformOptions = {},
): Promise<void> {
  const { teams } = platformOptions;
  await runCLI({
    ...jestOptions,
    config: JEST_CONFIG_PATH,
    globals: JSON.stringify({
      BUILD_TEAMS: teams
    }),
    testMatch: [
      ...files.length
        ? files
          .filter(file => teams.some(team => file.startsWith(team)))
          .map(file => path.join(ROOT_DIR_PATH, file))
        : [
          path.join(TEAMS_DIR_PATH, `(${teams.join('|')})`, '**/*.test.ts'),
          path.join(PLATFORM_TESTS_DIR_PATH, 'unit/specs/**/*.test.ts')
        ],
    ]
  }, [ROOT_DIR_PATH]);
}

export async function testE2E(): Promise<void> {
  await Runner.run(E2E_CONFIG_PATH);
}
