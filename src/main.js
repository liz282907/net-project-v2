import Vue from 'vue';
import VueRouter from 'vue-router';
// import VueResource from 'vue-resource';

import configRouter from './route.config';


import App from './App';
import Element from 'element-ui'
import 'element-ui/lib/theme-default/index.css';
// import {
//     Breadcrumb,BreadcrumbItem,
//     Input,
//     Select,


// } from 'element-ui';

// Vue.component(Breadcrumb.name,Breadcrumb);
// Vue.component(BreadcrumbItem.name,BreadcrumbItem);
// Vue.component(Input.name,Input);
// Vue.component(Select.name,Select);


Vue.use(VueRouter);
Vue.use(Element);
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
