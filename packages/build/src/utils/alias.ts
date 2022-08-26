import { join, relative } from 'path';
import { isDirectory } from '@bx-fe/platform-shared';
import type { MapLike } from 'typescript';

import {
  ROOT_DIR_PATH,
  PLATFORM_APP_DIR_PATH,
  LAYOUTS_DIR_PATH,
  SERVICES_DIR_PATH,
  PLATFORM_SERVICES_DIR_PATH,
  PLATFORM_TEAMS_DIR_PATH,
  TEAMS_DIR_PATH,
  UI_KIT_PATH,
  PLATFORM_STORE_DIR_PATH,
  PLATFORM_TESTS_DIR_PATH
} from '~/src/constants';
import { getPlatformConfig } from '~/src/utils/build';

export function getPlatformAliases(options: {
  relative?: boolean;
} = {}): MapLike<string | string[]> {
  // Default alias
  const aliases: MapLike<string | string[]> = {
    '~': ROOT_DIR_PATH,
    '@': ROOT_DIR_PATH,
    '@app': PLATFORM_APP_DIR_PATH,
    '@store': PLATFORM_STORE_DIR_PATH,
    '@tests': PLATFORM_TESTS_DIR_PATH,
    '@teams': [PLATFORM_TEAMS_DIR_PATH, TEAMS_DIR_PATH],
    '@services': [PLATFORM_SERVICES_DIR_PATH, SERVICES_DIR_PATH],
    '@layouts': LAYOUTS_DIR_PATH,
    '@ui-kit': UI_KIT_PATH
  };
  const teamsPaths = aliases['@teams'] as string[];
  const doublePathTeams = ['composer', 'common', 'layout'];
  doublePathTeams.forEach(team => {
    aliases[`~${team}`] = teamsPaths.map(path => join(path, team));
    aliases[`@${team}`] = teamsPaths.map(path => join(path, team, 'components'));
  });

  // Teams alias
  // fs.readdirSync(TEAMS_DIR_PATH).forEach(team => {
  //   const teamDir = join(TEAMS_DIR_PATH, team);
  //
  //   if (!isDirectory(teamDir)) return;
  //
  //   aliases[`~${team}`] = teamDir;
  //
  //   const teamComponentsDir = join(TEAMS_DIR_PATH, team, 'components');
  //   if (fs.existsSync(teamComponentsDir)) {
  //     aliases[`@${team}`] = teamComponentsDir;
  //   }
  // });

  // Config alias
  const config = getPlatformConfig();
  Object.assign(aliases, Object.fromEntries(Object.entries(config.alias).map(
    ([alias, path]) => [alias, join(ROOT_DIR_PATH, path)]
  )));

  if (options.relative) {
    Object.assign(aliases, Object.fromEntries(Object.entries(aliases).map(
      ([alias, path]) => [
        alias, Array.isArray(path)
          ? path.map(item => relative(ROOT_DIR_PATH, item))
          : relative(ROOT_DIR_PATH, path)
      ]
    )));
  }

  return aliases;
}

export function getPlatformAliasesForTypescript(): MapLike<string[]> {
  const aliases = getPlatformAliases();
  const result: MapLike<string[]> = {};

  Object.entries(aliases).forEach(
    ([alias, path]) => {
      const paths = Array.isArray(path) ? path : [path];
      const relativePaths = paths.map(path => relative(ROOT_DIR_PATH, path) || '.');
      result[alias] = relativePaths;

      if (Array.isArray(path) || isDirectory(path)) {
        result[`${alias}/*`] = relativePaths.map(path => `${path}/*`);
      }
    });

  return result;
}
