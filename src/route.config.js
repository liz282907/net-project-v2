/* eslint-disable global-require*/
import VueRouter from 'vue-router';
import Vue from 'vue';

Vue.use(VueRouter);
let route = [
	{
        path: '/app',
        name: '信息录入',
        component: require('./pages/enter-app.vue'),
        children:[
            {path: '/', redirect: 'management'},
           {
                  path: 'info-typein',
                  name: '信息录入',
                  component: require('./pages/info-typein.vue'),
            },
            {
                  path: 'management',
                  name: '关键词管理',
                  component: require('./pages/management.vue'),
            },
            {
                  path: 'analysis',
                  name: '统计分析',
                  component: require('./pages/analysis.vue'),
            },
             {
                  path: 'info-typein',
                  name: '信息录入',
                  component: require('./pages/info-typein.vue'),
            },
            {
                  path: 'evolve',
                  name: '关键词演化',
                  component: require('./pages/evolve.vue'),
                  children: [
                    { path: 'export', name: '导出系统', component: require('./pages/evolve-export.vue') },
                    { path: 'analysis', name: '命中统计', component: require('./pages/evolve-analysis.vue') },
                  ],
            },
            {
                  path: 'sys-management',
                  name: '系统管理',
                  component: require('./pages/sys-management.vue'),
                  beforeEnter:(to, from, next) => {
                      const user = localStorage.getItem("wxb_user");
                      if(user && JSON.parse(user).auth===0)
                        next();
                      else
                        next("/login");
                  },
                  children: [
                    { path: 'account', name: '账户管理', component: require('./pages/sys-account.vue') },
                    // { path: '/dict', name: '字典管理', component: require('./pages/sys-dict.vue') },
                    { path: 'dict-theme', name: '字典管理-主题', component: require('./pages/sys-dict-theme.vue') },
                    { path: 'dict-category', name: '字典管理-分类', component: require('./pages/sys-dict-category.vue') },
                    { path: 'system', name: '分发系统', component: require('./pages/sys-distribute.vue') },
                    ],
              }

        ]
	},

  {
        path: '/login',
        name: '登录',
        component: require('./pages/login.vue'),
  },


];

const evolveRoute = {
  path: '/evolve',
  name: '关键词演化',
  component: require('./pages/evolve.vue'),
  children: [
	  { path: 'export', name: '导出系统', component: require('./pages/evolve-export.vue') },
	  { path: 'analysis', name: '命中统计', component: require('./pages/evolve-analysis.vue') },
  ],
};

const sysManageRoute = {
    path: '/sys-management',
    name: '系统管理',
    component: require('./pages/sys-management.vue'),
    beforeEnter:(to, from, next) => {
        const user = localStorage.getItem("user");
        if(user && JSON.parse(user).auth===0)
          next();
        else
          next("/login");
    },
    children: [
    	{ path: 'account', name: '账户管理', component: require('./pages/sys-account.vue') },
    	// { path: '/dict', name: '字典管理', component: require('./pages/sys-dict.vue') },
      { path: 'dict-theme', name: '字典管理-主题', component: require('./pages/sys-dict-theme.vue') },
      { path: 'dict-category', name: '字典管理-分类', component: require('./pages/sys-dict-category.vue') },
    	{ path: 'system', name: '分发系统', component: require('./pages/sys-distribute.vue') },
      ],
};

// const totalRoute = { route };
// totalRoute.route = [...totalRoute.route,evolveRoute, sysManageRoute];


// // homePage
// totalRoute.route.push({path: '*', redirect: '/login'});

route.push({path: '*', redirect: '/login'});

const router = new VueRouter({
  mode: 'hash', /* default */
  routes: route,
  // beforeEach: (to,from,next)=>{
  //   const user = localStorage.getItem("wxb_user");
  //   if(!user){
  //       console.log("要跳转");
  //       next("/login");
  //   }
  // }
});

export default router;
// export default totalRoute.route;