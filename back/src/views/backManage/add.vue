<template>
  <div>
    <div class="card">
      <div class="card-header">
      列表
      </div>
      <div class="card-body">
        <el-form :model="User" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="manage-form">
          <el-form-item label="登录名">
            <el-input v-model="User.name"></el-input>
          </el-form-item>
          <el-form-item label="手机号码">
            <el-input v-model.number="User.phone"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="User.password" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="User.rePassword" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="角色名" class="" prop="status" >
            <el-select v-model="userForm.role" placeholder="全部"  class="input-item">
              <el-option :label="item.roleName" :value="item.roleName" v-for ="item in roleList" :key="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm2')">确定</el-button>
            <el-button @click="resetForm('ruleForm2')">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
@Component
export default class BusinessUser extends Vue {
  //发送http请求，获取数据
  User: any = {};
  get msg() {
    //计算属性获取值
    return Number(this.$route.params.msg);
  }
  //获取角色数据
  // roleList: object[] = [];
  // getRoles(pages: any = 1) {
  //   (this as any).$api.backRoles.getRole(pages).then((res: any) => {
  //     let data = res.data;
  //     if (data.code) {
  //       this.roleList = data.data.list;
  //     }
  //   });
  // }
  // created() {
  //   //获取角色信息
  //   this.getRoles();
  //   if (msg == "add") {
  //     alert(1)
  //   }else if (msg == "edit") {
  //     alert(2)
  //   }
  // }
  // //如果是编辑用户，获取用户的账号和手机号
  // getList(id: any = 1) {
  //   (this as any).$api.user
  //     .list(this.userForm, id)
  //     .then((response: any) => {
  //       let data = response.data;
  //       if (data.code) {}
  //     })
  //     .then(() => {
  //       //获取后加载动画取消
  //     });
  // }

  // //自定义表达验证规则
  // private checkPhone = (rule: any, value: string, callback: any) => {
  //   console.log(value);
  //   let number = Number(value); //转成数字
  //   if (value.length == 0) {
  //     callback(new Error("请输入密码"));
  //   } else if (value.length > 0) {
  //     setTimeout(() => {
  //       if (!Number.isInteger(number)) {
  //         callback(new Error("请输入数字值"));
  //       } else {
  //         if (value.toString().length > 11) {
  //           callback(new Error("已超过手机号位数，应为11位"));
  //         } else {
  //           callback();
  //         }
  //       }
  //     }, 500);
  //   }
  // };
  // //定义验证的虽则
  // rules: object = {
  //   phone: [{ validator: this.checkPhone, trigger: "change" }]
  // };
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
  .input-item {
    width: 200px;
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
.card-header {
  text-align: left;
}
.freeze {
  color: #f56c6c;
}
.remove-freeze {
  color: #67c23a;
}
</style>
