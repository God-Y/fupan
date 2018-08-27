<template>
  <div>
    <option-search :search-params = "optionForm" 
    ></option-search>
    <option-table :table-params = "list" 
    :loading="listLoading" :total = "total"
    @deleteOption="deleteOption"
    ></option-table>
  </div>
</template>


<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import optionSearch from "../../components/option/manageSearch.vue";
import optionTable from "../../components/option/manageTable.vue";
import bus from "@/bus/bus";
@Component({
  components: {
    optionSearch,
    optionTable
  }
})
export default class RealList extends Vue {
  //发送http请求，获取数据。
  list: Array<object> = [];
  get pages() {
    //计算属性获取值
    return this.$route.params.pages;
  }
  total: number = 0; //这个总条数

  //可以表格加载动画
  listLoading: boolean = true;
  //关于表单搜索的数据，必须注意的是，组件
  //只接受string | number | Date格式
  optionForm: any = {
    upperGmtCreate: "",
    lowerGmtCreate: ""
  };

  @Watch("pages") //路由参数发生变化的时候重新请求
  onIdChanged(val: any, oldVal: any) {
    this.getList(this.optionForm, this.$route.params.pages);
  }

  created() {
    let query: any = this.$route.query; //获取查询参数
    let keys = Object.keys(query);
    if (keys.length) {
      //应对第一次刷新，不需要赋值
      query.lowerDate = query.lowerDate ? Number(query.lowerDate) : ""; //保证拿出的毫秒数是number类型
      query.upperDate = query.upperDate ? Number(query.upperDate) : ""; //保证拿出的毫秒数是number类型
      keys.forEach(value => {
        //foreach循环
        this.optionForm[value] = query[value]; //赋值给查询对象
      });
    }
    this.getList(this.optionForm); //请求数据
  }

  //定义一个请求数据的方法
  getList(data: any, pages: any = 1) {
    (this as any).$api.option
      .getList(data, pages)
      .then((response: any) => {
        let data = response.data;
        if (data.code) {
          this.total = data.data.total;
          this.list = data.data.list;
        }
      })
      .then(() => {
        //获取后加载动画取消
        this.listLoading = false;
      });
  }
  //删除意见后获取数据
  deleteOption() {
    this.getList(this.optionForm, this.pages);
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
</style>
