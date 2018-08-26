<template>
  <div class="card">
    <div class="card-header account-header"  >
      用户列表
      <el-button 
          @click="add" 
          type="success"
          size="small"
          >
          新增
      </el-button>
    </div>
    <div class="card-body">
      <!-- 表格渲染开始 -->
      <el-table
        :data="roleList"
        border
        style="width: 100%"
        v-loading="loading"
        v-if="roleList.length"
        
        >
        <el-table-column
          label="ID"
          width="80"
          align="center"
          prop="id" 
        >
        </el-table-column>
        <el-table-column
          label="登陆名"
          width="100"  align="center" prop="name">
        </el-table-column>
        <el-table-column
          label="角色"
          width="100"  align="center" prop="role">
        </el-table-column>
        <el-table-column
          prop="founder"    width="140"
          label="创建人"  align="center" >
        </el-table-column>
        <el-table-column
          label="创建时间"  align="center" >
            <template slot-scope="scope" >
            {{scope.row.gmtCreate|timeSecond}}
          </template>
        </el-table-column>
        <el-table-column
            width="80"
          label="更新人"  align="center" > 
          <template slot-scope="scope" >
            {{scope.row.modifier}}
          </template>
        </el-table-column>
        <el-table-column
          label="修改时间"  align="center" >
            <template slot-scope="scope" >
            {{scope.row.gmtUpdate|timeSecond}}
           </template>
        </el-table-column>
          <el-table-column
            label="操作"
            width="160"  align="center" >
            <template slot-scope="scope">
              <el-button 
              @click="edit(scope.row)" 
              type="primary"
              size="mini"
              >
              编辑
              </el-button>
              <el-button type="danger" size="mini" @click="deleteUser(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
      </el-table>
      <pages :total-num="total"  @page-change="toPage" v-if="roleList.length"></pages>    
      <div class="nullMsg" v-if="!roleList.length && !loading">无有效信息</div>
    </div>
  </div>
</template>


<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import Pages from "common_Components/page/pagination.vue";

@Component({
  components: {
    Pages
  }
})
export default class BackAcconutTable extends Vue {
  @Prop([Array])
  tableParams!: any;
  @Prop([Boolean])
  loading!: boolean;
  @Prop([Number])
  total!: number;
  //获取角色
  get roleList() {
    return this.tableParams;
  }
  //根据页码跳转路由
  toPage(val: number) {
    this.$router.push(`/back/back-account/${val}`);
  }
  //删除用户会传参
  deleteUser(id: number) {
    this.$confirm("你确定删除该用户账号吗？", "操作提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
      center: true
    })
      //冻结 ，解冻的操作写在这里
      .then(() => {
        (this as any).$api.backAccount.delete(id).then((res: any) => {
          this.$message({
            type: "success",
            message: "删除成功"
          });
          (this as any).$parent.getList();
        });
      })
      .catch(() => {
        this.$message({
          type: "info",
          message: "取消操作"
        });
      });
  }
  edit(value: any) {}
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
  display: flex;
  justify-content: space-between;
  align-items: center;
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
