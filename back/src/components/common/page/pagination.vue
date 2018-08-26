<template>
<div class="page-box">
  <el-pagination
      @current-change="handleCurrentChange"
      background
      :current-page="ID"
      layout="total, prev, pager, next, jumper"
      :total="total" class="page">
  </el-pagination>
</div>
</template>

<script lang='ts'>
import { Vue, Component, Prop, Emit } from "vue-property-decorator";

@Component
export default class Pagination extends Vue {
  @Prop([String, Number])
  totalNum!: string | number; //定义父级需要传总条目数
  //定义总条目数
  get total() {
    return this.totalNum;
  }
  //路由参数，用于改变当前页码
  get ID() {
    return Number(this.$route.params.pages);
  }
  //对计算属性设置set 方法
  set total(newValue: any) {}
  //组件向去父级传参
  @Emit() //开始时间向父级传页面值,用于发送http请求
  pageChange(page: number) {}
  //开始change事件传参
  handleCurrentChange(val: number) {
    this.pageChange(val);
  }
}
</script>
//样式
<style lang='scss' scoped>
.page-box {
  display: flex;
  justify-content: flex-end;
  padding-right: 30px;
  padding: 15px 30px 5px;
}
</style>
