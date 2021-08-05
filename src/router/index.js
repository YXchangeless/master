import Vue from 'vue'
import Router from 'vue-router'
import Login from '../view/Login.vue'
import Home from '../view/Home.vue'
import User from '../view/User.vue'
import Welcome from '@/components/welcome.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {path:'/',redirect:'login'},
    {path:'/login',component:Login},
    {
      path:'/home',
      component:Home,
      redirect:'/Welcome',
      children:[
        {path:'/Welcome',component:Welcome},
        {path:'/User',component:User},
      ]},
  ]
})