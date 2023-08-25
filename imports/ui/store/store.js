import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    organization: {
      name: "",
      address: "",
      phone: "",
      _id: "",
    },
  },
  getters: {
    getOrganization: (state) => {
      return state.organization;
    },
  },
  mutations: {
    setOrganization: (state, payload) => {
      state.organization = payload;
    },
  },
  actions: {
    setOrganization: (context, payload) => {
      context.commit("setOrganization", payload);
    },
  },
  plugins: [createPersistedState()]
});
