import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    nextUrl: null,
    prevUrl: null,
    pokemons: [],
  },

  mutations: {
    SET_POKEMONS(state, pokemons) {
      state.pokemons = pokemons;
    },
    SET_NEXT_URL(state, url) {
      state.nextUrl = url;
    },
    SET_PREV_URL(state, url) {
      state.prevUrl = url;
    },
  },

  actions: {},

  getters: {
    nextUrl(state) {
      return state.nextUrl;
    },
    prevUrl(state) {
      return state.prevUrl;
    },
    pokemons(state) {
      return state.pokemons;
    },
  },
});

export default store;
