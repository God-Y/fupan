<template>
  <div>
    <div class="card">
      <div class="card-header">
        {{title}}账户
      </div>
      <div class="card-body">
        <el-form :model="User" status-icon label-position="left" :rules="rules" ref="ruleForm" label-width="100px" class="manage-form">
          <el-form-item label="登录名" prop= "name">
            <el-input v-model="User.name" :disabled="nameUse"></el-input>
          </el-form-item>
          <el-form-item label="手机号码" prop= "phone" >
            <el-input v-model="User.phone" max-length="11"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="User.password" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="rePassword">
            <el-input type="password" v-model="User.rePassword" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="角色名" align="left" prop="roleName" >
            <el-select v-model="role" placeholder="全部"  class="input-item">
              <el-option 
                v-for ="item in roleList" 
                :label="item.roleName" 
                :value="item.roleName"
                :key="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item align="left">
            <el-button type="primary" @click="submit()">确定</el-button>
            <el-button @click="$router.go(-1)">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
@Component
export default class ManageAccount extends Vue {
  //设置一个字符串，确定是新增还是
  title: string = "";
  //编辑页不可以编辑用户名
  nameUse: boolean = false;
  //发送http请求，获取数据
  User: any = {
    password: "",
    rePassword: "",
    phone: "",
    name: ""
  };
  role: string = "";
  get msg() {
    //计算属性获取值
    return this.$route.params.msg;
  }
  //获取角色数据
  roleList: any = [];
  getRoles() {
    (this as any).$api.backRoles.all().then((res: any) => {
      let data = res.data;
      if (data.code) {
        this.roleList = data.data;
      }
    });
  }
  //根据id获取相关账户的角色相关信心
  getUserMsg() {
    let ID = this.$route.params.id;
    (this as any).$api.backAccount.getUserMsg(ID).then((res: any) => {
      let data = res.data;
      if (data.code) {
        this.User.phone = data.data.phone;
        this.User.name = data.data.name;
        // this.User.roleName = data.data.roleName;
        this.role = data.data.roleName;
      }
    });
  }
  created() {
    //获取角色信息
    this.getRoles();
    if (this.msg == "add") {
      this.title = "新增";
      // alert(1)
    } else if (this.msg == "edit") {
      this.nameUse = true;
      this.title = "编辑";
      this.getUserMsg();
    }
  }
  //自定义表达验证规则
  private checkPhone = (rule: any, value: string, callback: any) => {
    let number = Number(value); //转成数字
    if (value === "") {
      callback(new Error("请输入手机号"));
    } else {
      setTimeout(() => {
        if (!Number.isInteger(number)) {
          callback(new Error("请输入数字值"));
        } else {
          switch (true) {
            case value.length == 11:
              callback();
              break;
            case value.length < 11:
              callback(new Error("手机号码小于11位"));
              break;
            default:
              callback(new Error("手机号码已大于11位"));
              break;
          }
        }
      }, 500);
    }
  };
  //密码验证规则
  private password = (rule: any, value: string, callback: any) => {
    if (value === "") {
      callback(new Error("请输入密码"));
    } else {
      if (value.length < 6) {
        callback(new Error("密码只少是6位"));
        return;
      }
      if (this.User.checkPwd !== "") {
        (this as any).$refs.ruleForm.validateField("rePassword");
      }
      callback();
    }
  };
  private validatePwd = (rule: any, value: string, callback: any) => {
    if (value === "") {
      callback(new Error("请再次输入密码"));
    } else if (value !== this.User.password) {
      callback(new Error("两次输入密码不一致!"));
    } else {
      callback();
    }
  };
  //用户名的表单验证
  private checkName = (rule: any, value: string, callback: any) => {
    let reg = /[`~!@#$^&*()=|{}':;',\\[\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]/g;
    if (value === "") {
      callback(new Error("请输入用户名"));
      return;
    } else {
      if (reg.test(value)) {
        callback(new Error("账户名不能输入特殊字符，只能为数字和字母"));
      } else {
        callback();
      }
    }
  };
  //定义验证的虽则
  rules: object = {
    phone: [{ validator: this.checkPhone, trigger: "blur" }],
    password: [{ validator: this.password, trigger: "blur" }],
    rePassword: [{ validator: this.validatePwd, trigger: "blur" }],
    name: [{ validator: this.checkName, trigger: "blur" }],
    roleName: [{ required: true, message: "请选择角色", trigger: "blur" }]
  };
  //提交按钮
  submit() {
    this.User.roleName = this.role;
    (this as any).$refs["ruleForm"].validate((valid: boolean) => {
      if (valid) {
        //新增账户的逻辑，发送http请求
        if (this.msg == "add") {
          (this as any).$api.backAccount
            .addAccount(this.User)
            .then((res: any) => {
              if (res.data.code) {
                //成功
                this.$message({
                  message: "新增成功，返回用户列表页",
                  type: "success"
                });
                setTimeout(() => {
                  this.$router.go(-1);
                }, 1000);
              } else {
                //失败，重置表单
                this.$message({
                  message: res.data.message,
                  type: "error"
                });
                this.User = {
                  name: "",
                  role: "",
                  phone: "",
                  checkPwd: "",
                  oldPwd: ""
                };
              }
            });
        }
        //编辑用户逻辑
        if (this.msg == "edit") {
          let ID = this.$route.params.id;
          (this as any).$api.backAccount
            .editAccount(ID, this.User)
            .then((res: any) => {
              if (res.data.code) {
                //成功
                this.$message({
                  message: "新增成功，返回用户列表页",
                  type: "success"
                });
                setTimeout(() => {
                  this.$router.go(-1);
                }, 1000);
              } else {
                //失败，重置表单
                this.$message({
                  message: res.data.message,
                  type: "error"
                });
                this.User = {
                  name: "",
                  role: "",
                  phone: "",
                  checkPwd: "",
                  oldPwd: ""
                };
              }
            });
        }
      } else {
        return false;
      }
    });
  }
}
</script>
<style lang="scss" scoped>
.manage-form {
  width: 50%;
  margin: 50px auto;
}
.card-header {
  text-align: left;
}
</style>
