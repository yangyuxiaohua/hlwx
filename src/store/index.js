import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    curMsg:{}
  },
  mutations: {
    changeCurMsg(state,msg){
        state.curMsg = msg
    }
  },
  actions: {
  },
  modules: {
  }
})
