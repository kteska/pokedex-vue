<template>
  <v-container>
    <v-alert dense outlined color="white" icon="mdi-emoticon-confused-outline" :value="alertValue" width="300"> There is no such <strong>Pokemon</strong>! </v-alert>

    <!-- Search component and filter button -->
    <div id="search">
      <v-btn color="error" class="elevation-10">Pokedex List</v-btn>
      <v-text-field
        label="Search by name"
        v-model="searchedName"
        @click:append="keywordChanged"
        v-on:keyup.enter="keywordChanged"
        rounded
        solo
        dense
        append-icon="mdi-magnify"
        color="primary"
      ></v-text-field>
      <v-btn @click="filterMode" class="elevation-10">Types Filter</v-btn>
    </div>

    <!-- Pokemon List -->
    <div id="cards">
      <div v-for="pokemon in getPokemon" :key="pokemon.name">
        <v-hover v-slot:default="{ hover }">
          <v-card class="mx-auto d-flex flex-wrap elevation-6 card" text raised @click.stop="loadDialog(pokemon.id)">
            <v-col cols="auto">
              <v-img class="align-end image" :src="`https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png`"> </v-img>
            </v-col>
            <v-expand-transition>
              <div v-if="hover" class="d-flex transition-fast-in-fast-out red v-card--reveal white--text" id="names">
                {{ pokemon.name }}
              </div>
            </v-expand-transition>
          </v-card>
        </v-hover>
      </div>
    </div>

    <!-- Dialog - pokemon info -->
    <v-dialog v-model="dialog" max-width="420" max-height="500">
      <v-card width="420" height="500" class="elevation-12">
        <v-col cols="auto" id="dialogInfo">
          <v-spacer></v-spacer>
          <v-avatar size="120" class="grey lighten-3">
            <v-img class="align-end" :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.pokemon_ID}.png`" width="150" height="150"></v-img>
          </v-avatar>

          <v-card-title id="titleDialog">{{ this.pokemon_name }} </v-card-title>
          <v-card-subtitle
            ><v-chip class="ma-2" dark color="#3B4CCA" v-for="type in this.pokemon_types" :key="type"> {{ type }} </v-chip></v-card-subtitle
          >
          <v-row></v-row>

          <v-card-text class="pokemonDetail">
            <v-row>Base experience: {{ this.pokemon_baseExp }} XP</v-row>
            <v-row>Height: {{ this.pokemon_height / 10 }} m</v-row>
            <v-row>Weight: {{ this.pokemon_weight / 10 }} kg</v-row>
            <div id="abilities">
              Abilities
              <v-row
                ><v-chip class="ma-2" color="amber accent-4" v-for="ability in this.pokemon_abilities" :key="ability"> {{ ability }} </v-chip></v-row
              >
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn color="green darken-1" text @click="dialog = false">
              Choose you!
            </v-btn>
          </v-card-actions>
        </v-col>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import store from "../store/index";
import { getPokemons } from "../api/api";

export default {
  data() {
    return {
      searchedName: null,
      noSearchedPokemon: 0,

      dialog: false,
      pokemons: [],

      pokemon_ID: null,
      pokemon_name: "",
      pokemon_types: [],
      pokemon_baseExp: null,
      pokemon_weight: null,
      pokemon_height: null,
      pokemon_abilities: [],

      dialogUrl: null,

      alertValue: false,
    };
  },
  computed: {
    getPokemon() {
      return store.getters.pokemons;
    },
  },

  methods: {
    filterMode(e) {
      e.preventDefault();

      this.$router.push("/filter");
    },

    getPokemonInfo() {
      getPokemons(this.dialogUrl).then((res) => {
        if (this.dialogUrl === null) {
          this.alertValue = true;
          setTimeout(() => {
            this.alertValue = false;
          }, 3000);
        } else {
          res.abilities.forEach((element) => {
            this.pokemon_abilities.push(element.ability.name);
          });
          res.types.forEach((element) => {
            this.pokemon_types.push(element.type.name);
          });
          this.pokemon_baseExp = res.base_experience;
          this.pokemon_height = res.height;
          this.pokemon_weight = res.weight;
          this.pokemon_name = res.name;
        }
      });
    },

    keywordChanged() {
      this.pokemon_abilities = [];
      this.pokemon_types = [];
      this.dialogUrl = null;
      getPokemons("https://pokeapi.co/api/v2/pokemon?offset=0&limit=964").then((res) => {
        let index = 0;
        res.results.forEach((pokemon) => {
          if (pokemon.name.toLowerCase() === this.searchedName.toLowerCase()) {
            pokemon.id = pokemon.url
              .split("/")
              .filter(function (part) {
                return !!part;
              })
              .pop();
            this.dialogUrl = pokemon.url;
            this.pokemon_ID = pokemon.id;
            this.dialog = true;
            this.searchedName = "";
            this.noSearchedPokemon = index;
          }
          index++;
        });

        getPokemons(`https://pokeapi.co/api/v2/pokemon?offset=${parseInt(this.noSearchedPokemon - (this.noSearchedPokemon % 12))}&limit=12`).then((res) => {
          console.log("JT refresh");

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
        this.getPokemonInfo();
      });
    },

    loadDialog(id) {
      this.pokemon_ID = id;
      this.dialog = true;
      this.pokemon_abilities = [];
      this.pokemon_types = [];
      this.getInfoDialog();
    },

    getInfoDialog() {
      store.getters.pokemons.forEach((pokemon) => {
        if (pokemon.id === this.pokemon_ID) {
          this.dialogUrl = pokemon.url;
        }
      });
      this.getPokemonInfo();
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Acme|Fredoka+One|Fugaz+One|Gochi+Hand|Lexend+Giga|Monoton|Press+Start+2P&display=swap");

/* Search component */
#search {
  display: grid;
  grid-template-columns: 20% 60% 20%;
  grid-template-rows: auto;
  justify-items: center;
}

