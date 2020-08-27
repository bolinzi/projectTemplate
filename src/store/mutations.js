/**
 * @file:      mutations
 * @author:    花夏(liubiao@itoxs.com)
 * @version:   V1.0.0
 * @date:      2018/8/24 下午5:20:57
 */
import * as types from './mutation-type';
const mutations = {
    [types.SET_MENU_NAME](state, menuName) {
        state.menuName = menuName;
    },
    [types.SET_MENU_ACTIVE](state, menuActive) {
        state.menuActive = menuActive;
    },
    [types.SET_MENU](state, menuData) {
        state.menuData = menuData;
    },
    [types.SET_META](state, meta) {
        state.meta = meta;
    },
    [types.SET_USERSINFO](state, userInfo) {
        state.userInfo = userInfo;
    },
    [types.SET_DICTIONARY](state, dictionary) {
        state.dictionary = dictionary;
    },
    [types.SET_PARAMS](state, params) {
        state.params = params;
    },
    [types.SET_PERMISSION_BTN](state, permissionBtn) {
        state.permissionBtn = permissionBtn;
    },
    [types.SET_CITY_INFO](state, cityInfo) {
        state.cityInfo = cityInfo;
    }
};
export default mutations;
