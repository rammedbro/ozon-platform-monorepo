import onFinished from 'on-finished';
import type { ServerLogger } from '@bx-fe/logger/server-logger';
import type { PrometheusSender } from '@bx-fe/prom-client';

const REQUEST_PROTOCOL = 'http';
const ABORT_CODE = 'abort';

const APP_NAME_HEADER = 'x-o3-app-name';

const RESPONSE_STATUS = {
  ERROR: 'error',
  OK: 'ok',
  CLIENT_ERROR: 'client_error',
  NOT_FOUND: 'not_found',
};

const getResponseStatus = (code) => {
  if (code === ABORT_CODE) {
    return RESPONSE_STATUS.CLIENT_ERROR;
  }

  if (code >= 500) {
    return RESPONSE_STATUS.ERROR;
  }

  if (code >= 400) {
    return RESPONSE_STATUS.CLIENT_ERROR;
  }

  return RESPONSE_STATUS.OK;
};

const convertHrtime = (hrtime) => {
  const nanoseconds = hrtime[0] * 1e9 + hrtime[1];
  const milliseconds = nanoseconds / 1e6;
  const seconds = nanoseconds / 1e9;

  return {
    seconds,
    milliseconds,
    nanoseconds,
  };
};

const createErrorHandler = (logger) => {
  return (error) =>
    logger.log({
      level: 'error',
      message: error.toString(),
      stackTrace: error.stack,
      zone: 'node',
    });
};

export const createHttpMetric = (client: PrometheusSender, logger: ServerLogger) => {
  const logError = createErrorHandler(logger);

  return (req, res) => {
    res.__startAt = process.hrtime();

    if (client) {
      const headers = Object.assign({}, req.headers);

      try {
        client
          .get('requests_total')
          .labels(REQUEST_PROTOCOL, headers[APP_NAME_HEADER] || 'unknown')
          .inc();
      } catch (error) {
        logError(error);
      }

      onFinished(res, () => {
        try {
          const time = convertHrtime(process.hrtime(res.__startAt)).seconds;
          const code = req.aborted ? ABORT_CODE : res.statusCode;
          const status = getResponseStatus(code);

          client
            .get('response_time_seconds')
            .labels(
              REQUEST_PROTOCOL,
              headers[APP_NAME_HEADER] || 'unknown',
              status,
            )
            .observe(time);

          client.get('response_time_summary_seconds').observe(time);

          client
            .get('http_requests_total')
            .labels(code, headers[APP_NAME_HEADER] || 'unknown')
            .inc();
        } catch (error) {
          logError(error);
        }
      });
    }
  };
};
