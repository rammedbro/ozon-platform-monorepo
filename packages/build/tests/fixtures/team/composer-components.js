// Note: kyusupov - we emulate the situation when we executed the command
// `yarn tsc` and transpile ts to js maps
var components = {
  TestWidget1: {
    content() { return import(/* webpackChunkName: "test-widget-1" */ './widget-1.vue'); },
  },
  TestWidget2: {
    content() { return import(/* webpackChunkName: "test-widget-2" */ './widget-2.vue'); },
  },
  TestWidget3: {
    content: {
      desktop() { return import(/* webpackChunkName: "test-widget-3-desktop" */ './widget-3.desktop.vue'); },
      mobile() { return import(/* webpackChunkName: "test-widget-3-mobile" */ './widget-3.mobile.vue'); },
    }
  },
  TestWidget4: {
    content: {
      desktop: {
        default() { return import(/* webpackChunkName: "test-widget-4-desktop-default" */ './widget-4.desktop-default.vue'); },
        versions: {
          2() { return import(/* webpackChunkName: "test-widget-4-desktop-v2" */ './widget-4.desktop-v2.vue'); }
        }
      },
      mobile: {
        default() { return import(/* webpackChunkName: "test-widget-4-mobile-default" */ './widget-4.mobile-default.vue'); },
        versions: {
          2() { return import(/* webpackChunkName: "test-widget-4-mobile-v2" */ './widget-4.mobile-v2.vue'); },
        }
      }
    }
  },
  TestWidget5: {
    content: {
      default() { return import(/* webpackChunkName: "test-widget-5-default" */ './widget-5.default.vue'); },
      versions: {
        2() { return import(/* webpackChunkName: "test-widget-5-version" */ './widget-5.v2.vue'); },
        3() { return import(/* webpackChunkName: "test-widget-5-version" */ './widget-5.v3.vue'); }
      }
    }
  }
};

export default components;
