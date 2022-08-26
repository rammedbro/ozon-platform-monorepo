import { TEAMS_BUILD_PRESETS } from '~/src/constants';

export interface IPlatformConfig {
  alias?: Record<string, string>;
}

export type TPlatformEnv = 'local' | 'dev' | 'stg' | 'prod' | 'test';

export interface IPlatformOptions {
  env?: TPlatformEnv;
  teams?: string[];
  config?: IPlatformConfig;
  preset?: keyof typeof TEAMS_BUILD_PRESETS;
}

export type TPlatformCommandFnWithArgs = <T extends Record<string, any>>(
  args?: any[],
  commandOptions?: T,
  platformOptions?: IPlatformOptions
) => any | Promise<any>;
export type TPlatformCommandFnWithoutArgs = <T extends Record<string, any>>(
  commandOptions?: T,
  platformOptions?: IPlatformOptions
) => any | Promise<any>;
