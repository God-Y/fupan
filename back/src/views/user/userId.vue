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
              <el-input type="text" v-model="userMsg.userNumber" disabled></el-input>
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
              <el-input type="tel" v-model="userMsg.phone" auto-complete="off" :disabled="phoneUse"> </el-input>
              <el-button type="danger" class="phone-btn" size="mini" v-if="phoneUse">修改</el-button>
              <el-button type="primary" class="phone-btn" size="mini" v-if="!phoneUse">保存</el-button>
              <el-button type="info" size="mini"  v-if="!phoneUse">取消</el-button>
            </el-form-item>
            <el-form-item label="注册时间" class="center-item">
              <el-input type="text" v-model="userMsg.gmtCreate" auto-complete="off" disabled></el-input>
            </el-form-item>
            <el-form-item label="电子邮箱" >
              <el-input type="text" v-model="userMsg.email" auto-complete="off" disabled></el-input>
            </el-form-item>
            <el-form-item label="详细地址" class="address-box">
              <el-input type="text" v-model="userMsg.address" class="address" auto-complete="off" disabled></el-input>
            </el-form-item>
            <!-- 搜索清空那按钮 -->
            <el-form-item class="btn-box" >
              <el-button type="danger">交易记录</el-button>
              <el-button type="primary">投资记录</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <div class="card-body two-card">
      <div class="card">
        <div class="card-header">
          账户信息
        </div>
        <div class="card-body">
          <el-form :model="userMsg"  label-width="80px" class="ruleForm center-form">
          <!-- 总资产 -->
            <el-form-item label="总 资 产" class="left-item content-item" align="left">
              <el-input type="text" v-model="userMsg.userNumber" disabled></el-input>
            </el-form-item>
            <!-- 累计收益 -->
            <el-form-item label="累计收益" class="get-earn content-item">
              <el-input type="text" v-model="userMsg.idName" disabled></el-input>
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
          <!-- 用户编号 -->
            <el-form-item label="工号" class="left-item content-item" align="left">
              <el-input type="text" v-model="userMsg.userNumber" disabled></el-input>
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
          <!-- <div class="ID-box">
            <div class="ID-front">
              <span></span>
            </div>
            <div class="ID-reverse">

            </div>
          </div> -->
           <el-form  label-width="84px" class="ruleForm center-form">
          <!-- 用户编号 -->
            <el-form-item label="身份证正面" class="left-item" align="left">
              <!-- <img :src="UserMsg.idFront" alt=""> -->
            </el-form-item>
            <el-form-item label="身份证反面" class="left-item" align="left">
              <img src="" alt="">
            </el-form-item>
          </el-form>
        </div> 
        <!-- <img :src="UserMsg.idFront" alt=""> -->
        <!-- <span>{{UserMsg.idFront}}</span> -->
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
@Component
export default class UserMsg extends Vue {
  //发送http请求，获取数据
  userMsg: Object = {};
  phoneUse: boolean = true;
  created() {
    //获得数据请求参数
    let id: string = this.$route.params.id;
    (this as any).$api.user
      .getMsg(id)
      .then((response: any) => {
        if (response.data.code) this.userMsg = response.data.data;
      })
      .then(() => {
        //获取后加载动画取消
        // this.listLoading = false;
      });
  }
  //自定义表达验证规则
  private checkPhone = (rule: any, value: string, callback: any) => {
    let number = Number(value); //定义数字
    if (value.length == 0) {
      return this.$refs.phone.resetField(); //这里必须调用该元素的resetFileld()方法
    } else if (value.length > 0) {
      setTimeout(() => {
        if (!Number.isInteger(number)) {
          callback(new Error("请输入数字值"));
        } else {
          if (value.toString().length > 11) {
            callback(new Error("已超过手机号位数，应为11位"));
          } else {
            callback();
          }
        }
      }, 500);
    }
  };
  //定义验证的虽则
  rules: object = {
    phone: [{ validator: this.checkPhone, trigger: "blur" }]
  };
  //重置表单，定义$refs保证元素能调用方法
  $refs: any = {
    userForm1: HTMLFormElement
  };
}
</script>
<style lang="scss" scoped>
.ruleForm {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  //左侧布局
  .left-item {
    flex-basis: 412px;
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
</style>
