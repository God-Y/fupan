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
import content from "./views/content-management/content.vue"; /* 内容管理 */
import contentEdit from "./views/content-management/content-edit.vue"; /* 新增编辑内容管理 */
import messageManagement from "./views/message-management/message.vue"; /* 消息管理 */
//意见反馈
import OptionManagement from "./views/option/manage.vue";
//意见反馈查看
import Optioncheck from "./views/option/check.vue";

//账户管理
//实名认证
import BackAccount from "./views/backManage/account.vue";
//新增查看用户
import Account from "./views/backManage/add.vue";
//修改密码
import ModifyPwd from "./views/backManage/modifyPwd.vue";
//角色管理
import Role from "./views/backManage/role.vue";
//新增角色
import AddRole from "./views/backManage/addRole.vue";
//销量统计
import SaleStatistics from "./views/statistics/allMsg.vue";
//产品销量统计
import ProductionStatistics from "./views/statistics/singleIdMsg.vue";
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
        {
          path: "message",
          name: "message",
          component: messageManagement
        },
        /* 消息管理 */
        {
          path: "content",
          name: "content",
          component: content
        },
        /* 内容管理 */
        {
          path: "contentEdit",
          name: "contentEdit",
          component: contentEdit
        },
        /* 意见反馈 */
        {
          path: "option-management/:pages",
          name: "OptionManagement",
          component: OptionManagement
        },
        /* 意见查看 */
        {
          path: "option-check/:id",
          name: "OptionCheck",
          component: Optioncheck
        },
        /* 新增编辑内容管理 */
        //后台管理
        //账户管理
        {
          path: "back-account/:pages",
          name: "BackAccount",
          component: BackAccount
        },
        //新增编辑账户
        {
          path: "manage-account/:msg/:id",
          name: "ManageAccount",
          component: Account
        },
        //修改密码
        {
          path: "modify-pwd",
          name: "ModifyPwd",
          component: ModifyPwd
        },
        //角色管理
        {
          path: "role/:pages",
          name: "ManegeRole",
          component: Role
        },
        //新增角色
        {
          path: "add-role/:msg/:id",
          name: "AddRole",
          component: AddRole
        },
        //销量统计
        {
          path: "sale-statistics/:pages",
          name: "SaleStatistics",
          component: SaleStatistics
        },
        //产品销量统计
        {
          path: "production-statistics/:id/:pages",
          name: "ProductionStatistics",
          component: ProductionStatistics
        },
        /* 默认跳转到欢迎页 */
        {
          path: "",
          name: "backend",
          component: WelcomePage
        }
        /* 默认跳转到欢迎页 */
      ]
    },
    {
      path: "/",
      name: "login",
      component: Login
    }
  ]
});
