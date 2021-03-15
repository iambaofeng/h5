import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    UnitList: [],
    Role: "",
  },
  getters: {
    getUnitList(state) {
      return state.UnitList;
    },
    gerRole(state) {
      return state.Role;
    },
  },
  mutations: {
    setUnitList(state, data) {
      state.UnitList = data;
    },
    setRole(state, data) {
      state.Role = data;
    },
  },
  actions: {},
  modules: {},
});
