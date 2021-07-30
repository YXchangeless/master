import Vue from 'vue'
import App from './App'
import router from './router'
// vuex
import store from'./store.js'
// 全局样式
import './assets/css/globle.css'
// ElementUI的引用
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
// axios的引用
import axios from 'axios';
Vue.prototype.$axios = axios;

import echarts from 'echarts'
Vue.prototype.$echarts = echarts

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
