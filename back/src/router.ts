import Vue from "vue";
import Router from "vue-router";
import Back from "./views/Back.vue";
import Login from "./views/Login.vue";
import BusinessUser from './views/business-user.vue';
import BusinessVerified from './views/business-verified.vue';
import BusinessProduct from './views/business-product.vue';
import addProduct from './views/business-product/add-product.vue';
import BusinessCreditor from './views/business-creditor.vue';
import addCreditor from './views/business-creditor/add-creditor.vue';
import creditorMatch from './views/business-creditor/creditor-match.vue';
import WelcomePage from './views/backMain-welcomPage.vue';



Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/back",
      component: Back,
      children: [
        {path: 'user', name:'BusinessUser', component: BusinessUser },/* 用户管理 */
        {path: 'verifiel', name:'BusinessVerified', component: BusinessVerified},/* 实名认证 */

        {path: 'product', name:'BusinessProduct', component: BusinessProduct },/* 产品管理 */
        {path:'addProduct', name:'addProduct',component:addProduct}, /* 新增产品管理 */
        {path: 'creditor', name:'BusinessCreditor', component: BusinessCreditor },/* 债权管理 */
        {path: 'addCreditor', name:'addCreditor', component:addCreditor}, /* 增加债券管理 */
        {path:'creditorMatch', name:'creditorMatch',component:creditorMatch}, /* 债权匹配 */

        {path: '', name: 'backend', component: WelcomePage }, /* 默认跳转到欢迎页 */
      ]
    },
    {
      path: "/",
      name: "login",
      component: Login
    },
  ]
});
