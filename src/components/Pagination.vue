<template>
  <div class="text-center">
    <v-container>
      <v-row justify="center">
        <v-col cols="8">
          <v-container class="max-width">
            <v-btn :disabled="disabled" @click="previous" icon color="error" width="40"><v-icon size="40" class="white">mdi-arrow-left-circle</v-icon></v-btn>

            <v-btn @click="next" icon color="error" width="40"><v-icon size="40" class="white">mdi-arrow-right-circle</v-icon></v-btn>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { getPokemons } from "../api/api";
import store from "../store/index";
export default {
  data() {
    return {
      pokemons: [],
      disabled: false,
    };
  },

  created() {
    this.loadPokemons("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=12");
  },

  methods: {
    next() {
      if (store.getters.nextUrl !== null) {
        this.loadPokemons(store.getters.nextUrl);
      }
    },

    previous() {
      if (store.getters.prevUrl !== null) {
        this.loadPokemons(store.getters.prevUrl);
      }
    },

    loadPokemons(url) {
      getPokemons(url).then((res) => {
        store.commit("SET_NEXT_URL", res.next);
        store.commit("SET_PREV_URL", res.previous);
        this.pokemons = [];
        res.results.forEach((pokemon) => {
          pokemon.id = pokemon.url
            .split("/")
            .filter(function (part) {
              return !!part;
            })
            .pop();
          this.pokemons.push(pokemon);
        });
        store.commit("SET_POKEMONS", this.pokemons);
      });
    },
  },
};
</script>
