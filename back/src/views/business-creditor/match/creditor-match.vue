<template>
    <div>
       <mtachSearch
      @send-search="sendSearch"
       @send-clear="sendClear"
       ></mtachSearch>
        <el-card class="box-card">
          <div slot="header" class="title">
            <span>
              {{matchDetailed.claimCode}}的债权匹配
              （出借时间： {{matchDetailed.lendingDate | time}}~{{matchDetailed.expirationDate | time}},出借金额：
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
                  {{scope.row.valueDateStart | time}}
                </template>
              </el-table-column>
              <el-table-column prop="" label="到期日期"  header-align="center"> 
                <template slot-scope="scope">
                  {{scope.row.valueDateEnd | time}}
                </template>
              </el-table-column>
              <el-table-column prop="" label="投资金额(元)"  width="120px" header-align="center" > 
                <template slot-scope="scope">
                  {{scope.row.investmentAmount | amount}}
                </template>
              </el-table-column>
          </el-table>
          <Pages :total-num="total" @page-change="toPage" v-if="total>10"></Pages>
        </el-card>
    </div>
</template>


<script lang='ts'>
import { Vue, Component, Prop } from "vue-property-decorator";
import mtachSearch from "./serach-match.vue"; /* 搜索框 */
import Pages from "common_Components/page/pagination.vue";

@Component({
  components: {
    mtachSearch,
    Pages
  }
})
export default class creditorMatch extends Vue {
  dataList: Array<any> = []; /* 这里必须声明为数组类型，使用any={} 渲染不出来 */
  matchDetailed: any = {};
  visible: any = false; //匹配按钮
  sendData: any = {}
  total: number = 0; //列表总数
  pagination: any = {};
  ID: any = "";
  created() {
    this.ID = this.$route.params.id;
    this.getList(this.sendData);
    this.getMatch();
  }

  getList(data: any) {
    let pages = this.$route.params.pages;
    console.log(pages, this.ID);
    // let id = this.$route.quyery.id;
    // console.log(pages, id);
    console.log(data);
    (this as any).$api.creditor.getMatchList(this.ID, data, pages).then((res: any) => {
      console.log(res);
      let list = res.data.data.list;
      this.dataList = list;
      this.total = res.data.data.total;
      console.log(this.dataList);
    });
  } /* 获取匹配列表 */
  toPage(val: any) {
    this.$router.push({
      path:`/back/creditorMatch/${this.ID}`,query: {
        pages:val
      }
    });
    this.getList(this.sendData);
  }
  sendSearch(val: any) {
      this.$router.push({
      path: `/back/creditorMatch/${this.ID}/1`,
      query: val
    });
    console.log(val);
    this.sendData = val;
    this.getList(this.sendData);
  } /* 搜索数据 */
  sendClear(val: any) {
    this.getList(this.sendData);
    this.$router.push({
      // path: `/back/creditorMatch`,
      path: `/back/creditorMatch/${this.ID}/1`,
      // query: { id: this.ID, pages: "1" }
    });
  } /* 清空搜索 */
  getMatch() {
    let id = this.$route.params.id;
    (this as any).$api.creditor.getMatchDetailed(id).then((res: any) => {
      console.log(res);
      this.matchDetailed = res.data.data;
      console.log(this.matchDetailed);
      if (this.matchDetailed.unMatchAmount === 0) {
        /*如果待匹配金额为0，禁用匹配按钮 */
        this.visible = true;
      }
    });
  } /* 获取匹配详情 */
  jumpMatchDetailed() {
    let id = this.$route.params.id;
    this.$router.push({
      path: "/back/matchDetailed",
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
