import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "./assets/style/mixins.scss";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css"; /* element ui css */
import vfilters from "./assets/filter/filter";

import api from "./http/api/index"; //挂载封装好的api
import _global from "./assets/_global"; //挂载封装好的全局函数
Vue.prototype.$api = api;
Vue.prototype.$alertMsg = _global.alertMsg;

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
