import { Config, InitializeTypes } from '@bx-fe/config';

import configDev from './dev';
import configLocal from './local';
import configProd from './prod';
import configStg from './stg';

import { schema } from '~/src/schema';
import type { ISchemaTypes } from '~/src/schema';

const configs: Record<string, ISchemaTypes> = {
  'config.dev.ts': configDev,
  'config.local.ts': configLocal,
  'config.prod.ts': configProd,
  'config.stg.ts': configStg
};
const configName = process.env.OZON_CONFIG || 'config.local.ts';

if (!(configName in configs)) {
  throw new Error(`Runtime config with name ${configName} doesnt exists`);
}

let initType: InitializeTypes = InitializeTypes.LOCAL;

if (process.env.START_ENV === 'k8s') {
  initType = InitializeTypes.FROM_ENV;
}

export const ozonConfig = new Config<ISchemaTypes>(schema, configs[configName], {
  initType
});
export type TOzonConfig = typeof ozonConfig;
