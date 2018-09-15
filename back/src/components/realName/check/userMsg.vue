<template>
  <div class="card">
    <div class="card-header">个人信息</div>
    <div class="card-body">
      <div class="card-body">
          <el-form :model="userMsg"  label-width="80px" class="ruleForm">
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
              class="input-item"
              disabled
              > </el-input>
            </el-form-item>
            <!-- 注册时间 -->
            <el-form-item label="注册时间" class="center-item">
              <el-input type="text" v-model="loginTime" auto-complete="off" disabled></el-input>
            </el-form-item>
            <!-- 电子邮箱 -->
            <el-form-item label="电子邮箱" >
              <el-input type="text" v-model="userMsg.email" auto-complete="off" disabled></el-input>
            </el-form-item>
            <!-- 详细地址 -->
            <el-form-item label="详细地址" class="address-box">
              <el-input type="text" v-model="userMsg.address" class="address" auto-complete="off" disabled></el-input>
            </el-form-item>
          </el-form>
        </div>
    </div>
  </div>
</template>


<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
@Component
export default class UserMsg extends Vue {
  @Prop([Object])
  userDetial!: object;
  //定义一个计算属性属性，用来接收父级传过来的属性值
  get userMsg() {
    return (this as any).userDetial;
  }

  get loginTime() {
    //注册时间的
    let value = new Date((this as any).userMsg.gmtCreate);
    let year = value.getFullYear();
    let month = value.getMonth() + 1; //getMonth是从0开始，所以加+
    let day = value.getDate();
    return year + "-" + month + "-" + day;
  }
}
</script>

<style lang="scss" scoped>
.card {
  text-align: left;
}
.ruleForm {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  @media (min-width: 1520px) {
    width: 1200px;
  }
  .input-item {
    width: 200px;
  }
  .address-box {
    flex-basis: 100%;
  }
  .btn-box {
    flex-basis: 398px;
    display: flex;
    justify-content: flex-end;
    button {
      margin-left: 30px;
    }
  }
}
</style>
