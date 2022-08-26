declare module 'vue-deepset' {
  function vueSet(state: any, path: any, value: any): any;

  function VUEX_DEEP_SET(state: any, opts: any): any;

  export { vueSet, VUEX_DEEP_SET };
}
