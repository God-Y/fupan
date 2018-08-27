<template>
  <div>
    <div class="card">
      <div class="card-body">
        <el-form :model="statisticsForm"    label-width="110px" class="ruleForm" >
          <el-form-item label="日期" >
            <date
              :upperDate="statisticsForm.upperDate"
              :lowerDate="statisticsForm.lowerDate"
              @start-change="getStart"
              @end-change="getEnd"
            ></date>
          </el-form-item>
           <el-form-item class="btn-box ">
          <el-button type="danger" @click="resetForm">清空</el-button>
            <el-button type="primary" @click="search">搜索</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import Date from "common_Components/date/double-date.vue";
@Component({
  components: {
    Date
  }
})
export default class StatisticsSearch extends Vue {
  @Prop([Object])
  searchParams!: any; //定义搜索数据
  //关于表单搜索的数据，必须注意的是，组件
  statisticsForm: any = this.searchParams;
  //从子级取到开始时间值
  getStart(value: number) {
    this.statisticsForm.lowerDate = value;
  }
  //从子级取到开始时间值
  getEnd(value: number) {
    this.statisticsForm.upperDate = value;
  }
  get ID() {
    return this.$route.params.id;
  }
  get pages() {
    return this.$route.params.pages;
  }
  //重置清空表单
  resetForm() {
    let oldPages = this.$route.params.pages;
    //跳转路由
    this.$router.push({
      path: `/back/production-statistics/${this.ID}/1`,
      query: {}
    });
    this.$emit("clear", oldPages);
  }
  //搜索按钮的实现
  search(): void {
    this.$router.push({
      path: `/back/production-statistics/${this.ID}/${this.pages}`,
      query: this.statisticsForm
    });
    this.$emit("searchList");
  }
}
</script>

<style lang="scss" scoped>
.ruleForm {
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
  justify-content: space-between;
  @media (min-width: 1520px) {
    width: 1200px;
  }
  .form-item {
    width: 280px;
  }
  .btn-box {
    display: flex;
    justify-content: flex-end;
    button {
      margin-left: 30px;
    }
  }
}
</style>
