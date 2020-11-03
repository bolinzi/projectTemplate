/**
 * @file:      api 公共模块
 * @author:    柏林(735815255@qq.com)
 * @version:   V1.0.0
 * @date:      2020/8/27 下午3:15:49
 */
'use strict';
let CONTEXT_PATH = `${process.env.VUE_APP_CONTEXT_PATH}`;

export default {
    // 工单明细列表导出
    GET_WORKORDER_HOMEPAGEEXCEL: CONTEXT_PATH + '/oam/workorder/web/homePageExcel'
};
