import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import Main from './pages/Main'
import TypesFilter from './pages/TypesFilter'
import VueRouter from 'vue-router'

Vue.config.productionTip = false;

Vue.use(VueRouter)

const routes = [
  { path: '/', component: Main },
  { path: '/filter', component: TypesFilter}
]

const router = new VueRouter({
  routes
})

new Vue({
  vuetify,
  router,
  render: (h) => h(App),
}).$mount("#app");
