import type { TPlatformCommandFnWithoutArgs } from '~/src/types';

export interface IWebpackOptions {
  analyze?: boolean;
}

export type TWebpackConfigNames = 'client' | 'server' | 'i18n';
export type TWebpackConfigs = Record<TWebpackConfigNames, TPlatformCommandFnWithoutArgs>;
