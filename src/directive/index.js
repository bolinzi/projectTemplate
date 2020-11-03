// import Vue from 'vue';
import debounce from './debounce';

const install = function(Vue) {
  Vue.directive('debounce', debounce);
};
export default {install};
