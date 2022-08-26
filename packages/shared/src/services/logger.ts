import { ServerLogger } from '@bx-fe/logger/server-logger';

import { getConfig } from '~/src/services/config';
import { getInitializedPromise } from '~/src/helpers/promises';

async function initializeLogger() {
  const config = await getConfig();
  return new ServerLogger({
    level: config.get('logLevel'),
    isProduction: config.get('environment') === 'production',
  });
}

export async function getLogger(): Promise<ServerLogger> {
  return getInitializedPromise('logger', initializeLogger);
}
