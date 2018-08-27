<template>
  <div class="card">
    <div class="card-header account-header"  >
    {{productionName}}销量明细
    </div>
    <div class="card-body">
      <!-- 表格渲染开始 -->
      <el-table
        :data="productListst"
        border
        style="width: 100%"
        v-loading="loading"
        v-if="productListst.length"
        >
        <el-table-column
          label="序号"
          type="index"
          width="120"
          align="center"
          prop="id"
        >
        </el-table-column>
        <el-table-column
          label="日期" align="center">
            <template slot-scope="scope" >
            {{scope.row.purchaseDate|time}}
          </template>
        </el-table-column>
        <el-table-column
          label="购买人数"
           align="center" prop="purchaseNumber">
        </el-table-column>
        <el-table-column
          prop="purchases"    width="140"
          label="购买次数"  align="center" >
        </el-table-column>
        <el-table-column
          label="购买金额（元）"  align="center" >
           <template slot-scope="scope" >
            {{scope.row.purchaseCount|amount}}
          </template>
        </el-table-column>
        
      </el-table>
      <pages :total-num="total"  @page-change="toPage" v-if="productListst.length && total > 10"></pages>    
      <div class="nullMsg" v-if="!productListst.length && !loading">无有效信息</div>
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
  @Prop([String])
  productionName!: string;
  //获取数据
  get productListst() {
    return this.tableParams;
  }
  //根据页码跳转路由
  toPage(val: number) {
    let ID = this.$route.params.id;
    this.$router.push(`/back/production-statistics/${ID}/${val}`);
  }
}
</script>
<style lang="scss" scoped>
.card-header {
  text-align: left;
}
</style>
