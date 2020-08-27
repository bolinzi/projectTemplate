/**
 * @file:      api 登录模块
 * @author:    柏林(735815255@qq.com)
 * @version:   V1.0.0
 * @date:      2020/8/27 下午3:15:49
 */
'use strict';
let CONTEXT_PATH = `${process.env.VUE_APP_CONTEXT_PATH}`;

export default {
    // 登陆获取用户token
    AUTH_LOGIN: CONTEXT_PATH + '/auth/oauth/token',
    // 获取登陆接口用户信息
    GET_USERINFO: CONTEXT_PATH + '/admin/user/info',
    // 获取菜单等权限
    GET_MENU: CONTEXT_PATH + '/admin/menu',
    // 获取user 字典
    GET_WORKORDER_TYPE: CONTEXT_PATH + '/admin/dict/type/group',
};
