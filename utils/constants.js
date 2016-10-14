const navList = [
    { url: '/info-typein', zh_name: '信息录入' },
    { url: '/management', zh_name: '关键词管理' },
    { url: '/evolve', zh_name: '关键词演化' },
    { url: '/analysis', zh_name: '统计分析' },
    { url: '/sys-management', zh_name: '系统管理' },
];

const serverPath = '';
const urls = {
    'category': serverPath + '/management/category',
    'topic': serverPath + '/topic',
    'keywordList': serverPath + '/management/keywordList',
    'audit': serverPath + '/management/audit',
    'delete': serverPath + '/management/delete',
    'update': serverPath + '/management/update',
    'upload': serverPath + '/upload',
    'typein': serverPath + '/typein',
};
const auditStates = [
    {zh_name: '全部', id: 1},
    {zh_name: '未审核', id: 2},
    {zh_name: '已通过', id: 3},
    {zh_name: '已拒绝', id: 4}
];

export { navList, urls , auditStates};