/* Cards - pokemon list */
#cards {
  display: grid;
  grid-template-columns: 25% 25% 25% 25%;
  grid-template-rows: auto;
  grid-row-gap: 20px;
  justify-items: stretch;
  align-items: stretch;
}

.card {
  height: 180px;
  width: 180px;
}

.image {
  width: 155px;
  height: 155px;
}

.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.85;
  position: absolute;
  width: 100%;
}

#names {
  font-size: 15px;
  font-weight: 800;
  font-family: "Press Start 2P", cursive;
}

/* Dialog component */
#dialogInfo {
  display: grid;
  justify-items: center;
  align-items: center;
}

#titleDialog {
  font-family: "Press Start 2P", cursive;
  font-size: 14px;
}

#abilities {
  padding: 10px;
  text-align: center;
}

.pokemonDetail {
  font-size: 16px;
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: auto;
  justify-items: center;
  align-items: center;
}

@media screen and (max-width: 630px) {
  #cards {
    grid-template-columns: 100%;
    grid-row-gap: 15px;
  }

  #search {
    grid-template-columns: 100%;
    grid-row-gap: 10px;
    grid-template-rows: auto;
    justify-items: center;
    align-items: center;
    border: solid 20px transparent;
  }

  .card {
    height: 150px;
    width: 150px;
  }

  .image {
    width: 120px;
    height: 120px;
  }

  #names {
    font-weight: 600;
    font-size: 11px;
  }
}

@media screen and (min-width: 630px) and (max-width: 800px) {
  #cards {
    grid-template-columns: 50% 50%;
    grid-row-gap: 12px;
  }

  .card {
    height: 150px;
    width: 150px;
  }

  .image {
    width: 120px;
    height: 120px;
  }

  #names {
    font-weight: 600;
    font-size: 11px;
  }
}

@media screen and (min-width: 800px) and (max-width: 900px) {
  #cards {
    grid-template-columns: 33% 33% 33%;
    grid-row-gap: 12px;
  }
}
</style>
