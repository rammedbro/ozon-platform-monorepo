import path from 'path';
import glob from 'fast-glob';
import { Client } from 'minio';
import type { UploadedObjectInfo } from 'minio';
import type { ServerLogger } from '@bx-fe/logger/server-logger';

import { getInitializedPromise } from '~/src/helpers/promises';

class S3 {
  private client: Client;

  constructor() {
    this.client = new Client({
      accessKey: process.env.CEPH_PUBLISH_AKEY,
      secretKey: process.env.CEPH_PUBLISH_SKEY,
      endPoint: 'prod.s3.ceph.s.o3.ru',
      port: 7480,
      useSSL: false
    });
  }

  static getHeaders(fileName: string): Record<string, string> {
    const headers: Record<string, string> = {};
    const IS_BROTLI_REGEX = /(\.br)$/;
    const isBrotli = IS_BROTLI_REGEX.test(fileName);

    if (isBrotli) {
      fileName = fileName.replace(IS_BROTLI_REGEX, '');
      headers['Content-Encoding'] = 'br';
    }

    const fileExtension = fileName.split('.').pop();
    switch (fileExtension) {
      case 'css':
        headers['Content-Type'] = 'text/css';
        break;
      case 'js':
        headers['Content-Type'] = 'application/javascript';
        break;
    }

    return headers;
  }

  async getObject(
    bucket: string,
    fileName: string,
    filePath: string,
    logger: ServerLogger
  ): Promise<void> {
    logger.log({ message: `Downloading file ${fileName}`, levelName: 'warning' });
    return this.client.fGetObject(bucket, fileName, filePath);
  }

  async putObject(
    bucket: string,
    fileName: string,
    filePath: string,
    logger: ServerLogger
  ): Promise<UploadedObjectInfo> {
    const headers = S3.getHeaders(fileName);
    logger.log({ message: `Uploading file ${fileName}`, levelName: 'warning' });

    return this.client.fPutObject(bucket, fileName, filePath, headers);
  }

  async putFolder(
    bucket: string,
    folder: string,
    logger: ServerLogger
  ): Promise<string[]> {
    const files = glob.sync(`${folder}/**/*`, { onlyFiles: true });
    if (!files.length) {
      throw new Error(`Directory ${folder} is empty`);
    }

    await Promise.all(files.map(file =>
      this.putObject(bucket, path.basename(file), file, logger))
    );

    return files;
  }
}

export function getS3(): Promise<S3> {
  return getInitializedPromise('s3', async () => new S3());
}
