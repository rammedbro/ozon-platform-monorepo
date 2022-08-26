declare module 'webpack-require-from' {
  import type { WebpackPluginInstance, Compiler } from 'webpack';

  interface IWebpackRequireFromOptions {
    suppressErrors: boolean;
    methodName: string;
  }

  class WebpackRequireFrom implements WebpackPluginInstance {
    constructor(options: IWebpackRequireFromOptions): void;

    apply(compiler: Compiler): void;
  }

  export default WebpackRequireFrom;
}
