<template>
  <div>
    <div class="card">
      <div class="card-header" >
        修改密码
      </div>
      <div class="card-body">
        <el-form :model="modify" status-icon 
          :rules="rules" ref="ruleForm" 
          label-width="100px" class="modify-form" >
          <el-form-item label="输入旧密码" class="modify-item" prop="oldPwd">
            <el-input type="password" v-model="modify.oldPwd"></el-input>
          </el-form-item>
          <el-form-item label="设置新密码" class="modify-item" prop="newPwd">
            <el-input type="password" v-model="modify.newPwd" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认新密码" class="modify-item" prop="checkPwd">
            <el-input type="password" v-model="modify.checkPwd" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item class="btn-box">
            <el-button type="primary" class="keep-btn" @click="keep">保存</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
@Component
export default class ModifyPassword extends Vue {
  //自定义表达验证规则,这里要保证有个初始值
  modify: any = {
    newPwd: "",
    checkPwd: ""
  };
  private newPwd = (rule: any, value: string, callback: any) => {
    if (value === "") {
      callback(new Error("请输入密码"));
    } else {
      if (value.length < 6) {
        callback(new Error("新密码只少是6位"));
        return;
      }
      if (value === this.modify.oldPwd) {
        callback(new Error("新密码不能等于旧密码"));
        return;
      }
      if (this.modify.checkPwd !== "") {
        (this as any).$refs.ruleForm.validateField("checkPwd");
      }
      callback();
    }
  };
  private validatePwd = (rule: any, value: string, callback: any) => {
    if (value === "") {
      callback(new Error("请再次输入密码"));
    } else if (value !== this.modify.newPwd) {
      callback(new Error("两次输入密码不一致!"));
    } else {
      callback();
    }
  };
  //定义验证的虽则
  rules: object = {
    oldPwd: [{ required: true, message: "请输入旧密码", trigger: "blur" }],
    newPwd: [{ validator: this.newPwd, trigger: "blur" }],
    checkPwd: [{ validator: this.validatePwd, trigger: "blur" }]
  };
  //保存密码
  keep() {
    //验证表单
    (this as any).$refs["ruleForm"].validate((valid: boolean) => {
      if (valid) {
        //表单验证通过，发送http请求
        (this as any).$api.backAccount
          .modifyPwd(this.modify)
          .then((res: any) => {
            if (res.data.code) {
              //成功
              this.$message({
                message: "密码修改成功，跳转回登陆页",
                type: "success"
              });
              setTimeout(() => {
                this.$router.push({ name: "backend" });
              }, 2000);
            } else {
              //失败，重置表单
              this.$message({
                message: res.data.message,
                type: "error"
              });
              this.modify = {
                newPwd: "",
                checkPwd: "",
                oldPwd: ""
              };
            }
          });
      } else {
        return false;
      }
    });
  }
}
</script>
<style lang="scss" scoped>
.card-header {
  text-align: left;
}
.modify-form {
  width: 50%;
  margin: 50px auto;
  @media (min-width: 1520px) {
    width: 1200px;
  }
  .modify-item {
    margin-bottom: 35px;
  }
  .btn-box {
    text-align: left;
    .keep-btn {
      width: 200px;
    }
  }
}
</style>
