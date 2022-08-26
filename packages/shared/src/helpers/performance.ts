import { performance } from 'perf_hooks';
import type { TSyncOrAsyncFn } from '@bx-fe/platform-types';

interface IOptions {
  callback?: (start: number, end: number) => void;
}

export function fnExecTimeMeasureWrapper<T>(
  fn: TSyncOrAsyncFn<T>,
  options: IOptions = {}
): ReturnType<TSyncOrAsyncFn<T>> {
  const {
    callback = (start, end) => {
      const diff = (end - start) / 1000;
      console.log(`Finished in ${diff.toFixed(2)}s`);
    }
  } = options;
  const measure = () => callback(start, performance.now());
  const start = performance.now();

  const result = fn();
  if (result instanceof Promise) {
    return result.then(data => {
      measure();
      return data;
    });
  } else {
    measure();
    return result;
  }
}
