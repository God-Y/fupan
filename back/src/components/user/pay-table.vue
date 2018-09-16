<template>
  <div class="card">
    <div class="card-header" v-if="tableParams[0]" >
      {{tableParams[0].userName}}的投资记录
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
          width="60"
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
          prop="phone"    width="120"
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
              <span class="contract" @click='showDialog'>
                {{scope.row.lendingContractNumber}}
              </span>
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
              {{scope.row.investmentStatus|payStatus}}
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
      <pages :total-num="total"  @page-change="toPage" v-if="payList.length && total > 10"></pages>    
      <div class="nullMsg" v-if="!payList.length && !loading">无有效信息</div>
      <el-dialog 
        title="查看合同" 
        :visible.sync="outerVisible"
        width='30%'
        class="dialog"
      >
        <div class="dialog-detial" @click="showinnerDialog">出借咨询与服务协议</div>
        <div class="dialog-detial" @click="showinnerDialog">授权委托书 - 出借确认和债权转让</div>
        <div class="dialog-detial" @click="showinnerDialog">授权委托书 - 催收及诉讼</div>
        <div class="dialog-detial" @click="showinnerDialog">出借本金确认书</div>
        <el-dialog
          width="80%"
          title="内层 Dialog"
          :visible.sync="innerVisible"
          append-to-body>
        </el-dialog>
        <div slot="footer" class="dialog-footer">
          <el-button @click="outerVisible = false">取 消</el-button>
        </div>
      </el-dialog>
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
export default class PayTable extends Vue {
  @Prop([Array])
  tableParams!: any;
  @Prop([Boolean])
  loading!: boolean;
  @Prop([Number])
  total!: number;

  outerVisible: boolean = false;
  innerVisible: boolean = false;
  get payList() {
    return this.tableParams;
  }
  get ID() {
    return this.$route.params.id;
  }
  toPage(val: number) {
    this.$router.push(`/back/user-pay/${this.ID}/${val}`);
  }
  showDialog() {
    this.outerVisible = true;
  }
  showinnerDialog() {
    this.innerVisible = true;
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
.contract {
  color: #409eff;
  cursor: pointer;
}
.dialog {
  text-align: left !important;
  .dialog-detial {
    padding-left: 30px;
    line-height: 30px;
    cursor: pointer;
    color: #409eff;
  }
}
</style>
