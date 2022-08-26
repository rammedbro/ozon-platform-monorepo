import { isObject } from 'lodash';
import { getDirectories } from '@bx-fe/platform-shared';

import { PLATFORM_CONFIG_PATH, TEAMS_DIR_PATH, TEAMS_BUILD_PRESETS } from '~/src/constants';
import type { IPlatformOptions, IPlatformConfig } from '~/src/types';

export function getPlatformConfig(): IPlatformConfig {
  const config = require(PLATFORM_CONFIG_PATH);

  if (!isObject(config)) {
    throw new Error('Invalid platform config file. You must export an object.');
  }

  return config as IPlatformConfig;
}

export function getPlatformTeams(options: IPlatformOptions): string[] {
  const teams = new Set(
    options.preset
      ? TEAMS_BUILD_PRESETS[options.preset]
      : options.teams
        ? getDirectories(TEAMS_DIR_PATH).filter(dir => options.teams.includes(dir))
        : getDirectories(TEAMS_DIR_PATH)
  );

  if (options.env !== 'test') {
    teams.add('layout');
    teams.add('shared');
  }

  return Array.from(teams);
}
