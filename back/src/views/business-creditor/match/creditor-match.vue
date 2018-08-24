<template>
    <div>
       <mtachSearch></mtachSearch>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>匹配</span>
            <el-button @click="mathDetailed" style="float: right; padding: 3px 0" type="text">匹配</el-button>
          </div>
          <el-table :data="dataList" border class="table-style" style="width: 100%;" >
              <el-table-column prop="lendingContractNumber" label="出借合同编号" header-align="center"> </el-table-column>
              <el-table-column prop="creditContractNumber" label="债权协议编号"  header-align="center" > </el-table-column>
              <el-table-column prop="userName" label="匹配用户" header-align="center"> </el-table-column>
              <el-table-column prop="productName" label="匹配产品" header-align="center" > </el-table-column>
              <el-table-column prop="" label="起息日期" header-align="center"> 
                <template slot-scope="scope">
                  {{scope.row.valueDateStart | dateString}}
                </template>
              </el-table-column>
              <el-table-column prop="" label="到期日期"  header-align="center"> 
                <template slot-scope="scope">
                  {{scope.row.valueDateEnd | dateString}}
                </template>
              </el-table-column>
              <el-table-column prop="" label="投资金额(元)"  width="120px" header-align="center" > 
                <template slot-scope="scope">
                  {{scope.row.investmentAmount | amount}}
                </template>
              </el-table-column>
          </el-table>
        </el-card>
    </div>
</template>


<script lang='ts'>
import { Vue, Component, Prop } from "vue-property-decorator";
import mtachSearch from "./serach-match.vue"; /* 搜索框 */

@Component({
  components: {
    mtachSearch
  }
})
export default class creditorMatch extends Vue {
  dataList: Array<any> = []; /* 这里必须声明为数组类型，使用any={} 渲染不出来 */
  created() {
    this.getList();
    console.log(this.dataList);
  }

  getList() {
    let id = this.$route.query.id;
    (this as any).$api.creditor.getMatchList(id).then((res: any) => {
      let list = res.data.data.list;
      this.dataList = list;
    });
  }

  mathDetailed() {
    let id = this.$route.query.id;
    this.$router.push({
      path: "matchDetailed",
      query: { id }
    });
  } /* 匹配详情 */
}
</script>

//样式
<style lang='scss'>
</style>
