<template>
  <div>
    <div class="card">
      <div class="card-body">
        <el-form :model="userForm" ref="userForm1" label-width="96px" class="ruleForm">
          <!-- 产品名称 -->
          <el-form-item label="产品名称"  class="form-item" prop="productName">
            <el-input type="tel" v-model="userForm.productName" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="出借合同编号"  class="form-item" prop="lendingContractNumber">
            <el-input type="tel" v-model="userForm.lendingContractNumber" auto-complete="off"></el-input>
          </el-form-item>
          <!-- 日期组件 -->
           <el-form-item label="起息日期" prop="idName" ref="idName">
            <date
              :upperDate="userForm.valueStartupperDate"
              :lowerDate="userForm.valueStartlowerDate"
              @start-change="getStartdown"
              @end-change="getStartup"
            ></date>
          </el-form-item>
           <el-form-item label="投资状态" prop="investmentStatus" class="form-item">
            <el-select v-model="userForm.investmentStatus" placeholder="全部" >
              <el-option label="全部" value=""></el-option>
              <el-option label="投资中" value="10"></el-option>
              <el-option label="退出中" value="20"></el-option>
              <el-option label="已退出" value="30"></el-option>
            </el-select>
          </el-form-item>
           <el-form-item label="债权协议编号" class="form-item" prop="creditContractNumber">
            <el-input type="tel" v-model="userForm.creditContractNumber" auto-complete="off"></el-input>
          </el-form-item>
          <!-- 姓名 -->
          <!-- 日期组件 -->
           <el-form-item label="到息日期">
            <date
              :upperDate="userForm.valueEndupperDate"
              :lowerDate="userForm.valueEndlowerDate"
              @start-change="getEnddown"
              @end-change="getEndup"
            ></date>
          </el-form-item>
          <!-- 搜索清空那按钮 -->
          <el-form-item class="btn-box">
            <el-button type="danger" @click="resetForm('userForm1')">清空</el-button>
            <el-button type="primary" @click="search">搜索</el-button>
          </el-form-item>
        </el-form>
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
export default class PaySearch extends Vue {
  @Prop([Object])
  searchParams!: any; //定义结束搜索时间
  //关于表单搜索的数据，必须注意的是，组件
  //只接受string | number | Date格式
  userForm: any = this.searchParams;
  //从子级取到起息时间值
  getStartdown(value: any) {
    this.userForm.valueStartlowerDate = value;
  }
  getStartup(value: any) {
    this.userForm.valueStartupperDate = value;
  }
  //从子级取到到息时间值
  getEnddown(value: any) {
    this.userForm.valueEndlowerDate = value;
  }
  getEndup(value: any) {
    this.userForm.valueEndupperDate = value;
  }
  //重置清空表单
  resetForm(value: any) {
    let ID = this.$route.params.id;
    let pages = this.$route.params.pages;
    (this as any).$refs[value].resetFields();
    //跳转路由
    this.$router.push({
      path: `/back/user-pay/${ID}/1`,
      query: {}
    });
    this.$emit("clearParams", pages);
  }
  //搜索按钮的实现
  search(): void {
    let ID = this.$route.params.id;
    let pages = this.$route.params.pages;
    this.$router.push({
      path: `/back/user-pay/${ID}/${pages}`,
      query: this.userForm
    });
    this.$emit("searchList");
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
  .btn-box {
    flex-basis: 100%;
    display: flex;
    justify-content: flex-end;
    button {
      margin-left: 30px;
    }
  }
}
</style>
