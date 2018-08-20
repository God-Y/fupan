import Vue from "vue";
import Router from "vue-router";
import Back from "./views/Back.vue";
import Login from "./views/Login.vue";
//用户页
import BusinessUser from "./views/user/business-user.vue";
import UserId from "./views/user/userId.vue";
import DealRecode from "./views/user/deal-recode.vue";

import BusinessVerified from "./views/business-verified.vue";
import BusinessProduct from "./views/business-product.vue";
import addProduct from "./views/business-product/add-product.vue";
import BusinessCreditor from "./views/business-creditor/business-creditor.vue";
import addCreditor from "./views/business-creditor/add-creditor.vue"; /* 增加债权 */
import creditorMatch from "./views/business-creditor/match/creditor-match.vue"; /* 匹配债权 */
import matchDetailed from "./views/business-creditor/match/detailed-match.vue"; /* 匹配详情 */
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
        {
          //用户交易记录
          path: "user-deal/:id",
          name: "UserDeal",
          component: DealRecode
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
          path: "matchDetailed",
          name: "matchDetailed",
          component: matchDetailed
        },
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
