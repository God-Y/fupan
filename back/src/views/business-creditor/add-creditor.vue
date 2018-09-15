<template>
    <div>
       <el-card ref="as" class="box-card">
        <div slot="header" class="clearfix">
          <span>新增/编辑</span>
        </div>
        <el-form :model="data" :rules="rules" status-icon  ref="ruleForm">
          <div class="line-style">
              <el-form-item label="" prop="creditorIdNumber" size="mini">
                <span>债权人身份证&#12288;</span>
                <el-input v-model="data.creditorIdNumber" type="text" auto-complete="off" placeholder="请输入内容"></el-input>
              </el-form-item>
              <el-form-item prop="creditorName">
                <span>债权人</span>
                <el-input v-model="data.creditorName" type="text" auto-complete="off" size="mini" placeholder="请输入内容"></el-input>
              </el-form-item>
              <el-form-item prop="creditorPhone" size="mini">
                <span>债权人手机&#12288;</span>
                <el-input v-model="data.creditorPhone" type="text" auto-complete="off" size="mini" placeholder="请输入内容"></el-input>
              </el-form-item>
          </div>
          <div class="line-style">
              <el-form-item prop="lendingPeriod" size="mini">
                <span>出借期限</span>
                <el-input v-model="data.lendingPeriod" type="text" auto-complete="off" placeholder="请输入内容"></el-input>&#12288;(月)
              </el-form-item>
              <el-form-item prop="lendingDate">
                <span>出借日期</span>
                <el-input v-model="data.lendingDate" type="text" auto-complete="off" size="mini" placeholder="请输入金额"></el-input>
              </el-form-item>
              <el-form-item prop="lendingAmount" size="mini">
                <span>出借金额</span>
                <el-input v-model="data.lendingAmount" type="text" auto-complete="off" size="mini" placeholder="请输入内容"></el-input>&#12288;(元)
              </el-form-item>
          </div>
          <div class="line-style">
              <el-form-item label="" prop="claimCode" size="mini">
                <span>债权代号</span>
                <el-input v-model="data.claimCode" type="text" auto-complete="off" placeholder="请输入内容"></el-input>
              </el-form-item>
                <el-form-item prop="property">
                <span>债权性质</span>
                <el-input v-model="data.property" type="text" auto-complete="off" size="mini" placeholder="请输入金额"></el-input>
              </el-form-item>
              <el-form-item prop="interestRate">
                <span>债权年利率</span>
                <el-input v-model="data.interestRate" type="text" auto-complete="off" size="mini" placeholder="请输入金额"></el-input>
              </el-form-item>
          </div>
          <div class="line-style">
              <el-form-item label="" prop="remarks" size="mini">
                <span>相关备注</span>
                <el-input v-model="data.remarks" type="text" auto-complete="off" placeholder="请输入内容"></el-input>
              </el-form-item>
          </div>
          <el-form-item class="button">
            <el-button type="primary" @click="save('ruleForm')">保存</el-button>
            <el-button type="danger" @click="previous">取消</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
</template>


