<template>
  <div class="card">
    <div class="card-header">
    用户详情
    </div>
    <div class="card-body">
      <div class="card">
        <div class="card-header">
          个人信息
        </div>
        <div class="card-body">
          <el-form :model="userMsg" status-icon :rules="rules" ref="userForm1" label-width="80px" class="ruleForm">
          <!-- 用户编号 -->
            <el-form-item label="用户编号" class="left-item" align="left">
              <el-input type="text" class="input-item" v-model="userMsg.userNumber" disabled></el-input>
            </el-form-item>
            <!-- 姓名 -->
            <el-form-item label="真实姓名" class="center-item">
              <el-input type="text" v-model="userMsg.idName" disabled></el-input>
            </el-form-item>
            <!-- 身份证号-->
            <el-form-item label="身份姓名" >
              <el-input type="text" v-model="userMsg.idNumber" disabled></el-input>
            </el-form-item>
            <!-- 手机号 -->
            <el-form-item label="手机号码" prop="phone" ref="phone" class="left-item" align="left">
              <el-input type="tel" v-model="userMsg.phone" 
              auto-complete="off" :disabled="phoneUse"
              class="input-item"
              maxlength="11"
              @input="changes()"
              > </el-input>
              <el-button type="danger" class="phone-btn" 
              size="mini" @click="phoneUse = !phoneUse"
              v-if="phoneUse">修改</el-button>
              <el-button type="primary" class="phone-btn" 
              size="mini" @click="savePhoneNumber(ID,userMsg.phone)"
              v-if="!phoneUse" :disabled="!phoneModify">保存</el-button>
              <el-button type="info" 
              size="mini"  
              v-if="!phoneUse" @click="cancelPhoneNumber ">取消</el-button>
            </el-form-item>

            <el-form-item label="注册时间" class="center-item">
              <el-input type="text" v-model="loginTime" auto-complete="off" disabled></el-input>
            </el-form-item>

            <el-form-item label="电子邮箱" >
              <el-input type="text" v-model="userMsg.email" auto-complete="off" disabled></el-input>
            </el-form-item>

            <el-form-item label="详细地址" class="address-box">
              <el-input type="text" v-model="userMsg.address" class="address" auto-complete="off" disabled></el-input>
            </el-form-item>
            <!-- 交易记录，投资记录按钮 -->
            <el-form-item class="btn-box" >
              <el-button 
                type="danger" 
                @click="$router.push({name:'UserDeal',params:{id:ID, pages: 1}})"
              >交易记录</el-button>
              <el-button 
                type="primary"
                @click="$router.push({name:'UserPay',params:{id:ID, pages: 1}})"
              >投资记录</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <!-- 账户信息 -->
    <div class="card-body two-card">
      <div class="card">
        <div class="card-header">
          账户信息
        </div>
        <div class="card-body">
          <el-form :model="userMsg"  label-width="80px" class="ruleForm center-form">
          <!-- 总资产 -->
            <el-form-item label="总 资 产" class="left-item content-item" align="left">
              <el-input type="text" class="input-item" v-model="userMsg.assets" disabled></el-input>
            </el-form-item>
            <!-- 累计收益 -->
            <el-form-item label="累计收益" class="get-earn content-item">
              <el-input type="text" v-model="userMsg.profit" disabled></el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <div class="card-body two-card">
      <div class="card">
        <div class="card-header">
          理财经理信息
        </div>
        <div class="card-body">
          <el-form  label-width="80px" class="ruleForm center-form">
          <!-- 工号 -->
            <el-form-item :label="'工'+' '+'号'" class="left-item content-item" align="left">
              <el-input type="text" class="input-item" v-model="userMsg.managerNumber" :disabled="userNumberUse"></el-input>
              <el-button type="danger" class="phone-btn" size="mini" v-if="userNumberUse"
                @click="userNumberUse = !userNumberUse"
              >修改</el-button>
              <el-button type="primary"
                class="phone-btn" 
                size="mini" 
                v-if="!userNumberUse" :disabled="userMsg.managerNumber == ''"
                @click ="saveManageNumber(ID,userMsg.managerNumber)"
                >保存</el-button>
              <el-button type="info" size="mini"  v-if="!userNumberUse"
                @click="cancelManageNumber">取消</el-button>
            </el-form-item>
          </el-form>
        </div> 
      </div>
    </div>
    <div class="card-body two-card">
      <div class="card">
        <div class="card-header">
          证件信息
        </div>
        <div class="card-body">
           <el-form  label-width="84px" class="ruleForm center-form">
          <!-- 取消实名 -->
            <el-form-item label="身份证正面" class="left-item content-item" align="left">
              <img :src="userMsg.idFront " v-if="realStatus" alt="" class="idImg">
              <div class="nullMsg" v-if="!realStatus">无有效信息</div>
            </el-form-item>
            <el-form-item label="身份证反面" class="left-item content-item" align="left">
              <img :src="userMsg.idBack " v-if="realStatus" alt="" class="idImg">
              <div class="nullMsg" v-if="!realStatus">无有效信息</div>
            </el-form-item>
              <el-button type="primary" plain class="cancel-Id"
                @click="cancelId(ID)"
                :disabled="! (userMsg.idAuthentication == 20)"
              >取消实名</el-button>
          </el-form>
        </div> 
      </div>
    </div>
    <div class="card-body two-card">
      <div class="card">
        <div class="card-header">
          银行卡信息（最多绑两张卡）
        </div>
        <div class="card-body">
          <el-form  v-if="!showBank"
            label-width="80px" class="ruleForm center-form" v-for="(item,index) in userMsg.bankId" :key ="index" >
            <!-- 银行卡信息 -->
            <el-form-item label="开 户 行" align="left">
              <el-input type="text" class="input-item" v-model="item.bankName" disabled></el-input>
            </el-form-item>
            <!-- 银行卡信息-->
            <el-form-item label="银行卡号" class="get-earn">
              <el-input type="text" class="input-item" v-model="item.cardNumber" disabled></el-input>
              <el-button type="primary" plain class="cancel-card"
                @click="deleteCard(ID,item.cardNumber)">解绑</el-button>
            </el-form-item>
          </el-form>
          <div class="nullMsg" v-if="showBank">无有效信息</div>
          <!-- 这里通过相等操作符判断这个数组如果是空数组，就会显示无有效信息 -->
        </div> 
      </div>
    </div>
    <el-button type="success" plain class="goBack-btn" @click="$router.go(-1)">返回</el-button>
  </div> 
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { setTimeout } from "timers";
@Component
export default class UserMsg extends Vue {
  //获取数据
  userMsg: any = {}; //用户页数据
  phoneUse: boolean = true; //手机号修改
  phoneModify: boolean = true; //禁用保存修改手机号码
  userNumberUse: boolean = true; //工号修改
  manageNumber: string = ""; //工号值
  phoneNumber: string = ""; //电话号码值
  created() {
    //获得数据请求参数
    this.getUserMsg();
  }
  // 定义一个获取数据的函数
  getUserMsg(): void {
    let id: string = this.$route.params.id;
    (this as any).$api.user.getMsg(id).then((response: any) => {
      if (response.data.code) {
        this.userMsg = response.data.data;
        this.manageNumber = response.data.data.managerNumber;
        this.phoneNumber = response.data.data.phone;
      }
    });
  }
  get ID() {
    return this.$route.params.id; //计算属性获取路由参数 id
  }
  get realStatus() {
    return this.userMsg.idAuthentication === 20;
  }
  get showBank() {
    if (this.userMsg.bankId) {
      return this.userMsg.bankId.length == 0;
    }
  }
  get loginTime() {
    //注册时间的
    let value = new Date(this.userMsg.gmtCreate);
    let year = value.getFullYear();
    let month = value.getMonth() + 1; //getMonth是从0开始，所以加+
    let day = value.getDate();
    return year + "-" + month + "-" + day;
  }
  //自定义表达验证规则
  checkPhone = (rule: any, value: string, callback: any) => {
    let number = Number(value); //定义数字
    if (value.length == 0) {
      return callback(new Error("手机号不能为空"));
    } else if (value.length > 0) {
      setTimeout(() => {
        if (!Number.isInteger(number)) {
          return callback(new Error("请输入数字值"));
        } else {
          if (value.toString().length != 11) {
            callback(new Error("手机号位数应为11位"));
          } else {
            return callback();
          }
        }
      }, 200);
    }
  };
  //定义验证的规则
  rules: object = {
    phone: [{ validator: this.checkPhone, trigger: "blur" }]
  };
  //重置表单，定义$refs保证元素能调用方法
  $refs: any = {
    userForm1: HTMLFormElement
  };
  //弹窗解绑银行卡
  deleteCard(id: string, cardNumber: number) {
    this.$confirm(
      "<div><p>解绑将删除该银行卡信息</p><h3>确定解绑</h3></div>",
      "操作提示",
      {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true,
        dangerouslyUseHTMLString: true
      }
    )
      .then(() => {
        (this as any).$api.user.deleteCard(id, cardNumber).then(() => {
          (this as any).$message({
            type: "success",
            message: "解绑成功"
          });
          this.getUserMsg();
        });
      })
      //请求成功后刷新本页面,或者从新调用search方法
      .catch(() => {
        (this as any).$message({
          type: "info",
          message: "取消操作"
        });
      });
  }
  //取消实名
  cancelId(id: number) {
    this.$confirm("是否取消实名", "操作提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
      center: true,
      dangerouslyUseHTMLString: true
    })
      .then(() => {
        (this as any).$api.user.changeVerification(id).then(() => {
          (this as any).$message({
            type: "success",
            message: "取消实名成功"
          });
          this.getUserMsg();
        });
      })
      //请求成功后刷新本页面,或者从新调用search方法
      .catch(() => {
        (this as any).$message({
          type: "info",
          message: "取消操作"
        });
      });
  }
  //取消修改工号
  cancelManageNumber() {
    this.userMsg.managerNumber = this.manageNumber;
    this.userNumberUse = !this.userNumberUse;
  }
  //保存工号
  saveManageNumber(id: string, number: string) {
    if (number == this.manageNumber)
      return (this.userNumberUse = !this.userNumberUse);
    (this as any).$api.user.changeManage(id, number).then(() => {
      this.getUserMsg();
      this.userNumberUse = !this.userNumberUse;
      this.$message({
        type: "success",
        message: "工号修改成功"
      });
    }); //保存工号后刷新页面
  }
  //取消修改手机号
  cancelPhoneNumber() {
    setTimeout(() => {
      this.$refs.phone.clearValidate();
    }, 500);
    this.userMsg.phone = this.phoneNumber;
    this.phoneUse = !this.phoneUse;
  }
  //保存手机号修改
  savePhoneNumber(id: string, number: string) {
    if (number == this.phoneNumber) return (this.phoneUse = !this.phoneUse);
    (this as any).$api.user.changePhone(id, number).then((res: any) => {
      console.log(res);
      let data = res.data;
      if (data.code == 1) {
        this.getUserMsg();
        this.$refs.phone.clearValidate();
        this.phoneUse = !this.phoneUse;
        this.$message({
          type: "success",
          message: "手机号修改成功"
        });
      } else {
        this.$message.error(data.message);
        this.phoneUse = !this.phoneUse;
        this.userMsg.phone = this.phoneNumber;
      }
    });
  }
  changes() {
    this.$refs.userForm1.validate((valid: boolean) => {
      if (valid) {
        this.phoneModify = true;
      } else {
        this.phoneModify = false;
        return false;
      }
    });
  }
}
</script>
<style lang="scss" scoped>
.ruleForm {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  @media (min-width: 1520px) {
    width: 1200px;
  }
  //中间布局
  .center-item {
    margin-left: -30px;
  }
  //地址输入框要铺满全局
  .address-box {
    flex-basis: 100%;
    .address {
      width: 100% !important;
    }
  }
  .left-item {
    flex-basis: 414px;
    margin-right: -30px;
  }
  .input-item {
    width: 200px;
  }
  //交易记录，投资记录按钮
  .btn-box {
    flex-basis: 100%;
    display: flex;
    justify-content: flex-start;
    margin-left: 0;
    margin-bottom: 0;
  }
  .phone-btn {
    margin-left: 10px;
  }
}
.card-header {
  text-align: left;
}
//卡片的头部为0
.two-card {
  padding-top: 0;
  margin-top: -15px;
}
.center-form {
  justify-content: flex-start;
  .get-earn {
    margin-left: 20px;
  }
  .content-item {
    margin-bottom: 0;
  }
}
//控制身份证的尺寸
.idImg {
  width: 283px;
}
//取消实名按钮
.cancel-Id {
  height: 40px;
}
//解绑银行卡
.cancel-card {
  margin-left: 35px;
}
.goBack-btn {
  width: 100px;
  margin: 0 1rem 1rem;
}
</style>
