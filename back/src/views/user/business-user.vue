<template>
  <div>
    <div class="card">
      <div class="card-body">
        <el-form :model="userForm" status-icon :rules="rules" ref="userForm1" label-width="80px" class="ruleForm">
          <!-- 手机号 -->
          <el-form-item label="手机号码" prop="phone" ref="phone">
            <el-input type="tel" v-model="userForm.phone" auto-complete="off"></el-input>
          </el-form-item>
          <!-- 姓名 -->
          <el-form-item label="真实姓名" prop="idName" ref="idName">
            <el-input type="text" v-model="userForm.idName" auto-complete="off"></el-input>
          </el-form-item>
          <!-- 日期组件 -->
          <date
            :upperDate="userForm.upperDate"
            :lowerDate="userForm.lowerDate"
            @start-change="getStart"
            @end-change="getEnd"
          ></date>
          <el-form-item label="理财经理" prop="managerNumber">
            <el-input type="text" v-model="userForm.managerNumber" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="账户状态" prop="status">
            <el-select v-model="userForm.status" placeholder="全部" >
              <el-option label="正常" value="10"></el-option>
              <el-option label="冻结" value="20"></el-option>
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
    <div class="card">
      <div class="card-header">
        用户列表
      </div>
      <div class="card-body">
        <!-- 表格渲染开始 -->
        <el-table
          :data="userList"
          border
          style="width: 100%"
          v-loading="listLoading"
          >
          <el-table-column
            prop="userNumber"
            label="用户编号"
            width="140"
            align="center"  
          >
          </el-table-column>
          <el-table-column
            label="注册日期"
            width="140"  align="center" >
            <template slot-scope="scope" >
              {{scope.row.gmtCreate|time}}
            </template>
          </el-table-column>
          <el-table-column
            prop="phone"
            label="手机号"  align="center" >
          </el-table-column>
          <el-table-column
            prop="managerNumber"
            label="理财经理"  align="center" >
          </el-table-column>
          <el-table-column
            prop="idName"
            label="真实姓名"  align="center" > 
          </el-table-column>
          <el-table-column
            prop="assets"
            label="总资产（元）"  align="center" >
          </el-table-column>
          <el-table-column
            prop="profit"
            label="累计收益（元）" width="120"  align="center" >
          </el-table-column>
          <el-table-column label="账户状态"  align="center" >
            <template slot-scope="scope">
              <span :class="[scope.row.status==10? 'remove-freeze' :'freeze']">
                {{scope.row.status|status}}
              </span>
            </template>
          </el-table-column>
           <el-table-column
            label="操作"
            width="100"  align="center" >
            <template slot-scope="scope">
              <el-button 
              @click="changeStatus(scope.row.status)" 
              type="text" 
              size="small"
              :class="[scope.row.status==10 ? 'freeze' :'remove-freeze']"
              >
                {{scope.row.status|handleStatus}}
              </el-button>
              <el-button type="text" size="small" @click="getUserMsg(scope.row.id)">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
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
export default class BusinessUser extends Vue {
  //发送http请求，获取数据
  userList: Array<object> = [];
  
  created() {
    (this as any).$api.user
      .list("")
      .then((response: any) => {
        let data = response.data;
        if (data.code) this.userList = data.data.list;
      })
      .then(() => {
        //获取后加载动画取消
        this.listLoading = false;
      });
  }
  //可以扁担加载动画
  listLoading: boolean = true;
  //关于表单的数据
  userForm: any = {
    phone: "",
    idName: "",
    status: "",
    managerNumber: "",
    upperDate: "",
    lowerDate: ""
  };
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
    phone: [{ validator: this.checkPhone, trigger: "blur" }],
    idName: [{ validator: this.checkName, trigger: "blur" }]
  };
  //重置表单，定义$refs保证元素能调用方法
  $refs: any = {
    userForm1: HTMLFormElement
  };
  resetForm(formName: string) {
    this.userForm.upperDate = "";
    this.userForm.lowerDate = "";
    this.$refs[formName].resetFields();
  }
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
          this.$router.go(0);
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
    (this as any).$api.user.list(this.userForm).then((res: any) => {
      let data = res.data;
      if (data.code) this.userList = data.data.list;
    });
  }
  //冻结账号功能
  freeze(id: number | string): any {
    return (this as any).$api.user.changeStatus(id);
  }
  //查看个人详情信息
  getUserMsg(id: number | string): any {
    this.$router.push("/back/user/" + id);
  }
}
</script>
<style lang="scss" scoped>
.ruleForm {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .btn-box {
    flex-basis: 441px;
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
