/**
 * @file:      getters
 * @author:    花夏(liubiao@itoxs.com)
 * @version:   V1.0.0
 * @date:      2018/8/24 下午5:19:26
 */
const getters = {
    menuName(state) {
        return state.menuName;
    },
    menuActive(state) {
        return state.menuActive;
    },
    menuData(state) {
        return state.menuData;
    },
    meta(state) {
        return state.meta;
    },
    userInfo(state) {
        return state.userInfo;
    },
    dictionary(state) {
        return state.dictionary;
    },
    params(state) {
        return state.params;
    },
    permissionBtn(state) {
        return state.permissionBtn;
    },
    cityInfo(state) {
        return state.cityInfo;
    }
};
export default getters;
