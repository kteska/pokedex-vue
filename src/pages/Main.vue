<template>
  <div id="container">
    <v-toolbar color="error">
      <v-spacer></v-spacer>
      <v-toolbar-title class="white--text">
        <div id="title">Pokedex</div>
        <div id="subtitle">by Katarzyna Teska</div></v-toolbar-title
      >
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-container>
      <PokemonList />
      <Pagination />
    </v-container>
  </div>
</template>

<script>
import Pagination from "../components/Pagination";
import PokemonList from "../components/PokemonList";

export default {
  name: "Main",
  components: {
    Pagination,
    PokemonList,
  },
};
</script>

<style scoped>
#container {
  background-image: url("../assets/city.jpg");
  width: 100%;
  height: 100%;
}
#title {
  color: white;
  font-size: 24px;
  font-family: "Press Start 2P", cursive;
  letter-spacing: 2px;
}
#subtitle {
  font-size: 12px;
  text-align: center;
}
@media screen and (max-width: 680px) {
  #container {
    background-repeat: repeat-y;
  }
  #title {
    font-size: 18px;
  }
}
</style>
