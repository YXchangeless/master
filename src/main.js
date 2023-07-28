import Vue from 'vue'
import App from './App'
import router from './router'
// vuex
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
Vue.use(Antd)
import store from './store.js'
// 全局样式
import './assets/css/globle.css'
// ElementUI的引用
// import ElementUI from 'element-ui';
// Vue.use(ElementUI);
import 'element-ui/lib/theme-chalk/index.css';

import Elm from '../public/element-ui';
Vue.use(Elm);
// axios的引用
import axios from 'axios';
Vue.prototype.$axios = axios;

import request from './utils/request'
Vue.prototype.$request = request

import api from './api'
Vue.prototype.$api = api

import echarts from 'echarts'
Vue.prototype.$echarts = echarts

import './api/mock'
import Cookie from 'js-cookie'
Vue.prototype.$Cookie = Cookie

import {
  Message
} from 'element-ui'


Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  let token = Cookie.get('token')
  // 获取存储token的开始时间
  const tokenStartTime = window.localStorage.getItem('tokenStartTime')
  const timeOver = 60 * 60000
  // 当前时间
  let date = new Date().getTime()
  console.log('date', date);
  console.log('tokenStartTime', tokenStartTime);
  console.log('timeOver', timeOver);
  if (tokenStartTime !== null) {
    if (date - tokenStartTime > timeOver) {
      token = ''
      Message.error('登录已过期，请重新登录！');
    }
  }

  if (!token && to.name !== 'login') {
    next({
      name: 'login'
    })
  } else if (token && to.name == 'login') {
    next({
      name: 'home'
    })
  } else {
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
