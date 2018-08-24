<template>
  <div class="card">
    <div class="card-header">
      {{userName}}的投资记录
    </div>
    <div class="card-body">
      <!-- 表格渲染开始 -->
      <el-table
        :data="payList"
        border
        style="width: 100%"
        v-loading="loading"
        v-if="payList.length"
        >
        <el-table-column
          type="index"
          label="序号"
          width="80"
          align="center"  
        >
        </el-table-column>
        <el-table-column
          label="起息日期"
          width="100"  align="center" >
          <template slot-scope="scope" >
            {{scope.row.valueDateStart|time}}
          </template>
        </el-table-column>
        <el-table-column
          label="到息日期"
          width="100"  align="center" >
          <template slot-scope="scope" >
            {{scope.row.valueDateEnd|time}}
          </template>
        </el-table-column>
        <el-table-column
          prop="phone"    width="140"
          label="手机号"  align="center" >
        </el-table-column>
        <el-table-column
          prop="userName"     width="80"
          label="姓名"  align="center" > 
        </el-table-column>
        <el-table-column
          prop="productName" width="90"
          label="产品名称"  align="center" >
        </el-table-column>
        <el-table-column
          label="出借合同编号"  align="center" >
            <template slot-scope="scope" >
            {{scope.row.lendingContractNumber}}
          </template>
        </el-table-column>
        <el-table-column
          label="投资金额（元）"  align="center" >
            <template slot-scope="scope" >
            {{scope.row.investmentAmount}}
          </template>
        </el-table-column>
        <el-table-column
          label="未分配收益（元）"  align="center" >
            <template slot-scope="scope" >
            {{scope.row.undistributedIncome}}
          </template>
        </el-table-column>
        <el-table-column
          label="已分配收益（元）"  align="center" >
            <template slot-scope="scope" >
            {{scope.row.undistributedIncome}}
          </template>
        </el-table-column>
        <el-table-column
          label="投资状态"  width="78" align="center" >
          <template slot-scope="scope">
            <span :class="'status'+scope.row.investmentStatus">
              {{scope.row.investmentStatus}}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="债权协议编号"   align="center" >
          <template slot-scope="scope">
            <span class="">
              {{scope.row.creditContractNumber}}
            </span>
          </template>
        </el-table-column>
      </el-table>
      <pages :total-num="total"  @page-change="toPage" v-if="payList.length"></pages>    
      <div class="nullMsg" v-if="!payList.length">无有效信息</div>
    </div>
  </div>
</template>


<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import Pages from "common_Components/page/pagination.vue";

@Component({
  components: {
    Pages
  }
})
export default class DealRecode extends Vue {
  @Prop([Array])
  tableParams!: any;
  @Prop([Boolean])
  loading!: boolean;
  @Prop([Number])
  total!: number;
  get payList() {
    return this.tableParams;
  }
  userName: string = "";
  created() {
    this.userName = this.tableParams[0].userName;
  }
  toPage(val: number) {
    this.$router.push(`/back/user-pay/${val}`);
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
.status20 {
  color: #f56c6c;
}
.status10 {
  color: #67c23a;
}
.status30 {
  color: #409eff;
}
</style>
