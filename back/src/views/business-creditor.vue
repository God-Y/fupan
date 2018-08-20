<template>
     <div>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>卡片名称</span>
        </div>
          <el-table :data="dataList" border style="width: 100%" >
              <el-table-column prop="claimCode" label="债权代号"> </el-table-column>
              <el-table-column prop="creditorName" label="债权人"   > </el-table-column>
              <el-table-column prop="creditorPhone" label="债权人手机" > </el-table-column>
              <el-table-column prop="creditorIdNumber" label="债权人身份证"   > </el-table-column>
              <el-table-column prop="lendingPeriod" label="出借期限(月)"   > </el-table-column>
              <el-table-column label="出借日期"   > 
                 <template slot-scope="scope">{{scope.row.lendingDate | dateString}}</template>
              </el-table-column>
              <el-table-column label="到期日期"   > 
                 <template slot-scope="scope">{{scope.row.expirationDate | dateString}}</template>
              </el-table-column>
              <el-table-column prop="matchAmount" label="出借金额(元)"   > </el-table-column>
              <el-table-column label="状态"   > 
                 <template slot-scope="scope">
                    <span :class="{success: scope.row.status === 1}">{{scope.row.status | creditorStatu}}</span>
                  </template>
              </el-table-column>
              <el-table-column prop="claimCode" label="操作"> 
                <template slot-scope="scope">
                  <div>
                    <span>{{scope.row.matchingRate|matchRate}}</span>
                    <span>{{scope.row.matchingRate|annualized}}</span>
                  </div>
                </template>
              </el-table-column>
          </el-table>
      </el-card>
    </div>
</template>


<script lang='ts'>
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class BusinessCreditor extends Vue {
  dataList: Array<any> = []; /* 这里必须声明为数组类型，使用any={} 渲染不出来 */
  created() {
    this.getList();
  }
  getList() {
    (this as any).$api.user.getCreditor("").then((res: any) => {
      this.dataList = res.data.data.list;
      console.log(this.dataList);
    });
  }
}
</script>

//样式
<style lang='scss' scoped>
@mixin border-style {
  border: 1px solid $border-color;
} /* 边框样式 */

.box {
  @include border-style();
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
.handle {
  @include flex-vertical-between;
  justify-content: space-around;
  a {
    cursor: pointer;
  }
  a:nth-child(2) {
    color: $blue;
  }
} /* 操作 */
.success {
  color: $success;
}
</style>
