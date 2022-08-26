declare module 'vue-clipboard2' {
  import type { PluginObject, PluginFunction } from 'vue';

  interface IVueClipboardConfig {
    appendToBody: boolean;
  }

  class VueClipboard<T> extends PluginObject<T> {
    static config: IVueClipboardConfig;
    static install: PluginFunction<T>;
  }

  export default VueClipboard;
}
