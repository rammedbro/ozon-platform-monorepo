declare module 'time-fix-plugin' {
  import type { WebpackPluginInstance, Compiler } from 'webpack';

  class TimeFixPlugin extends WebpackPluginInstance {
    apply(compiler: Compiler): void;
  }

  export default TimeFixPlugin;
}
