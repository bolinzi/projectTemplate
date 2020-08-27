/**
 * @file:      actions
 * @author:    花夏(liubiao@itoxs.com)
 * @version:   V1.0.0
 * @date:      2018/8/24 下午5:15:26
 */
import * as types from './mutation-type';

const actions = {
    [types.SET_MENU_NAME]({ commit }) {
        return new Promise(resolve => {
            commit(types.SET_MENU_NAME);
            resolve();
        });
    },
    [types.SET_META]({ commit }) {
        return new Promise(resolve => {
            commit(types.SET_META);
            resolve();
        });
    },
    [types.SET_MENU]({ commit }) {
        return new Promise(resolve => {
            commit(types.SET_MENU);
            resolve();
        });
    },
    [types.SET_USERSINFO]({ commit }) {
        return new Promise(resolve => {
            commit(types.SET_USERSINFO);
            resolve();
        });
    },
    [types.SET_DICTIONARY]({ commit }) {
        return new Promise(resolve => {
            commit(types.SET_DICTIONARY);
            resolve();
        });
    },
    [types.SET_PARAMS]({ commit }) {
        return new Promise(resolve => {
            commit(types.SET_PARAMS);
            resolve();
        });
    },
    [types.SET_PERMISSION_BTN]({ commit }) {
        return new Promise(resolve => {
            commit(types.SET_PERMISSION_BTN);
            resolve();
        });
    },
    [types.SET_CITY_INFO]({ commit }) {
        return new Promise(resolve => {
            commit(types.SET_CITY_INFO);
            resolve();
        });
    }
};
export default actions;
