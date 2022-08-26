import { ozonConfig } from '@bx-fe/platform-config';
import type { TOzonConfig } from '@bx-fe/platform-config';

import { getInitializedPromise } from '~/src/helpers/promises';

export async function getConfig(): Promise<TOzonConfig> {
  return getInitializedPromise(
    'config',
    ozonConfig.initialize.bind(ozonConfig)
  ).then(() => ozonConfig);
}
