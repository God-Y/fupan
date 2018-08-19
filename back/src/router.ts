import Vue from "vue";
import Router from "vue-router";
import Back from "./views/Back.vue";
import Login from "./views/Login.vue";
import BusinessUser from "./views/user/business-user.vue";
import UserId from "./views/user/userId.vue";
import BusinessVerified from "./views/business-verified.vue";
import BusinessProduct from "./views/business-product.vue";
import addProduct from "./views/business-product/add-product.vue";
import BusinessCreditor from "./views/business-creditor.vue";
import addCreditor from "./views/business-creditor/add-creditor.vue";
import creditorMatch from "./views/business-creditor/creditor-match.vue";
import WelcomePage from "./views/backMain-welcomPage.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/back",
      component: Back,
      children: [
        /* 用户管理 */
        {
          path: "user",
          name: "BusinessUser",
          component: BusinessUser
        },
        {
          //用户详情页
          path: "user/:id",
          name: "UserId",
          component: UserId
        },
        /* 实名认证 */
        {
          path: "verifiel",
          name: "BusinessVerified",
          component: BusinessVerified
        },
        /* 产品管理 */
        {
          path: "product",
          name: "BusinessProduct",
          component: BusinessProduct
        },
        /* 新增产品管理 */
        {
          path: "addProduct",
          name: "addProduct",
          component: addProduct
        },
        /* 债权管理 */
        {
          path: "creditor",
          name: "BusinessCreditor",
          component: BusinessCreditor
        },
        /* 增加债券管理 */
        {
          path: "addCreditor",
          name: "addCreditor",
          component: addCreditor
        },
        /* 债权匹配 */
        {
          path: "creditorMatch",
          name: "creditorMatch",
          component: creditorMatch
        },
        /* 默认跳转到欢迎页 */
        {
          path: "",
          name: "backend",
          component: WelcomePage
        }
      ]
    },
    {
      path: "/",
      name: "login",
      component: Login
    }
  ]
});
