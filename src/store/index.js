import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
  },
  state: {
    username: "",
    userId: ""
  },
  mutations: {
    setUsername(state, data){
      state.username = data;
    },
    setUserId(state, data){
      state.userId = data;
    }
  },
  actions: {

  },
})
