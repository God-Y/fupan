<template>
  <div>
    <pay-search :search-params = "userForm"></pay-search>
    <pay-table :table-params = "payData" :loading="listLoading"></pay-table>    
  </div>
</template>


<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import Date from "common_Components/date/double-date.vue";
import PaySearch from "../../components/user/pay-search.vue";
import PayTable from "../../components/user/pay-table.vue";
@Component({
  components: {
    Date,
    PaySearch,
    PayTable
  }
})
export default class DealRecode extends Vue {
  //发送http请求，获取数据。
  payData: Array<object> = [];
  ID: string = "";
  created() {
    this.ID = this.$route.params.id; //赋值路由参数id
    let query: any = this.$route.query; //获取查询参数
    let keys = Object.keys(query);
    if (keys.length) {
      //应对第一次刷新，不需要赋值
      query.valueStartlowerDate = query.valueStartlowerDate
        ? Number(query.valueStartlowerDate)
        : ""; //保证拿出的毫秒数是number类型
      query.valueStartlowerDate = query.valueStartupperDate
        ? Number(query.valueStartupperDate)
        : ""; //保证拿出的毫秒数是number类型
      query.valueEndlowerDate = query.valueEndlowerDate
        ? Number(query.valueEndlowerDate)
        : ""; //保证拿出的毫秒数是number类型
      query.valueEndupperDate = query.valueEndupperDate
        ? Number(query.valueEndupperDate)
        : ""; //保证拿出的毫秒数是number类型
      keys.forEach(value => {
        //foreach循环
        this.userForm[value] = query[value]; //赋值给查询对象
      });
    }
    this.getList(); //请求数据
  }

  //定义一个请求数据的方法
  getList() {
    (this as any).$api.user
      .getPay(this.$route.params.id, this.userForm)
      .then((response: any) => {
        let data = response.data;
        if (data.code) this.payData = data.data.list;
      })
      .then(() => {
        //获取后加载动画取消
        this.listLoading = false;
      });
  }
  //可以表格加载动画
  listLoading: boolean = true;
  //关于表单搜索的数据，必须注意的是，组件
  //只接受string | number | Date格式
  userForm: any = {
    valueStartlowerDate: "", //起息时间下限
    valueStartupperDate: "", //起息时间上限
    valueEndlowerDate: "",
    valueEndupperDate: ""
  };
  //从子级取到开始时间值
  getStart(value: any) {
    this.userForm.lowerDate = value;
  }
  //从子级取到开始时间值
  getEnd(value: any) {
    this.userForm.upperDate = value;
  }
  //重置清空表单
  resetForm() {
    (this as any).userForm = {
      upperDate: "",
      lowerDate: ""
    };
    this.$router.push(`/back/user-deal/${this.ID}`);
    this.getList();
  }
  //搜索按钮的实现
  search(): void {
    this.$router.push({
      path: `/back/user-deal/${this.ID}`,
      query: this.userForm
    });
    this.getList();
  }
}
</script>

<style lang="scss" scoped>
.ruleForm {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  @media (min-width: 1520px) {
    width: 1200px;
  }
  .btn-box {
    flex-basis: 398px;
    display: flex;
    justify-content: flex-end;
    button {
      margin-left: 30px;
    }
  }
}
.card-header {
  text-align: left;
}
.status20 {
  color: #f56c6c;
}
.status10 {
  color: #67c23a;
}
.status30 {
  color: #409eff;
}
</style>