<script lang='ts'>
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class addCreditor extends Vue {
  data: any = {}; /* 数据对象 */
  created() {
    this.judgeEdit();
    console.log(this.$refs);
  }
  judgeEdit() {
    let id = this.$route.query.id;
    console.log(id);
    let statu = this.$route.query.statu;
    if (statu !== "add") {
      (this as any).$api.creditor.getAddData(id).then((res: any) => {
        console.log(res);
        this.data = res.data.data;
        let temple = this.data.lendingDate;
        // .replace(/(.{4})/, "$1-");
        // this.data.lendingDate = temple.replace(
        //   /(.{7})/,
        //   "$1-"
        // ); /* 为日期增加横杠 */
        let value = new Date(temple);
        let year = value.getFullYear();
        let month = ("0" + (value.getMonth() + 1)).slice(-2); //getMonth是从0开始，所以加+
        let day = ("0" + value.getDate()).slice(-2);
        this.data.lendingDate = year + "-" + month + "-" + day;

        // this.data.lendingAmount = this.data.lendingAmount
        //   .toFixed(2)
        //   .replace(/(\d)(?=(\d{3})+\.)/g, "$1,"); /* 格式化出借金额 */
        this.data.interestRate =
          this.data.interestRate * 100 + "%"; /* 格式化年率利 */
      });
    }
  } /* 判断是否 编辑页面 */
  checkID: any = (rule: any, value: any, callback: any) => {
    let idPattern = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
    if (!value || !idPattern.test(value)) {
      callback(new Error("请输入正确的身份证号！"));
    } else {
      callback();
    }
  }; /* 验证身份证号 */
  checkName: any = (rule: any, value: any, callback: any) => {
    if (!value) {
      callback(new Error("请输入债权人姓名"));
    } else {
      callback();
    }
  }; /* 验证债权人 */
  checPhone: any = (rule: any, value: any, callback: any) => {
    let re = /^[0-9]*$/;
    if (!value || !re.test(value)) {
      callback(new Error("请输入正确的手机号"));
    } else {
      callback();
    }
  }; /* 验证手机号 */
  checkPeriod: any = (rule: any, value: any, callback: any) => {
    let re = /^[0-9]*$/;
    if (!value || !re.test(value)) {
      callback(new Error("请输入正确的月数"));
    } else {
      callback();
    }
  }; /* 出借期限 */
  checkDate: any = (rule: any, value: any, callback: any) => {
    // let re = /((19|20)\d{2})-(0?[13578]|1[02])-(0?[1-9]|[12]\d|3[01])/;
    if (!value) {
      callback(new Error("请输入正确的日期格式，例如：2018-08-08"));
    } else {
      callback();
    }
  }; /* 出借日期 */
  checkAmount: any = (rule: any, value: any, callback: any) => {
    let re = /^[0-9]*$/;
    if (!value || !re.test(value)) {
      callback(new Error("请输入金额，仅限数字！"));
    } else {
      callback();
    }
  }; /* 出借金额 */
  checkCode: any = (rule: any, value: any, callback: any) => {
    if (!value) {
      callback(new Error("请输入债权代号!"));
    } else {
      callback();
    }
  }; /* 债权代号 */
  checkProperty: any = (rule: any, value: any, callback: any) => {
    if (!value) {
      callback(new Error("请输入债权性质！"));
    } else {
      callback();
    }
  }; /* 债权性质！ */
  checkRate: any = (rule: any, value: any, callback: any) => {
    let re = /^(100|[0-9]{1,2})%$/;
    if (!value || !re.test(value)) {
      callback(new Error("请按格式输入,比如18%"));
    } else {
      callback();
    }
  }; /* 年率利 */
  checkRemark: any = (rule: any, value: any, callback: any) => {
    if (!value) {
      callback(new Error("请必须输入"));
    } else {
      callback();
    }
  }; /* 相关备注 */
  rules: any = {
    creditorIdNumber: [{ validator: this.checkID, trigger: "blur" }],
    creditorName: [{ validator: this.checkName, trigger: "blur" }],
    creditorPhone: [{ validator: this.checPhone, trigger: "blur" }],
    lendingPeriod: [{ validator: this.checkPeriod, trigger: "blur" }],
    lendingDate: [{ validator: this.checkDate, trigger: "blur" }],
    lendingAmount: [{ validator: this.checkAmount, trigger: "blur" }],
    property: [{ validator: this.checkProperty, trigger: "blur" }],
    claimCode: [{ validator: this.checkCode, trigger: "blur" }],
    interestRate: [{ validator: this.checkRate, trigger: "blur" }],
    remarks: [{ validator: this.checkRemark, trigger: "blur" }]
  }; /* 验证规则 */
  $refs: any = {
    ruleForm: HTMLFormElement
  };
  //重置表单，定义$refs保证元素能调用方法
  save(formName: any) {
    this.$refs[formName].validate((valid: any) => {
      if (valid) {
        console.log(this.data.lendingDate);
        // this.data.lendingDate = new Date(this.data.lendingDate.replace(
        //   /[-]/g,
        //   ""
        // )); /* 把输入的日期格式转换一下 */
        // this.data.interestRate =
        //   this.data.interestRate.replace(/[%]/, "") /
        //   100; /* 把输入的百分比转换一下 */
        // this.data.lendingDate = 12354131;
        this.data.lendingPeriod = 1;
        this.data.lendingAmount = 2;
        this.data.interestRate = 10.5;
        console.log(this.data);
        (this as any).$api.creditor.addCreditor(this.data).then((res: any) => {
          console.log(res);
        });
      } else {
        this.$message({
          message: "请填写必须的项目哦",
          type: "error",
          center: true
        });
        return false;
      }
    });
  } /* 保存按钮 */
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
  } /* 取消按钮 */
}
</script>

//样式
<style scoped lang="scss">
.el-input {
  width: 200px !important;
}
.input-width {
  width: 100px !important;
} /* input输入框的长度 */
.line-style {
  @include flex-vertical-between;
  flex-wrap: wrap;
  width: 100%;
  div {
    text-align: left;
  }
  span {
    margin-right: 5px;
  }
  & > div:nth-child(1) {
    flex-basis: 33%;
  }
  & > div:nth-child(2) {
    flex-basis: 33%;
  }
  & > div:nth-child(3) {
    flex-basis: 33%;
  } /* 为每行的元素分配宽度 */
} /* 搜索框每行样式 */
.button {
  text-align: right;
  margin-right: 10%;
}
</style>
