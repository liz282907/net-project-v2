import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
// import Moment from ''

import configRouter from './route.config';


import App from './App';
import Element from 'element-ui'
import router from './route.config'
// import 'element-ui/lib/theme-default/index.css';
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
Vue.use(VueResource);

const testUser = {
            userId : 4,
            name : "张三",
            auth : 0
        }

// localStorage.setItem("wxb_user",JSON.stringify(testUser));

// const router = new VueRouter({
//   mode: 'hash', /* default */
//   routes: configRouter,
//   beforeEach: (to,from,next)=>{
//     const user = localStorage.getItem("wxb_user");
//     if(!user){
//         console.log("要跳转");
//         next("/login");
//     }
//   }
// });

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
});

// export { router };
