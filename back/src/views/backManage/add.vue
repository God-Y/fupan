<template>
  <div>
    <div class="card">
      <div class="card-header">
        {{lebiao}}
      </div>
      <div class="card-body">
        <el-form :model="ruleForm" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
          <el-form-item label="登录名">
            <el-input v-model.number="ruleForm2.name"></el-input>
          </el-form-item>
          <el-form-item label="手机号码">
            <el-input v-model.number="ruleForm2.phone"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="角色名" class="" prop="status" >
            <el-select v-model="userForm.status" placeholder="全部"  class="input-item">
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
  userList: Array<object> = [];
  get pages() {
    //计算属性获取值
    return Number(this.$route.params.pages);
  }
  total: number = 0; //总条数
  //关于表单的数据
  userForm: any = {
    upperDate: "",
    lowerDate: ""
  };
  created() {
    let query: any = this.$route.query;
    let keys = Object.keys(query);
    //判断它的键值
    if (keys.length) {
      query.upperDate = query.upperDate ? Number(query.upperDate) : ""; //保证拿出的毫秒数是number类型
      query.lowerDate = query.lowerDate ? Number(query.lowerDate) : ""; //保证拿出的毫秒数是number类型
      keys.forEach(value => {
        //foreach循环
        this.userForm[value] = query[value];
        //赋值给查询对象
      });
    }
    this.getList(this.pages);
  }
  //可以扁担加载动画
  listLoading: boolean = true;
  //请求的http数据
  getList(id: any = 1) {
    (this as any).$api.user
      .list(this.userForm, id)
      .then((response: any) => {
        let data = response.data;
        if (data.code) {
          this.userList = data.data.list;
          this.total = data.data.total;
        }
      })
      .then(() => {
        //获取后加载动画取消
        this.listLoading = false;
      });
  }
  //从子级取到开始时间值
  getStart(value: number) {
    this.userForm.lowerDate = value;
  }
  //从子级取到开始时间值
  getEnd(value: number) {
    this.userForm.upperDate = value;
  }
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
    if (value.length == 0) {
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
    phone: [{ validator: this.checkPhone, trigger: "change" }],
    idName: [{ validator: this.checkName, trigger: "change" }]
  };
  //改变状态会弹窗
  changeStatus(status: number) {
    //判断当前的状态
    let alertMsg: string =
      status == 10 ? "冻结后将禁止用户登录App" : "解冻后将恢复用户登录权限";
    this.$confirm(alertMsg, "操作提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
      center: true
    })
      //冻结 ，解冻的操作写在这里
      .then(() => {
        this.freeze(status).then((res: any) => {
          let msg: string = status == 10 ? "冻结成功" : "解冻成功";
          this.$message({
            type: "success",
            message: msg
          });
          //请求成功后刷新本页面,或者从新调用search方法
          this.getList(this.pages);
        });
      })
      .catch(() => {
        this.$message({
          type: "info",
          message: "取消操作"
        });
      });
  }
  //搜索按钮的实现
  search(): void {
    this.$router.push({
      path: `/back/user/${this.pages}`,
      query: this.userForm
    });
    this.getList(this.pages);
  }
  //重置表单，定义$refs保证元素能调用方法
  $refs: any = {
    userForm1: HTMLFormElement
  };
  resetForm(formName: string) {
    this.userForm.upperDate = "";
    this.userForm.lowerDate = "";
    this.$refs[formName].resetFields();
    this.$router.push("/back/user/1");
    //等于1 的时候，搜索,上面的路由参数已经变成1了
    if (this.pages == 1) {
      this.getList();
    }
  }
  //冻结账号功能
  freeze(id: number | string): any {
    return (this as any).$api.user.changeStatus(id);
  }
  //查看个人详情信息
  getUserMsg(id: number | string): any {
    this.$router.push("/back/user-detial/" + id);
  }
  //页码跳转
  toPage(val: number) {
    this.$router.push(`/back/user/${val}`);
    this.getList(val);
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
