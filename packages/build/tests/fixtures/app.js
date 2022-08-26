import Vue from 'vue';

import TestLayout from './layout.vue';

new Vue({
  render(h) {
    return h('div', {
      domProps: {
        id: '__ozon'
      }
    }, [h(TestLayout)]);
  }
});
