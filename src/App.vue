<template>
  <v-app>
    <!--
    <v-toolbar color="error">
      <v-spacer></v-spacer>
      <v-toolbar-title class="white--text"> <div id="title">Pokedex</div></v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    -->

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
//import Main from "./pages/Main";

export default {
  name: "App",

  components: {
    //Main,
  },

  data: () => ({
    //
  }),
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Acme|Fredoka+One|Fugaz+One|Gochi+Hand|Lexend+Giga|Monoton|Press+Start+2P&display=swap");
/**
font-family: 'Acme', sans-serif;
font-family: 'Gochi Hand', cursive;
font-family: 'Fredoka One', cursive; +
font-family: 'Lexend Giga', sans-serif;
font-family: 'Monoton', cursive;
font-family: 'Press Start 2P', cursive; ++
font-family: 'Fugaz One', cursive;
 */
#title {
  color: white;
  font-size: 24px;
  font-family: "Press Start 2P", cursive;
}
</style>
