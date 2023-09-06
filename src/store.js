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
      changeValue(state,newVal){
        state.collapse = newVal
      },
      add(state) {
        state.count++
      },
      sub(state){
        state.difference--
      }
    },
    // mutations:{
    //   changeValue(state,newVal){
    //   state.value=newVal
    //   }
    // },
    actions: {
      add(context) {
        return context.commit('add')
      }
    }
  })