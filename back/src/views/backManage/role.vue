<template>
  <div>
    <tables :table-params = "roleData" 
    :loading="listLoading" :total = "total"
    ></tables>    
  </div>
</template>


<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import Tables from "@/components/backManage/role/Roletable.vue";
@Component({
  components: {
    Tables
  }
})
export default class BackRole extends Vue {
  //发送http请求，获取数据。
  roleData: Array<object> = [];
  get pages() {
    //计算属性获取值
    return this.$route.params.pages;
  }
  total: number = 0; //这个总条数
  //可以表格加载动画
  listLoading: boolean = true;
  //关于表单搜索的数据，只有两个参数.先设置一个空对象
  @Watch("pages") //路由参数发生变化的时候重新请求
  onIdChanged(val: any, oldVal: any) {
    this.getList();
  }
  created() {
    this.getList(); //请求数据
  }
  //定义一个请求数据的方法
  getList() {
    (this as any).$api.backRoles
      .getRole(this.pages)
      .then((response: any) => {
        let data = response.data;
        if (data.code) {
          this.total = data.data.total;
          this.roleData = data.data.list;
        }
      })
      .then(() => {
        //获取后加载动画取消
        this.listLoading = false;
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
