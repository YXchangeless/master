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
        console.log(state.collapse + '11111111')
        state.collapse = newVal
        console.log(newVal + '2222')
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
    actions: {}
  })