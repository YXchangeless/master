import Vue from 'vue'
import Vuex from  'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
    state:{
      count: 0,
      difference: 0,
      collapse:false,
    },
    mutations: {
        add(state) {
          state.count++
        },
        sub(state){
          state.difference--
        }
    },
    actions: {}
  })