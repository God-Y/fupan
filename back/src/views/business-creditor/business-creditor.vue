<template>
     <div>
       <creditorSearchList
       @send-search="sendSearch"
       @send-clear="sendClear"
       ></creditorSearchList>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>债权列表</span>
          <el-button @click="add" style="float: right; padding: 3px 0" type="text">+新增</el-button>
        </div>
          <el-table v-if="dataList" :data="dataList" border class="table-style" style="width: 100%;" >
              <el-table-column prop="claimCode" label="债权代号" width="100px" header-align="center"> </el-table-column>
              <el-table-column prop="creditorName" label="债权人"  width="100px" header-align="center" > </el-table-column>
              <el-table-column prop="creditorPhone" label="债权人手机" width="120px" header-align="center"> </el-table-column>
              <el-table-column prop="creditorIdNumber" label="债权人身份证" header-align="center" > </el-table-column>
              <el-table-column prop="lendingPeriod" label="出借期限(月)"  width="60px" header-align="center"> </el-table-column>
              <el-table-column label="出借日期" width="110px"  header-align="center"> 
                 <template slot-scope="scope">{{scope.row.lendingDate | time}}</template>
              </el-table-column>
              <el-table-column label="到期日期" width="110px" header-align="center" > 
                 <template slot-scope="scope">{{scope.row.expirationDate | time}}</template>
              </el-table-column>
              <el-table-column label="出借金额(元)"  width="120px" header-align="center" > 
                <template slot-scope="scope">
                  {{scope.row.lendingAmount | amount}}
                </template>
              </el-table-column>
              <el-table-column label="状态" width="80px" header-align="center" > 
                 <template slot-scope="scope">
                    <span :class="{success: scope.row.status === 1}">{{scope.row.status | creditorStatu}}</span>
                  </template>
              </el-table-column>
              <el-table-column prop="claimCode" label="操作" header-align="center"> 
                <template slot-scope="scope">
                  <div class="operate">
                    <div @click="matchRate(scope.row.id)" :class="changeRateCloor(scope.row.matchRate,scope.row.status)">
                      <span>{{scope.row.matchRate|matchRate}}</span>
                      <span>{{scope.row.matchRate|annualized}}</span>
                    </div>
                    <div @click="edit(scope.row.id)" class="check">查看</div>
                  </div>
                </template>
              </el-table-column>
          </el-table>
          <Pages :total-num="total" @page-change="toPage" v-if="total>10"></Pages>
      </el-card>
    </div>
</template>

<script lang='ts'>
import { Vue, Component, Prop } from "vue-property-decorator";
import creditorSearchList from "./search-list.vue";
import Pages from "common_Components/page/pagination.vue";

@Component({
  components: {
    creditorSearchList,
    Pages
  }
})
export default class BusinessCreditor extends Vue {
  dataList: Array<any> = []; /* 这里必须声明为数组类型，使用any={} 渲染不出来 */
  total: number = 0;
  pagination: any = {};

  created() {
    this.getList(""); /* 初始值不需要加参数，所以只是传的空字符串 */
  }
  // activated() {
  //   console.log("activa");
  //   this.getList(""); /* 初始值不需要加参数，所以只是传的空字符串 */    
  // }
  getList(data: any) {
     if (this.$route.query.pages) {
      this.pagination.pageNum = this.$route.query.pages;
    } else {
      this.pagination.pageNum = 1;
    }
    this.pagination.pageSize = 10;
    console.log(this.pagination);
    (this as any).$api.creditor.getCreditor(data).then((res: any) => {
      console.log(res);
      let list = res.data.data.list;
      this.dataList = list;
      this.total = res.data.data.total;
      console.log(this.dataList);
    });
  } /* 获取列表数据 */
  toPage(val: any) {
    this.$router.push({
      path:`/back/creditor`,query: {
        pages:val
      }
    });
    this.getList(this.pagination);
  }
  sendSearch(val: any) {
    console.log(val);
    this.getList(val);
  } /* 搜索数据 */
  sendClear(val: any) {
    this.getList(val);
  } /* 清空搜索 */
  add() {
    this.$router.push({
      path: "addCreditor",
      query: { statu: "add" }
    });
  } /* 跳转至新增页面 */
  edit(val: any) {
    console.log(val);
    this.$router.push({
      path: "addCreditor",
      query: { id: val }
    });
  } /* 跳转至编辑页面 */
  matchRate(val: any) {
    this.$router.push({
      path: "creditorMatch",
      query: { id: val }
    });
  } /* 跳转至匹配详情 */
  changeRateCloor(rate: any, statu: any) {
    if (statu === 0 || statu === 2) {
      return "info";
    } else if (rate === 1) {
      return "success";
    } else if (statu === 1 && rate === 0) {
      return "blue";
    } else {
      return "warning";
    }
  } /* 判断匹配状态的颜色 */
}
</script>

//样式
<style lang='scss' scoped>
.clearfix {
  display: flex;
  justify-content: space-between;
}
.addTitle {
  @include flex-vertical-between;
  @include list-style();
  border-bottom: 1px solid $border-color;
  font-size: 14px;
  & > span:nth-child(2) {
    color: $blue;
    cursor: pointer;
  }
} /* 新增title */
.success {
  color: $success;
}
.warning {
  color: $warning;
}
.info {
  color: $Info;
}
.blue {
  color: $blue;
}
.operate {
  display: flex;
  justify-content: space-around;
  align-items: center;
  & > div:nth-child(1) {
    cursor: pointer;
    span {
      display: inline-block;
      width: 100%;
    }
  }
} /* 操作 */
.check {
  color: $blue;
  cursor: pointer;
} /* 查看 */
</style>
