<template>
    <div>
        <el-card class="box-card">
          <div slot="header" class="card-box">
            <span>变更</span>
          </div>
          <el-card class="box-card">
            <div slot="header" class="card-box">
              <span class="single-line">|</span>
              <span>{{detailedData.claimCode}}债权信息</span>
            </div>
            <div class="title">
              <span>出借日期&#12288; {{detailedData.lendingDate | dateString}} </span>
              <span>到期日期&#12288; {{detailedData.expirationDate  | dateString}} </span>
              <span>出借金额&#12288; {{detailedData.lendingAmount | amount}}（元）</span>
              <span>待匹金额&#12288; {{detailedData.unMatchAmount | amount}}（元）</span>
            </div>
          </el-card>
          <div class="commend-style">
            <div class="commend-list">
              <span>推荐匹配</span>
              <el-button v-if="index<5" v-for="(item,index) of commendData" :key="item.id" @click="singleButton(item)" type="success" plain>{{item.lendingContractNumber}}</el-button>
              <el-button type="success" @click="dialogTableVisible = true" plain>全部投资>></el-button>
            </div>
            <el-dialog title="推荐匹配" :visible.sync="dialogTableVisible">
              <el-table :data="commendData"  border>
                <el-table-column label="投资合同编号" header-align="center">
                  <template slot-scope="scope">
                    <div @click="tableOption(scope.row)">
                      {{scope.row.lendingContractNumber}}
                    </div>
                  </template>
                </el-table-column>
                <el-table-column @click="tableOption()" label="投资金额" header-align="center">
                  <template slot-scope="scope">
                    <div @click="tableOption(scope.row)">
                      {{scope.row.investmentAmount | amount}}元
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </el-dialog>
            <div>
              <div class="line-style">
                <span>匹配投资</span>
                <el-select v-model="data.lendingContractNumber" filterable placeholder="请选择" size="mini">
                  <el-option
                    v-for="item in commendData"
                    :key="item.value"
                    :label="item.lendingContractNumber"
                    :value="item.lendingContractNumber">
                    <span style="float: left" @click="select(item)">{{ item.lendingContractNumber }}&#12288;</span>
                    <span style="float: right; color: #8492a6; font-size: 13px" @click="select(item)">{{ item.investmentAmount | amount }}元</span>
                  </el-option>
                </el-select>
              </div>
              <div class="line-style">
                <span>匹配产品</span>
                <el-input :disabled="true" v-model="data.productName" size="mini"></el-input>
                <span class="span-style">到期日期:&#12288;{{data.valueDateEnd | dateString}}</span>
              </div>
              <div class="line-style">
                <span>匹配用户</span>
                <el-input :disabled="true" v-model="data.userName" size="mini"></el-input>
                <span class="span-style">投资金额:&#12288;{{data.investmentAmount | amount}}</span>
              </div>
              <el-card class="frame">
                预计剩余待匹金额
                <span v-if="countAmount" style="color:#F56C6C">{{countAmount | amount}}（元）</span>
              </el-card>
               <div class="button-style">
                <el-button type="primary" @click="save">保存</el-button>
                <el-button type="danger" @click="previous">取消</el-button>
              </div>
            </div>
          </div>
        </el-card>
    </div>
</template>

<script lang='ts'>
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class matchDetailed extends Vue {
  commendData: Array<any> = [];
  detailedData: any = {};
  dialogTableVisible: any = false; /* 弹出表格布尔值 */
  data: any = {}; /* 选中的每项存到这个属性中 */
  sendData: any = {}; /* 最终发送的数据 */
  created() {
    let id = this.$route.query.id; /* 获取传进来的路由id */
    this.getDetailedData(id);
    this.getCommend(id);
  }
  getDetailedData(id: any) {
    (this as any).$api.creditor.getMatchDetailed(id).then((res: any) => {
      console.log(res);
      this.detailedData = res.data.data;
    });
  } /* 获取匹配详情数据 */
  getCommend(id: any) {
    (this as any).$api.creditor.getCommend(id).then((res: any) => {
      console.log(res);
      this.commendData = res.data.data;
    });
  } /* 获取匹配的接口 */
  singleButton(val: any) {
    console.log(val);
    this.data = val;
  } /* 推荐匹配选中的每一项 */
  tableOption(val: any) {
    this.dialogTableVisible = false; /* 隐藏弹窗 */
    console.log(val);
    this.data = val;
  } /* 推荐匹配中的全部投资 */
  select(val: any) {
    console.log(val);
    this.data = val;
  } /* 匹配投资选中的item */
  get countAmount() {
    let unMatchAmount = +this.detailedData.unMatchAmount;
    let investmentAmount = +this.data.investmentAmount;
    return unMatchAmount - investmentAmount;
  } /* 通过计算属性计算剩余匹配金额 */
  save() {
    this.sendData.claimId = this.$route.query.id;
    this.sendData.lending_contract_number = this.data.lendingContractNumber;
    this.sendData.investmentUserID = this.data.id;
    console.log(this.sendData);
    if (!this.sendData.lending_contract_number) {
      this.$alert("请选择匹配产品再点保存喂！", "提示", {
        confirmButtonText: "确定",
        type: "error"
      }); /* 判断如果没有产品代号，就弹窗 */
      return false;
    } else {
      (this as any).$api.creditor
        .changeCommend(this.sendData)
        .then((res: any) => {
          console.log(res);
        });
    }
  }
  previous() {
    this.$confirm("是否取消?", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    })
      .then(() => {
        this.$router.go(-1); /* 点击确定后返回上一页 */
      })
      .catch(() => {
        this.$message({
          type: "info",
          message: "已取消操作"
        });
      });
  }
}
</script>

//样式
<style lang='scss' scoped>
.commend-style {
  padding: 0 30px;
  margin-top: 20px;
}
.commend-list {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.card-box {
  text-align: left;
} /* 卡片格式 */
.single-line {
  font-weight: 1000;
  color: red;
  margin-right: 20px;
} /* 竖线 */
.title {
  display: flex;
  & > span {
    flex-basis: 25%;
    text-align: center;
  }
} /* 债权信息 */
.line-style {
  width: 100%;
  margin: 20px 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  & > span:nth-child(1) {
    font-size: 14px;
    margin-right: 20px;
  }
  .el-input {
    width: 300px !important;
  }
}
.span-style {
  margin-left: 20px;
  font-size: 14px;
}
.frame {
  margin-left: 75px;
  text-align: left;
  font-size: 14px;
  width: 300px;
}
.button-style {
  text-align: left;
  margin-top: 20px;
  margin-left: 75px;
}
</style>
