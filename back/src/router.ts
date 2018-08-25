import Vue from "vue";
import Router from "vue-router";
import Back from "./views/Back.vue";
import Login from "./views/Login.vue";
//用户页
import BusinessUser from "./views/user/business-user.vue";
import UserId from "./views/user/userId.vue";
import DealRecode from "./views/user/deal-recode.vue";
import PayRecode from "./views/user/pay-recode.vue";
//实名认证
import BusinessVerified from "./views/realName/realList.vue";
import BusinessCheckVerified from "./views/realName/checkId.vue";

import BusinessProduct from "./views/business-product.vue";
import addProduct from "./views/business-product/add-product.vue";
import BusinessCreditor from "./views/business-creditor/business-creditor.vue";
import addCreditor from "./views/business-creditor/add-creditor.vue"; /* 增加债权 */
import creditorMatch from "./views/business-creditor/match/creditor-match.vue"; /* 匹配债权 */
import matchDetailed from "./views/business-creditor/match/detailed-match.vue"; /* 匹配详情 */
import WelcomePage from "./views/backMain-welcomPage.vue";
//账户管理
//实名认证
import BackAccount from "./views/backManage/account.vue";
//新增查看用户
import AddAccount from "./views/backManage/add.vue";
//修改密码
import ModifyPwd from "./views/backManage/modifyPwd.vue";
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
          path: "user/:pages",
          name: "BusinessUser",
          component: BusinessUser
        },
        {
          //用户详情页
          path: "user-detial/:id",
          name: "UserId",
          component: UserId
        },
        {
          //用户交易记录
          path: "user-deal/:id/:pages",
          name: "UserDeal",
          component: DealRecode
        },
        {
          //用户投资记录
          path: "user-pay/:id/:pages",
          name: "UserPay",
          component: PayRecode
        },
        /* 实名认证 */
        {
          path: "verifiel/:pages",
          name: "BusinessVerified",
          component: BusinessVerified
        },
        // 实名认证查看
        {
          path: "check-verifiel/:id",
          name: "BusinessCheckVerifiedCheck",
          component: BusinessCheckVerified
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
        //后台管理
        //账户管理
        {
          path: "back-account/:pages",
          name: "BackAccount",
          component: BackAccount
        },
        //新增编辑账户
        {
          path: "add-account",
          name: "AddAccount",
          component: AddAccount
        },
        //修改密码
        {
          path: "modify-pwd",
          name: "ModifyPwd",
          component: ModifyPwd
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
