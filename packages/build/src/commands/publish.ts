import { getLogger, getS3 } from '@bx-fe/platform-shared';

import { CLIENT_BUILD_DIR_PATH, STATIC_DIR_PATH } from '~/src/constants';

export async function publishAssets(): Promise<void> {
  const s3 = await getS3();
  const logger = await getLogger();

  try {
    const BUCKET_NAME = 'frontend-ozon-ru-prod-assets';
    const files = await s3.putFolder(BUCKET_NAME, CLIENT_BUILD_DIR_PATH, logger);

    logger.log({ message: `${files.length} files successfully uploaded`, levelName: 'warning' });
  } catch (error) {
    logger.log({ message: (error.code ? `[${error.code}] ` : '') + error });
    process.exit(1);
  }
}

export async function publishStatic(): Promise<void> {
  const s3 = await getS3();
  const logger = await getLogger();

  try {
    const BUCKET_NAME = 'frontend-ozon-ru-public';
    const files = await s3.putFolder(BUCKET_NAME, STATIC_DIR_PATH, logger);

    logger.log({ message: `${files.length} files successfully uploaded`, levelName: 'warning' });
  } catch (error) {
    logger.log({ message: (error.code ? `[${error.code}] ` : '') + error });
    process.exit(1);
  }
}
