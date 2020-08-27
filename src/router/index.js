import Vue from 'vue';
import Router from 'vue-router';
import routes from './routers';
import store from '../store';
Vue.use(Router);
const router = new Router({
    routes
});

router.beforeEach((to, from, next) => {
    // 路由发生变化修改页面title
    if (to.meta.title) {
        document.title = to.meta.title;
        store.commit('SET_META', to.meta);
        // 判断是否继承父级路由菜单active
        // if (!to.meta.inheritMenu) {
        //     store.commit('SET_MENU_NAME', to.name);
        // }
    }
    next();
});

export default router;
