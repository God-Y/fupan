import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "./assets/style/mixins.scss";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css"; /* element ui */
import vfilters from "./assets/filter/filter";

import axios from "./http/axios";
import { post, get } from "./http/http";
Vue.use(ElementUI); /* 导入element */

Vue.config.productionTip = false;

//for-in循环定义多个过滤器
for (let key in vfilters) {
  Vue.filter(key, vfilters[key]);
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
