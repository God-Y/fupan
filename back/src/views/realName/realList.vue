<template>
  <div>
    <check-search :search-params = "userForm" @searchList ="search"
      @clearParams = "clear"
    ></check-search>
    <check-table :table-params = "list" 
    :loading="listLoading" :total = "total"
    ></check-table>
  </div>
</template>


<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import CheckSearch from "../../components/realName/list/checkForm.vue";
import CheckTable from "../../components/realName/list/checkTable.vue";
@Component({
  components: {
    CheckSearch,
    CheckTable
  }
})
export default class RealList extends Vue {
  //发送http请求，获取数据。
  list: Array<object> = [];
  get ID() {
    //计算属性获取值
    return this.$route.params.id;
  }
  total: number = 0; //这个总条数
  //可以表格加载动画
  listLoading: boolean = true;
  //关于表单搜索的数据，必须注意的是，组件
  //只接受string | number | Date格式
  userForm: any = {
    upperDate: "",
    lowerDate: ""
  };

  // @Watch("ID") //路由参数发生变化的时候重新请求
  // onIdChanged(val: any, oldVal: any) {
  //   this.getList();
  // }
  created() {
    let query: any = this.$route.query; //获取查询参数
    let keys = Object.keys(query);
    if (keys.length) {
      //应对第一次刷新，不需要赋值
      query.lowerDate = query.lowerDate ? Number(query.lowerDate) : ""; //保证拿出的毫秒数是number类型
      query.upperDate = query.upperDate ? Number(query.upperDate) : ""; //保证拿出的毫秒数是number类型
      keys.forEach(value => {
        //foreach循环
        this.userForm[value] = query[value]; //赋值给查询对象
      });
    }
    this.getList(this.userForm); //请求数据
  }

  //定义一个请求数据的方法
  getList(data: any, id: any = 1) {
    (this as any).$api.real
      .getList(data, id)
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
  //实现搜索功能
  search() {
    let id = this.$route.params.pages;
    console.log(this.$route);
    this.getList(this.userForm, id);
  }
  //实现清空参数功能
  clear() {
    // this.getList();
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
