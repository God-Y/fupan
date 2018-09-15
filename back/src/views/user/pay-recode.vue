<template>
  <div>
    <pay-search :search-params = "userForm" @searchList ="search"
      @clearParams = "clear"
    ></pay-search>
    <pay-table :table-params = "payData" 
    :loading="listLoading" :total = "total" 
    ></pay-table>    
  </div>
</template>


<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import PaySearch from "../../components/user/pay-search.vue";
import PayTable from "../../components/user/pay-table.vue";
@Component({
  components: {
    PaySearch,
    PayTable
  }
})
export default class DealRecode extends Vue {
  //发送http请求，获取数据。
  payData: Array<object> = [];
  get ID() {
    //计算属性获取值
    return this.$route.params.id;
  }
  get pages() {
    return this.$route.params.pages;
  }
  total: number = 0; //这个总条数
  //可以表格加载动画
  listLoading: boolean = true;
  //关于表单搜索的数据，必须注意的是，组件
  //只接受string | number | Date格式
  userForm: any = {
    valueStartlowerDate: "",
    valueStartupperDate: "",
    valueEndlowerDate: "",
    valueEndupperDate: ""
  };
  @Watch("pages") //路由参数发生变化的时候重新请求
  onIdChanged(val: any, oldVal: any) {
    this.getList();
  }
  created() {
    let query: any = this.$route.query; //获取查询参数
    let keys = Object.keys(query);
    console.log(2);
    if (keys.length) {
      //应对第一次刷新，不需要赋值
      query.valueStartlowerDate = query.valueStartlowerDate
        ? Number(query.valueStartlowerDate)
        : ""; //保证拿出的毫秒数是number类型
      query.valueStartupperDate = query.valueStartupperDate
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
      .getPay(this.ID, this.userForm, this.pages)
      .then((response: any) => {
        let data = response.data;
        if (data.code) {
          this.total = data.data.total;
          this.payData = data.data.list;
        }
      })
      .then(() => {
        //获取后加载动画取消
        this.listLoading = false;
      });
  }
  //实现搜索功能
  search() {
    this.getList();
  }
  //实现清空参数功能
  clear(oldpage: string) {
    for (let key in this.userForm) {
      this.userForm[key] = null;
    }
    this.userForm.valueStartlowerDate = "";
    this.userForm.valueStartupperDate = "";
    this.userForm.valueEndlowerDate = "";
    this.userForm.valueEndupperDate = "";
    if (oldpage === "1") {
      this.getList();
    }
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
