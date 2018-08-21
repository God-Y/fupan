<template>
  <div>
    <div class="card">
      <div class="card-body">
        <el-form :model="userForm" ref="userForm1" label-width="96px" class="ruleForm">
          <!-- 产品名称 -->
          <el-form-item label="产品名称"  width="150px">
            <el-input type="tel" v-model="userForm.productName" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="出借合同编号"   width="150px">
            <el-input type="tel" v-model="userForm.lendingContractNumber" auto-complete="off"></el-input>
          </el-form-item>
          <!-- 日期组件 -->
           <el-form-item label="起息日期" prop="idName" ref="idName">
            <date
              :upperDate="userForm.valueStartlowerDate"
              :lowerDate="userForm.valueStartupperDate"
              @start-change="getStartdown"
              @end-change="getStartup"
            ></date>
          </el-form-item>
           <el-form-item label="投资状态" prop="status">
            <el-select v-model="userForm.investmentSatus" placeholder="全部" >
              <el-option label="投资中" value="10"></el-option>
              <el-option label="退出中" value="20"></el-option>
              <el-option label="已退出" value="30"></el-option>
            </el-select>
          </el-form-item>
           <el-form-item label="债权协议编号"  width="150px">
            <el-input type="tel" v-model="userForm.creditContractNumber" auto-complete="off"></el-input>
          </el-form-item>
          <!-- 姓名 -->
          <!-- 日期组件 -->
           <el-form-item label="起息日期" prop="idName" ref="idName">
            <date
              :upperDate="userForm.valueEndlowerDate"
              :lowerDate="userForm.valueEndupperDate"
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
  userForm: any = {
    valueStartlowerDate: "", //起息时间下限
    valueStartupperDate: "", //起息时间上限
    valueEndlowerDate: "",
    valueEndupperDate: ""
  };
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
  resetForm() {
    (this as any).userForm = {
      valueStartlowerDate: "", //起息时间下限
      valueStartupperDate: "", //起息时间上限
      valueEndlowerDate: "",
      valueEndupperDate: ""
    };
  }
  //搜索按钮的实现
  search(): void {
    let ID = this.$route.params.id;
    this.$router.push({
      path: `/back/user-deal/${ID}`,
      query: this.userForm
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
