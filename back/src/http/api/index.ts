import user from "./user/userurl"; //用户管理
import real from "./realName/real"; //实名认证
import creditor from "./creditor/creditor"; /* 债权管理 */
import content from "./content/content"; /* 内容管理 */
import common from "./common/common"; /* 共用接口 */
import message from "./message/message"; /* 消息 */
import backRoles from "./backMange/role";
import backAccount from "./backMange/account";
// 其他模块的接口……
// 导出接口
export default {
  user,
  real,
  creditor,
  content,
  common,
  message
  backAccount,
  backRoles
};
