import { initTracerFromEnv } from 'jaeger-client';
import type { JaegerTracer } from 'jaeger-client';

import { getLogger } from '~/src/services/logger';
import { getInitializedPromise } from '~/src/helpers/promises';

const setJaegerEnvVars = () => {
  console.log('jaeger wtf');
  process.env.JAEGER_AGENT_PORT = '6832';
  process.env.JAEGER_SAMPLER_PARAM = '1';
  process.env.JAEGER_REPORTER_LOG_SPANS = 'true';
};

const logTrace = (logger, message, levelName) => {
  logger.log({ levelName, message, zone: 'tracing' });
};

async function initTracer(): Promise<JaegerTracer> {
  setJaegerEnvVars();

  const serviceName =
    process.env.JAEGER_SERVICE_NAME ||
    process.env.SERVICE_NAME ||
    'frontend-ozon-ru';
  const config = {
    serviceName,
    sampler: {
      type: process.env.JAEGER_SAMPLER_TYPE || 'const',
      param: 0
    }
  };
  const logger = await getLogger();
  const options = {
    contextKey: 'x-o3-trace',
    logger: {
      info: (msg) => logTrace(logger, msg, 'info'),
      error: (msg) => logTrace(logger, msg, 'error')
    }
  };

  return initTracerFromEnv(config, options);
}

export async function getTracer(): Promise<JaegerTracer> {
  return getInitializedPromise('tracer', initTracer);
}
