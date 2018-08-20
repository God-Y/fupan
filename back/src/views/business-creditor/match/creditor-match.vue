<template>
    <div>
       <mtachSearch></mtachSearch>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>匹配</span>
            <el-button @click="mathDetailed" style="float: right; padding: 3px 0" type="text">匹配</el-button>
          </div>
          <el-table :data="dataList" border class="table-style" style="width: 100%;" >
              <el-table-column prop="claimCode" label="出借合同编号" header-align="center"> </el-table-column>
              <el-table-column prop="creditorName" label="债权协议编号"  header-align="center" > </el-table-column>
              <el-table-column prop="creditorPhone" label="匹配用户" header-align="center"> </el-table-column>
              <el-table-column prop="creditorIdNumber" label="匹配产品" header-align="center" > </el-table-column>
              <el-table-column prop="lendingPeriod" label="起息日期" header-align="center"> </el-table-column>
              <el-table-column label="到期日期"  header-align="center"> 
                <template slot-scope="scope">{{scope.row.lendingDate | dateString}}</template>
              </el-table-column>
              <el-table-column label="投资金额(元)"  width="120px" header-align="center" > 
                <template slot-scope="scope">
                  {{scope.row.matchAmount | amount}}
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
  mathDetailed() {
    this.$router.push({
      path: "matchDetailed"
    });
  }
}
</script>

//样式
<style lang='scss'>
</style>
