import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import instance from './libs/request';
import api from './libs/api/';
import ViewUI from 'view-design';
import dayjs from 'dayjs';
import $$Spin from './install/Spin';
import util from './libs/utils';
import { DatePicker, Scrollbar } from 'element-ui';
import './assets/css/common.less';
import highcharts from 'highcharts';
Vue.use(DatePicker);
Vue.use(Scrollbar);
Vue.prototype.$http = instance;
Vue.prototype.$api = api;
Vue.prototype.$dayjs = dayjs;
Vue.prototype.$downloadExcel = util.downloadExcel;
Vue.prototype.$highcharts = highcharts;
Vue.use(ViewUI);
Vue.use($$Spin);
// Vue.use(BaiduMap, {
//     // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
//     ak: 'YYdw7DAI0Dg0nzZvhqlWnrXQ84Vm0OkG'
// });
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
