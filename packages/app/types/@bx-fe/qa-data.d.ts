declare module '@bx-fe/qa-data' {
  import type { PluginObject, PluginFunction, DirectiveFunction, DirectiveOptions } from 'vue';

  class QaDirectivesPlugin<T> implements PluginObject<T> {
    static install: PluginFunction<T>;
  }

  // eslint-disable-next-line @bx-fe/ts/use-type-prefix
  declare const QaDirectives: DirectiveFunction | DirectiveOptions;

  export { QaDirectivesPlugin, QaDirectives };
}
