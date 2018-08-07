import Vue from "vue";
import Router from "vue-router";
import Back from "./views/Back.vue";
import Login from "./views/Login.vue";
import BusinessUser from './views/business-user.vue';
import BusinessVerified from './views/business-verified.vue';
import BusinessProduct from './views/business-product.vue';
import BusinessCreditor from './views/business-creditor.vue';
import WelcomePage from './views/backMain-welcomPage.vue';



Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/back",
      // name: "backend",
      component: Back,
      children: [
        {path: 'user', name:'BusinessUser', component: BusinessUser },/* 用户管理 */
        {path: 'verifiel', name:'BusinessVerified', component: BusinessVerified },/* 实名认证 */
        {path: 'product', name:'BusinessProduct', component: BusinessProduct },/* 产品管理 */
        {path: 'creditor', name:'BusinessCreditor', component: BusinessCreditor },/* 债权管理 */
        {path: '', name: 'welcome', component: WelcomePage }, /* 默认跳转到欢迎页 */
      ]
    },
    {
      path: "/",
      name: "login",
      component: Login
    },
  ]
});
