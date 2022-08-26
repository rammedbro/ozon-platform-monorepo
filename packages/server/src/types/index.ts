import type { TOzonConfig } from '@bx-fe/platform-types';
import type { ServerLogger } from '@bx-fe/logger/server-logger';
import type { PrometheusSender } from '@bx-fe/prom-client';
import type Memcached from 'memcache-plus';

export interface IServerServices {
  config: TOzonConfig;
  logger: ServerLogger;
  prometheus?: PrometheusSender;
  imageMemcached?: Memcached;
}
