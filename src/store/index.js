/**
 * @file:      actions
 * @author:    花夏(liubiao@itoxs.com)
 * @version:   V1.0.0
 * @date:     2018/8/24 下午5:22:19
 */
import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';
import state from './state.js';
import createPersistedState from 'vuex-persistedstate';
Vue.use(Vuex);

// Store实例
export default new Vuex.Store({
    plugins: [
        createPersistedState({
            storage: window.localstorage
        })
    ],
    state,
    getters,
    actions,
    mutations,
    modules: {}
});
