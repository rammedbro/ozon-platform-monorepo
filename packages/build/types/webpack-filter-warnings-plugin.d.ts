declare module 'webpack-filter-warnings-plugin' {
  import type { WebpackPluginInstance, Compiler } from 'webpack';

  interface IFilterWarningsPluginOptions {
    exclude: RegExp;
  }

  class FilterWarningsPlugin implements WebpackPluginInstance {
    constructor(options: IFilterWarningsPluginOptions): void;

    apply(compiler: Compiler): void;
  }

  export default FilterWarningsPlugin;
}
