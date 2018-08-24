<template>
    <div>
        <el-card class="box-card">
          <div slot="header" class="card-box">
            <span>变更</span>
          </div>
          <el-card class="box-card">
            <div slot="header" class="card-box">
              <span class="single-line">|</span>
              <span>LTZ1债权信息</span>
            </div>
            <div class="title">
              <span>出借日期</span>
              <span>到期日期</span>
              <span>出借金额</span>
              <span>待匹金额</span>
            </div>
          </el-card>

        </el-card>
    </div>
</template>

<script lang='ts'>
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class matchDetailed extends Vue {
  id = this.$route.query.id; /* 从路由中获取id号 */
  created() {
    // this.getDetailedData();
    console.log(this.$router);
    console.log(this.$route);
  }
  getDetailedData() {
    (this as any).$api.creditor.getMatchDetailed(this.id).then((res: any) => {
      console.log(res);
    });
  } /* 获取匹配详情数据 */
  getCommend() {
    (this as any).$api.creditor.getCommend(this.id).then((res: any) => {
      console.log(res);
    });
  } /* 获取匹配的接口 */
}
</script>

//样式
<style lang='scss'>
.card-box {
  text-align: left;
} /* 卡片格式 */
.single-line {
  font-weight: 1000;
  color: red;
  margin-right: 20px;
} /* 竖线 */
.title {
  display: flex;
  & > span {
    flex-basis: 25%;
    text-align: center;
  }
}
</style>
