<template>
  <div class="card">
      <div class="card-body">
        <el-form :model="userForm" status-icon :rules="rules" ref="userForm1" label-width="80px" class="ruleForm">
          <!-- 手机号 -->
          <el-form-item label="手机号码" prop="phone" ref="phone">
            <el-input type="tel" v-model="userForm.phone" auto-complete="off"></el-input>
          </el-form-item>
          <!-- 姓名 -->
          <el-form-item label="真实姓名" prop="idName"  ref="idName">
            <el-input type="text" v-model="userForm.idName" class="input-item" auto-complete="off"></el-input>
          </el-form-item>
          <!-- 日期组件 -->
          <el-form-item label="申请日期">
            <date
              :lowerDate="userForm.lowerDate"
              :upperDate="userForm.upperDate"
              @start-change="getStart"
              @end-change="getEnd"
            ></date>
          </el-form-item>
          <el-form-item label="用户编号" prop="managerNumber">
            <el-input type="text" v-model="userForm.userNumber" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="实名状态" prop="status"> 
            <el-select v-model="userForm.idAuthentication" placeholder="全部"  class="input-item">
              <el-option label="未认证" value="10"></el-option>
              <el-option label="已认证" value="20"></el-option>
              <el-option label="已拒绝" value="30"></el-option>
              <el-option label="再申请" value="40"></el-option>
              <el-option label="已取消" value="50"></el-option>
            </el-select>
          </el-form-item>
          <!-- 搜索清空那按钮 -->
          <el-form-item class="btn-box">
            <el-button type="danger" @click="resetForm('userForm1')">清空</el-button>
            <el-button type="primary" @click="search">搜索</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
</template>


<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import Date from "common_Components/date/double-date.vue";
@Component({
  components: {
    Date
  }
})
export default class RealCheckForm extends Vue {
  @Prop([Object])
  searchParams!: any; //定义结束搜索时间
  //关于表单搜索的数据，必须注意的是，组件
  userForm: any = this.searchParams;
  //从子级取到开始时间值
  getStart(value: number) {
    this.userForm.lowerDate = value;
  }
  //从子级取到结束时间值
  getEnd(value: number) {
    this.userForm.upperDate = value;
  }
  //重置表单，定义$refs保证元素能调用方法
  $refs: any = {
    userForm1: HTMLFormElement
  };
  //自定义表达验证规则
  private checkPhone = (rule: any, value: string, callback: any) => {
    console.log(value);
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
  private checkName = (rule: any, value: string, callback: any) => {
    //真实姓名自定义验证规则
    if (!value) {
      return this.$refs.idName.resetField();
    } else {
      setTimeout(() => {
        //中文验证
        let re: RegExp = new RegExp("[\\u4E00-\\u9FFF]+", "g");
        if (!re.test(value)) {
          callback(new Error("请输入中文"));
        } else {
          callback();
        }
      }, 500);
    }
  };
  //定义验证的虽则
  rules: object = {
    phone: [{ validator: this.checkPhone, trigger: "blur" }],
    idName: [{ validator: this.checkName, trigger: "blur" }]
  };
  //重置清空表单
  resetForm() {
    //循环所有的项
    this.$refs["userForm1"].resetFields();
    let pages = (this as any).$route.params.pages;
    for (let key in this.userForm) {
      this.userForm[key] = undefined;
    }
    this.userForm.upperDate = "";
    this.userForm.lowerDate = "";
    this.$router.push({
      path: `/back/verifiel/1`,
      query: {}
    });
    if (pages == "1") {
      //这里如何是在第一页搜索的话，父级组件重新请求数据
      (this as any).$parent.getList(this.userForm);
    }
  }
  //搜索按钮的实现
  search(): void {
    let pages = this.$route.params.pages;
    this.$router.push({
      path: `/back/verifiel/${pages}`,
      query: this.userForm
    });
    (this as any).$parent.getList(this.userForm, pages);
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
  .form-item {
    width: 280px;
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
</style>
