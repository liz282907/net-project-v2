const navList = [
    { url: '/app/info-typein', zh_name: '信息录入' },
    { url: '/app/management', zh_name: '关键词管理' },
    { url: '/app/evolve', zh_name: '关键词演化' },
    { url: '/app/analysis', zh_name: '统计分析' },
    // { url: '/sys-management', zh_name: '系统管理' },
];

const serverPath = '';
const urls = {
    'root': serverPath+"",
    'category': serverPath + '/sysmgr/dict/query',
    'topic': serverPath + '/sysmgr/dict/query',
    'keywordList': serverPath + '/sample/list',
    'audit': serverPath + '/sample/audit',
    'delete': serverPath + '/sample/delete',
    'update': serverPath + '/sample/update',
    'upload': serverPath + '/sample/upload',
    'login': serverPath + '/login/in',
    // 'typein': serverPath + '/typein',
};
const auditStates = [
    {zh_name: '全部', id: -1},
    {zh_name: '未审核', id: 0},
    {zh_name: '已通过', id: 1},
    {zh_name: '已拒绝', id: 2}
];

const statusDict = {
    '-1':'全部',
    '0': '未审核',
    '1': '已通过',
    '2': '已拒绝'
};

export { navList, urls , statusDict,auditStates};
