<template>
  <div class="card">
    <div class="card-header">
      实名列表
    </div>
    <div class="card-body">
      <!-- 表格渲染开始 -->
      <el-table
        :data="realList"
        border
        style="width: 100%"
        v-loading = "loading"
        v-if="realList.length"
        >
        <el-table-column
          label="用户编号"
          prop="userNumber"
          align="center"
          width="130"
        >
        </el-table-column>
        <el-table-column
          label="申请时间"
          width="100"  align="center" >
          <template slot-scope="scope" >
            {{scope.row.applicationTime|time}}
          </template>
        </el-table-column>
     
        <el-table-column
          prop="phone"    width="120"
          label="手机号"  align="center" >
        </el-table-column>
        <el-table-column
          width="80"
          label="真实姓名"  align="center" > 
          <template slot-scope="scope" >
            {{scope.row.idName?scope.row.idName: "--"}}
          </template>
        </el-table-column>
        <el-table-column
          label="身份证号"  align="center" > 
          <template slot-scope="scope" >
            {{scope.row.idNumber?scope.row.idNumber:"--"}}
          </template>
        </el-table-column>
        <el-table-column
          label="实名状态" width="140" align="center" >
          <template slot-scope="scope" >
            <span :class="'status'+scope.row.idAuthentication">
            {{scope.row.idAuthentication|realState}}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          label="拒绝理由"  align="center" >
            <template slot-scope="scope" >
            {{scope.row.refusal?scope.row.refusal:'---'}}
          </template>
        </el-table-column>
        <el-table-column
            label="操作"
            width="140"  align="center" >
            <template slot-scope="scope">
              <el-button 
              @click="modifyStatus(scope.row.idAuthentication,scope.row.id)" 
              type="text" 
              size="small"
              :class="'modify'+scope.row.idAuthentication"
              :disabled="!opationCheck(scope.row.idAuthentication)"
              >
                {{scope.row.idAuthentication|realModifyState}}
              </el-button>
              <el-button type="text" size="small" @click="getUserMsg(scope.row.id)">查看</el-button>
            </template>
          </el-table-column>
      </el-table>
      <pages :total-num="total"  @page-change="toPage" v-if="realList.length && total > 10"></pages>    
      <div class="nullMsg" v-if="!realList.length && !loading">无有效信息</div>
    </div>
    <check-log :visible='checkVisible' :userId ="uid"
    ></check-log>
  </div>
</template>


<script lang="ts">
import { Vue, Component, Prop, Emit } from "vue-property-decorator";
import Pages from "common_Components/page/pagination.vue";
import checkLog from "../checkStatus.vue";
@Component({
  components: {
    Pages,
    checkLog
  }
})
export default class RealTable extends Vue {
  @Prop([Array])
  tableParams!: any; // 表单数据
  @Prop([Boolean])
  loading!: boolean; //是否加载表单
  @Prop([Number])
  total!: number; //条目总数，用于渲染分页
  //这里取消实名
  @Emit("cancel")
  cancelRealName() {
    console.log(2);
  }

  uid: number = 1; //用于确定用户的uid
  checkVisible: boolean = false; //是否弹出对话框
  //获取父级的表单数据
  get realList() {
    return this.tableParams;
  }

  //当实名状态为拒绝或者取消时，设置按钮的disabled
  opationCheck(status: number) {
    if (status == 30 || status == 50) {
      return false;
    } else {
      return true;
    }
  }

  //跳转页面,跳转路由，父级监控pages的变化，获取数据
  toPage(pages: number) {
    this.$router.push(`/back/verifiel/${pages}`);
  }

  //取消实名会弹窗
  cancelName(uid: number) {
    let alertMsg = `<div>
        <p>取消实名将删除用户身份信息</p>
        <h3> 确认取消？</h3></div>`;
    this.$confirm(alertMsg, "操作提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
      dangerouslyUseHTMLString: true, //设置html标签这个值为true
      center: true
    })
      //点击确定按钮
      .then(() => {
        (this as any).$api.real.verificationCancel(uid).then((res: any) => {
          this.$message({
            type: "success",
            message: "取消成功"
          });
          //取消成功后调用父级方法，更新列表.
          this.cancelRealName();
        });
      })
      .catch(() => {
        this.$message({
          type: "info",
          message: "取消操作"
        });
      });
  }
  //审核状态，分未认证和再申请
  //把请求的iD传进去
  checkUser(id: number) {
    this.checkVisible = true;
    this.uid = id;
  }
  modifyStatus(status: number, id: number) {
    if (status == 20) {
      this.cancelName(id);
    } else {
      this.checkUser(id);
    }
  }
  //查看页面 跳转页面
  getUserMsg(id: number) {
    this.$router.push(`/back/check-verifiel/${id}`);
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
