import Vue from "vue";
import Router from "vue-router";
import Back from "./views/Back.vue";
import Login from "./views/Login.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/back",
      name: "back",
      component: Back
    },
    {
      path: "/",
      name: "login",
      component: Login
    }
  ]
});
