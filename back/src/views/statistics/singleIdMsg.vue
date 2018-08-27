<template>
  <div>
    <search :search-params = "statisticsForm" @searchList ="search"
      @clear = "clear"
    ></search>
    <tables :table-params = "roleData" production-name= "productName"
    :loading="listLoading" :total = "total"
    ></tables>    
  </div>
</template>


<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import Search from "@/components/statistics/detailSearch.vue";
import Tables from "@/components/statistics/detailTable.vue";
@Component({
  components: {
    Search,
    Tables
  }
})
export default class ProductionStatistics extends Vue {
  //发送http请求，获取数据。
  roleData: Array<object> = [];
  get pages() {
    //计算属性获取值
    return this.$route.params.pages;
  }
  get ID() {
    //计算属性获取值
    return this.$route.params.id;
  }
  total: number = 0; //这个总条数
  //可以表格加载动画
  listLoading: boolean = true;
  //获取产品的名称
  productName: string = "";
  //关于表单搜索的数据，只有两个参数.先设置一个空对象
  statisticsForm: any = {
    lowerDate: "",
    upperDate: ""
  };
  @Watch("pages") //路由参数发生变化的时候重新请求
  onIdChanged(val: any, oldVal: any) {
    this.getList();
  }
  created() {
    let query: any = this.$route.query; //获取查询参数
    let keys = Object.keys(query);
    if (keys.length) {
      //应对第一次刷新，不需要赋值
      keys.forEach(value => {
        //foreach循环
        this.statisticsForm[value] = query[value]; //赋值给查询对象
      });
    }
    this.getList(); //请求数据
  }
  //定义一个请求数据的方法
  getList() {
    (this as any).$api.statistics
      .getProduction(this.statisticsForm, this.ID, this.pages)
      .then((response: any) => {
        let data = response.data;
        if (data.code) {
          this.total = data.data.total;
          this.roleData = data.data.list;
          this.productName = data.data.productName;
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
  clear(oldPages: any) {
    for (let key in this.statisticsForm) {
      this.statisticsForm[key] = "";
    }
    //在第一页清空数据时，watch不会生效，需要添加一次请求数据
    if (oldPages == 1) {
      this.getList();
    }
  }
}
</script>

<style lang="scss" scoped>
.card-header {
  text-align: left;
}
</style>
