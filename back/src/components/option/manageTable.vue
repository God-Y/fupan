<template>
  <div class="card">
    <div class="card-header">
      意见管理
    </div>
    <div class="card-body">
      <!-- 表格渲染开始 -->
      <el-table
        :data="optionList"
        border
        style="width: 100%"
        v-loading="loading"
        v-if="optionList.length"
        >
        <el-table-column
          label="序号"
          prop="id"
          align="center"
          width="80"
        >
        </el-table-column>
        <el-table-column
          prop="phone"   
          label="手机号"  align="center" >
        </el-table-column>
        <el-table-column
          label="提交时间"
            align="center" >
          <template slot-scope="scope" >
            {{scope.row.gmtCreate|time}}
          </template>
        </el-table-column>
        <el-table-column label="邮箱" width="260px" align="center"  prop="email" > 
        </el-table-column>
        <el-table-column label="真实姓名"  align="center"  prop="name" >
        </el-table-column>
        <el-table-column
          label="操作"
          width="160"  align="center" >
          <template slot-scope="scope">
            <el-button 
            @click="check(scope.row.id)" 
            type="primary"
            size="mini"
            >
            查看
            </el-button>
            <el-button type="danger" size="mini" @click="deletes(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pages :total-num="total"  @page-change="toPage" v-if="optionList.length && total>10"></pages>    
      <div class="nullMsg" v-if="!optionList.length">无有效信息</div>
    </div>
  </div>
</template>


<script lang="ts">
import { Vue, Component, Prop, Emit } from "vue-property-decorator";
import Pages from "common_Components/page/pagination.vue";
@Component({
  components: {
    Pages
  }
})
export default class OptionTable extends Vue {
  @Prop([Array])
  tableParams!: any; // 表单数据
  @Prop([Boolean])
  loading!: boolean; //是否加载表单
  @Prop([Number])
  total!: number; //条目总数，用于渲染分页
  //这里取消实名
  @Emit()
  deleteOption() {}

  uid: number = 1; //用于确定用户的uid
  //获取父级的表单数据
  get optionList() {
    return this.tableParams;
  }
  //跳转页面,跳转路由，父级监控pages的变化，获取数据
  toPage(pages: number) {
    this.$router.push(`/back/option-management/${pages}`);
  }
  //取消实名会弹窗
  deletes(id: number) {
    let alertMsg = `<div>
        <p>删除将在本地删除此条记录</p>
        <h3> 确定？</h3></div>`;
    this.$confirm(alertMsg, "操作提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
      dangerouslyUseHTMLString: true, //设置html标签这个值为true
      center: true
    })
      //点击确定按钮
      .then(() => {
        (this as any).$api.option.delete(id).then((res: any) => {
          this.$message({
            type: "success",
            message: "删除成功"
          });
          //取消成功后调用父级方法，更新列表.
          this.deleteOption();
        });
      })
      .catch(() => {
        this.$message({
          type: "info",
          message: "取消操作"
        });
      });
  }
  //查看页面 跳转页面
  check(id: number) {
    this.$router.push(`/back/option-check/${id}`);
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
.status10,
.status30,
.modify20 {
  color: #f56c6c;
}
.status20 {
  color: #67c23a;
}
// .modify10,
.status40 {
  color: #0000ff;
}
.modify40 {
  color: #ffa500;
}
.modify30,
.modify50 {
  color: #808080;
}
</style>
