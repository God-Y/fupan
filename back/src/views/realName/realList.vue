<template>
  <div>
    <check-search :search-params = "userForm" 
    ></check-search>
    <check-table :table-params = "list" 
    :loading="listLoading" :total = "total"
    @cancel="calcelReal"
    ref="checkTable"
    ></check-table>
  </div>
</template>


<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import CheckSearch from "../../components/realName/list/checkForm.vue";
import CheckTable from "../../components/realName/list/checkTable.vue";
import bus from "@/bus/bus";
@Component({
  components: {
    CheckSearch,
    CheckTable
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
  userForm: any = {
    upperDate: "",
    lowerDate: ""
  };

  @Watch("pages") //路由参数发生变化的时候重新请求
  onIdChanged(val: any, oldVal: any) {
    console.log(1);
    this.getList(this.userForm, this.$route.params.pages);
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
  //取消实名后获取数据
  calcelReal() {
    console.log(1);
    this.getList(this.userForm, this.pages);
  }
  //使用中央数据总线来确定审核
  mounted() {
    bus.$on("comfirmStatus", (data: any) => {
      let params: any = {}; //创建一个对象用于传递参数
      let Id = data.id;
      if (data.status == "通过") {
        params.code = 1;
        params.refusal = "";
      } else {
        params.code = 0;
        params.refusal = data.reason;
      }
      (this as any).$api.real.checkRealName(Id, params).then(() => {
        (this as any).$refs.checkTable.checkVisible = false;
        this.$message({
          showClose: true,
          message: "操作成功",
          type: "success"
        });
        this.getList(this.userForm, this.pages);
      });
    });
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
