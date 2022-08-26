import Vue from 'vue';

export default context => {
  return new Promise(resolve => {
    context.msg = 'Hello World!!!';
    resolve(new Vue({
      render(h) {
        return h('div', context.url);
      }
    }));
  });
};
