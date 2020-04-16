<template>
  <div id="container">
    <v-toolbar color="error">
      <v-spacer></v-spacer>
      <v-toolbar-title class="white--text">
        <div id="title">Pokemon Types</div>
        <div id="subtitle">by Katarzyna Teska</div></v-toolbar-title
      >
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-container>
      <FilterByType />
    </v-container>
  </div>
</template>

<script>
import FilterByType from "../components/FilterByType";
export default {
  components: {
    FilterByType,
  },
};
</script>

<style scoped>
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
#container {
  background-image: url("../assets/city.jpg");
  background-repeat: repeat-y;
  width: 100%;
  height: 100%;
}

@media screen and (max-width: 680px) {
  #title {
    font-size: 18px;
  }
}
</style>
