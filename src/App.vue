<template>
  <v-app>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>

export default {
  name: "App",

  components: {
  },

  data: () => ({
    //
  }),
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Acme|Fredoka+One|Fugaz+One|Gochi+Hand|Lexend+Giga|Monoton|Press+Start+2P&display=swap");

#title {
  color: white;
  font-size: 24px;
  font-family: "Press Start 2P", cursive;
}
</style>
