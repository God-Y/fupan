import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "./assets/style/mixins.scss";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI); /* 导入element */

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
