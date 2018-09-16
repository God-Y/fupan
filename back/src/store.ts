import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogin: false || localStorage.getItem("isLogin"),
    productionName: ""
  },
  mutations: {
    login(state: any) {
      state.isLogin = true;
    },
    loginOut(state: any) {
      state.isLogin = false;
    },
    production(state, value) {
      state.productionName = value;
    }
  },
  actions: {}
});
