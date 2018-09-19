<template>
  <div class="card">
    <div class="card-header">
      销量统计
    </div>
    <div class="card-body">
      <!-- 表格渲染开始 -->
      <el-table
        :data="statisticsList"
        border
        style="width: 100%"
        v-loading="loading"
        v-if="statisticsList.length"
        >
        <el-table-column
          label="序号"
          width="80"
          align="center"
          prop="productId"
        >
        </el-table-column>
        <el-table-column
          label="产品代码"
           align="center" prop="productCode">
        </el-table-column>
        <el-table-column
          label="产品名称"
            align="center" prop="productName">
        </el-table-column>
        <el-table-column
          prop="purchaseNumber"    width="140"
          label="购买人数"  align="center" >
        </el-table-column>
        <el-table-column
          label="购买次数"   width="120"   align="center">
          <template slot-scope="scope" >
            {{scope.row.purchase}}
          </template>
        </el-table-column>
        <el-table-column
          
          label="购买总额（元）"  align="center" > 
          <template slot-scope="scope" >
            {{scope.row.totalPurchases|amount}}
          </template>
        </el-table-column>
          <el-table-column
            label="操作"
            width="160"  align="center" >
            <template slot-scope="scope">
              <el-button type="text"  @click="goDetail(scope.row.productId,scope.row.productName)">查看明细</el-button>
            </template>
          </el-table-column>
      </el-table>
      <pages :total-num="total"  @page-change="toPage" v-if="statisticsList.length && total > 10"></pages>    
      <div class="nullMsg" v-if="!statisticsList.length && !loading">无有效信息</div>
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
export default class BackAcconutTable extends Vue {
  @Prop([Array])
  tableParams!: any;
  @Prop([Boolean])
  loading!: boolean;
  @Prop([Number])
  total!: number;
  //获取明细
  get statisticsList() {
    return this.tableParams;
  }
  //根据页码跳转路由
  toPage(val: number) {
    this.$router.push(`/back/sale-statistics/${val}`);
  }
  //查看明细
  goDetail(id: number, name: string) {
    this.$store.commit("production", name);
    this.$router.push(`/back/production-statistics/${id}/1`);
  }
}
</script>

<style lang="scss" scoped>
.card-header {
  text-align: left;
}
</style>
