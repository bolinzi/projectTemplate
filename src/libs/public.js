/**
 * @file:      public 统一配置前端字典
 * @author:    柏林子(735815255@qq.com)
 * @version:   V1.0.0
 * @date:      2020/8/13 上午10:48:49
 */
// 示例
const workOrderTypeOptions = [
    {
        label: '安装',
        value: 1
    }, {
        label: '拆除',
        value: 2
    }, {
        label: '拆换',
        value: 3
    }
];
// 权限菜单匹配
const pathRouterName = {
    '/statistics': 'statistics',
    '/faultOrder': 'faultOrder',
    '/inspectionOrder': 'inspectionOrder',
    '/inspectionManage': 'inspectionManage',
    '/faultManage': 'faultManage',
    '/order-detail': 'orderDetail',
    '/personTrail': 'personTrail',
    '/projectConfig': 'projectConfig',
    '/appManage': 'appManage',
    '/flowConfig': 'flowConfig'
};
export {
    workOrderTypeOptions,
    pathRouterName
};
