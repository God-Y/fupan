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
        v-loading="loading"
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
      <pages :total-num="total"  @page-change="toPage" v-if="realList.length"></pages>    
      <div class="nullMsg" v-if="!realList.length">无有效信息</div>
    </div>
    <check-log :visible='checkVisible' @confirm-status="confirmStatus"
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

  id: number = 1; //用于确定用户的id
  idAuthentication: number = 10; //确定用户的实名状态
  get realList() {
    return this.tableParams;
  }
  opationCheck(status: number) {
    if (status == 30 || status == 50) {
      return false;
    } else {
      return true;
    }
  }
  userName: string = ""; //用户名
  checkVisible: boolean = false; //是否弹出对话框
  created() {
    // this.id = this.realList[0]
  }
  //跳转页面
  toPage(val: number) {
    this.$router.push(`/back/verifiel/${val}`);
  }
  //改变状态会弹窗
  cancelName(id: number, status: number) {
    //要传的参数
    let params = {
      idAuthentication: status,
      refusal: ""
    };
    let alertMsg = `<div>
        <p>取消实名将删除用户身份信息</p>
        <h3> 确认取消？</h3></div>`;
    this.$confirm(alertMsg, "操作提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
      dangerouslyUseHTMLString: true,
      center: true
    })
      //点击确定按钮
      .then(() => {
        (this as any).$api.real.modifyRealName(id, params).then((res: any) => {
          this.$message({
            type: "success",
            message: "取消成功"
          });
          //取消成功后调用父级方法，更新列表.
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
  //审核状态，分未认证和再申请
  //把请求的iD传进去
  checkUser(id: number) {
    this.checkVisible = true;
    this.id = id;
  }
  modifyStatus(status: number, id: number) {
    this.idAuthentication = status;
    if (status == 20) {
      this.cancelName(id, status);
    } else {
      this.checkUser(id);
    }
  }
  //从子级接受事件，发送请求，修改参数
  confirmStatus(checkParams: any) {
    let params = {
      idAuthentication: this.idAuthentication,
      refusal: checkParams.reason
    };
    (this as any).$api.real.modifyRealName(this.id, params).then(() => {
      this.checkVisible = false;
      (this as any).$parent.getList();
    });
    console.log(checkParams.reason);
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
