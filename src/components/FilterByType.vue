<template>
  <v-container fluid>
    <div id="selectType">
      <v-btn @click="pokedexMode" class="elevation-10">Pokedex List</v-btn>
      <v-select :items="items" label="Solo field" dense solo v-model="type" @change="getType()"></v-select>
      <v-btn color="error" class="elevation-10">Types Filter</v-btn>
    </div>

    <div id="cards">
      <div v-for="element in this.typePokemons" :key="element.pokemon.name">
        <v-hover v-slot:default="{ hover }">
          <v-card class="mx-auto d-flex flex-wrap elevation-6 card" text raised @click.stop="loadDialog(element.id)">
            <v-col cols="auto">
              <v-img class="align-end image" :src="`https://pokeres.bastionbot.org/images/pokemon/${element.id}.png`"> </v-img>
            </v-col>
            <v-expand-transition>
              <div v-if="hover" class="d-flex transition-fast-in-fast-out red v-card--reveal white--text" id="names">
                {{ element.pokemon.name }}
              </div>
            </v-expand-transition>
          </v-card>
        </v-hover>
      </div>
    </div>

    <!-- Dialog - pokemon info -->
    <v-dialog v-model="dialog" max-width="420" max-height="490">
      <v-card width="420" height="490" class="elevation-12">
        <v-col cols="auto" id="dialogInfo">
          <v-spacer></v-spacer>
          <v-avatar size="120" class="grey lighten-3">
            <v-img class="align-end" :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.pokemon_ID}.png`" width="150" height="150"></v-img>
          </v-avatar>

          <v-card-title id="titleDialog">{{ this.pokemon_name }} </v-card-title>
          <v-card-subtitle
            ><v-chip class="ma-2" dark color="#3B4CCA" v-for="type in this.pokemon_types" :key="type"> {{ type }} </v-chip></v-card-subtitle
          >

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
            <v-spacer></v-spacer>
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
import { getPokemons } from "../api/api";
export default {
  data() {
    return {
      items: ["Electric", "Grass", "Fire", "Water"],
      type: "Electric",
      electric: [],
      grass: [],
      fire: [],
      water: [],
      typePokemons: [],

      dialog: false,

      pokemon_ID: null,
      pokemon_name: "",
      pokemon_types: [],
      pokemon_baseExp: null,
      pokemon_weight: null,
      pokemon_height: null,
      pokemon_abilities: [],

      dialogUrl: null,
    };
  },

  created() {
    this.getType();
  },

  methods: {
    pokedexMode(e) {
      e.preventDefault();

      this.$router.push("/");
    },
    getType() {
      this.typePokemons = [];
      if (this.type === "Electric") {
        this.getElectricPokemons();
        this.typePokemons = this.electric;
      } else if (this.type === "Grass") {
        this.getGrassPokemons();
        this.typePokemons = this.grass;
      } else if (this.type === "Fire") {
        this.getFirePokemons();
        this.typePokemons = this.fire;
      } else if (this.type === "Water") {
        this.getWaterPokemons();
        this.typePokemons = this.water;
      }
    },

    getPoke(pUrl, arr) {
      this.typePokemons = [];
      getPokemons(pUrl).then((res) => {
        res.pokemon.forEach((element) => {
          element.id = element.pokemon.url
            .split("/")
            .filter(function (part) {
              return !!part;
            })
            .pop();
          arr.push(element);
        });
      });
    },

    getElectricPokemons() {
      this.getPoke("https://pokeapi.co/api/v2/type/electric", this.electric);
    },

    getGrassPokemons() {
      this.getPoke("https://pokeapi.co/api/v2/type/grass", this.grass);
    },

    getFirePokemons() {
      this.getPoke("https://pokeapi.co/api/v2/type/fire", this.fire);
    },

    getWaterPokemons() {
      this.getPoke("https://pokeapi.co/api/v2/type/water", this.water);
    },

    loadDialog(id) {
      this.pokemon_ID = id;
      this.dialog = true;
      this.pokemon_abilities = [];
      this.pokemon_types = [];
      this.getInfoDialog();
    },

    getInfoDialog() {
      this.typePokemons.forEach((element) => {
        element.id = element.pokemon.url
          .split("/")
          .filter(function (part) {
            return !!part;
          })
          .pop();
        if (element.id === this.pokemon_ID) {
          this.dialogUrl = element.pokemon.url;
        }
      });
      this.getPokemonInfo();
    },
    getPokemonInfo() {
      getPokemons(this.dialogUrl).then((res) => {
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
      });
    },
  },
};
</script>

<style scoped>
/* Combobox - type of Pokemon */
#selectType {
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

#abilities {
  padding: 10px;
  text-align: center;
}

#titleDialog {
  font-family: "Press Start 2P", cursive;
  font-size: 14px;
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

  #selectType {
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

@media screen and (min-width: 800px) and (max-width: 1000px) {
  #cards {
    grid-template-columns: 33% 33% 33%;
    grid-row-gap: 12px;
  }
}
</style>
