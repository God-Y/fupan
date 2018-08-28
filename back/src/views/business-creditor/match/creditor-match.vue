<template>
    <div>
       <mtachSearch></mtachSearch>
        <el-card class="box-card">
          <div slot="header" class="title">
            <span>
              {{matchDetailed.claimCode}}的债权匹配
              （出借时间： {{matchDetailed.lendingDate | dateString}}~{{matchDetailed.expirationDate | dateString}},出借金额：
              <span v-if="matchDetailed.lendingAmount !== 0">
                {{matchDetailed.lendingAmount | amount}}
              </span>
              ,剩余待匹配金额：
              <span v-if="matchDetailed.lendingAmount !== 0">
                {{matchDetailed.unMatchAmount | amount}}
              </span> 
              )
            </span>
            <el-button @click="jumpMatchDetailed" :disabled=visible type="primary">匹配</el-button>
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
  matchDetailed: any = {};
  visible: any = false;
  created() {
    this.getList();
    this.getMatch();
  }

  getList() {
    let id = this.$route.query.id;
    (this as any).$api.creditor.getMatchList(id).then((res: any) => {
      let list = res.data.data.list;
      this.dataList = list;
      console.log(this.dataList);
    });
  } /* 获取匹配列表 */
  getMatch() {
    let id = this.$route.query.id;
    (this as any).$api.creditor.getMatchDetailed(id).then((res: any) => {
      this.matchDetailed = res.data.data;
      console.log(this.matchDetailed);
      if (this.matchDetailed.unMatchAmount === 0) {
        /*如果待匹配金额为0，禁用匹配按钮 */
        this.visible = true;
      }
    });
  } /* 获取匹配详情 */
  jumpMatchDetailed() {
    let id = this.$route.query.id;
    this.$router.push({
      path: "matchDetailed",
      query: { id }
    });
  } /* 匹配按钮 跳转至匹配详情 */
}
</script>

//样式
<style lang='scss'>
.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
} /* 标题样式 */
</style>
