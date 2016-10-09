import Vue from 'vue';
import VueRouter from 'vue-router';
// import VueResource from 'vue-resource';

import configRouter from './route.config';


import App from './App';


Vue.use(VueRouter);
// Vue.use(VueResource);

const router = new VueRouter({
  mode: 'hash', /* default */
  routes: configRouter,
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
});
