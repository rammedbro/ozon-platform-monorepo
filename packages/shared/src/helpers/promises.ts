import type { IGenericRecord } from '@bx-fe/platform-types';

const initializePromises: IGenericRecord<any> = {};

export async function getInitializedPromise<T>(process: string, fn: () => Promise<T>): Promise<T> {
  if (process in initializePromises) {
    return initializePromises[process];
  }

  initializePromises[process] = await fn();
  return initializePromises[process];
}
