/* eslint-disable global-require*/
const route = [
	{
        path: '/info-typein',
        name: '信息录入',
        component: require('./pages/info-typein.vue'),
	},
	{
        path: '/management',
        name: '关键词管理',
        component: require('./pages/management.vue'),
	},
	{
        path: '/analysis',
        name: '统计分析',
        component: require('./pages/analysis.vue'),
	},
];

const evolveRoute = {
  path: '/evolve',
  name: '关键词演化',
  component: require('./pages/evolve.vue'),
  children: [
	  { path: '/export', name: '导出系统', component: './pages/evolve-export.vue' },
	  { path: '/analysis', name: '命中统计', component: './pages/evolve-analysis.vue' },
  ],
};

const sysManageRoute = {
    path: '/sys-management',
    name: '系统管理',
    component: require('./pages/sys-management.vue'),
    children: [
    	{ path: '/account', name: '账户管理', component: './pages/sys-account.vue' },
    	{ path: '/dict', name: '字典管理', component: './pages/sys-dict.vue' },
    	{ path: '/system', name: '分发系统', component: './pages/sys-distribute.vue' },
      ],
};

const totalRoute = { route };

totalRoute.route = totalRoute.route.concat([evolveRoute, sysManageRoute]);

// homePage
totalRoute.route.push({
    path: '*', redirect: '/management',
});

export default totalRoute.route;
