<template>
    <div>
      <div class="card">
        <div class="card-body">
          <el-form :model="ruleForm" :rules="rules" status-icon ref="ruleForm">
            <div class="line-style">
                <el-form-item label=""  size="mini">
                  <span>债权人&#12288;</span>
                  <el-input v-model="ruleForm.creditorName" type="text" auto-complete="off" placeholder="请输入内容"></el-input>
                </el-form-item>
                <el-form-item prop="creditorIdNumber" ref="creditorIdNumber">
                  <span>身份证号</span>
                  <el-input v-model="ruleForm.creditorIdNumber" type="text" auto-complete="off" clearable size="mini" placeholder="请输入内容"></el-input>
                </el-form-item>
                <el-form-item prop="age" size="mini">
                  <span>出借日期</span>
                  <DatePicker
                  :upperDate="ruleForm.upperLendingDate"
                  :lowerDate="ruleForm.lowerLendingDate"
                  @start-change="getLendStart"
                  @end-change="getLendEnd"></DatePicker>
                </el-form-item>
            </div>
            <div class="line-style">
                <el-form-item label=""  size="mini">
                  <span>债权代号</span>
                  <el-input v-model="ruleForm.claimCode" type="text" auto-complete="off" placeholder="请输入内容"></el-input>
                </el-form-item>
                <el-form-item >
                  <span>状态&#12288;&#12288;</span>
                  <el-select @change="statuCode" v-model="statu"  size="mini" placeholder="请选择">
                    <el-option
                    ref="statu"
                      v-for="item in status"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item size="mini">
                  <span>到期日期</span>
                  <DatePicker
                  :lowerDate="ruleForm.lowerExpirationDate"
                  :upperDate="ruleForm.upperExpirationDate"
                  @start-change="geteExpireStart"
                  @end-change="getExpireEnd"></DatePicker>
                </el-form-item>
            </div>
            <div class="line-style">
                <el-form-item prop="creditorPhone"  size="mini" ref="creditorPhone">
                  <span>手机号&#12288;</span>
                  <el-input v-model="ruleForm.creditorPhone" type="text" auto-complete="off" placeholder="请输入内容"></el-input>
                </el-form-item>
                 <el-form-item >
                  <span>出借金额&#12288;</span>
                  <el-input v-model="ruleForm.upperLendingAmount" class="input-width" type="text" auto-complete="off" size="mini" placeholder="请输入金额"></el-input>
                  ~
                  <el-input v-model="ruleForm.lowerLendingAmount" class="input-width" type="text" auto-complete="off" size="mini" placeholder="请输入金额"></el-input>
                </el-form-item>
                <el-form-item >
                  <span>出借期限</span>
                  <el-input v-model="ruleForm.upperLendingDate" class="input-width" type="text" auto-complete="off" size="mini" placeholder="请输入月数"></el-input>
                  ~
                  <el-input v-model="ruleForm.lowerLendingDate" class="input-width" type="text" auto-complete="off" size="mini" placeholder="请输入月数"></el-input>&#12288;月
                </el-form-item>
            </div>
                <el-form-item class="button">
                  <el-button type="primary" @click="search" >搜索</el-button>
                  <el-button type="danger" @click="clear">清空</el-button>
                </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
</template>

<script lang='ts'>
import { Vue, Component, Prop, Emit } from "vue-property-decorator";
import DatePicker from "../../components/common/date/double-date.vue";

@Component({
  components: {
    DatePicker
  }
})
export default class creditorSearchList extends Vue {
  status = [
    {
      value: "全部",
      label: "全部",
      code: "4"
    },
    {
      value: "未使用",
      label: "未使用",
      code: "0"
    },
    {
      value: "使用中",
      label: "使用中",
      code: "1"
    },
    {
      value: "已到期",
      label: "已到期",
      code: "2"
    }
  ]; /* 状态 */

  statu: any = "全部"; /* 状态 */
  ruleForm: any = {
    upperLendingDate: "" /* 出借日期 上限 */,
    lowerLendingDate: "" /* 出借日期 */,
    lowerExpirationDate: "" /* 到期 始 */,
    upperExpirationDate: "" /* 到期时间 终 */
  }; /* 表单数据对象 */
  $refs: any = {
    ruleForm: HTMLFormElement
  };
  getLendStart(val: any) {
    this.ruleForm.lowerLendingDate = val;
  } /* 获取出借日期  上限 */
  getLendEnd(val: any) {
    this.ruleForm.upperLendingDate = val;
  } /* 获取出借日期 下限 */
  geteExpireStart(val: any) {
    this.ruleForm.lowerExpirationDate = val;
  } /* 到期时间 上限 */
  getExpireEnd(val: any) {
    this.ruleForm.upperExpirationDate = val;
  } /* 到期时间 下限 */
  checkPhone = (rule: any, value: any, callback: any) => {
    let re = /^[0-9]*$/;
    if (value.length === 0) {
      return this.$refs.creditorPhone.resetField(); //这里必须调用该元素的resetFileld()方法
    } else if (!re.test(value)) {
      callback(new Error("请输入正确的手机号"));
    } else {
      callback();
    }
  };
  checkId = (rule: any, value: any, callback: any) => {
    let idPattern = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
    if (value.length === 0) {
      return this.$refs.creditorIdNumber.resetField();
    } else if (!idPattern.test(value)) {
      callback(new Error("请输入正确的身份证号"));
    } else {
      callback();
    }
  }; /* 身份证校验 */
  rules: any = {
    creditorIdNumber: [{ validator: this.checkId, trigger: "blur" }],
    creditorPhone: [{ validator: this.checkPhone, trigger: "blur" }]
  }; /* 校验规则 */
  statuCode(event: any) {
    switch (event) {
      case "全部":
        return (this.ruleForm.status = "4");
      case "未使用":
        return (this.ruleForm.status = "0");
      case "使用中":
        return (this.ruleForm.status = "1");
      case "已到期":
        return (this.ruleForm.status = "2");
    }
  } /* 判断选中的状态码 */
  created() {
    console.log(this.$route.query);
    let query: any = this.$route.query;
    let keys: any = Object.keys(query);
    if (keys.length) {
      query.lowerLendingDate = query.lowerLendingDate
        ? Number(query.lowerLendingDate)
        : ""; //保证拿出的毫秒数是number类型
      query.upperLendingDate = query.upperLendingDate
        ? Number(query.upperLendingDate)
        : ""; //保证拿出的毫秒数是number类型
      query.lowerExpirationDate = query.lowerExpirationDate
        ? Number(query.lowerExpirationDate)
        : ""; //保证拿出的毫秒数是number类型
      query.upperExpirationDate = query.upperExpirationDate
        ? Number(query.upperExpirationDate)
        : ""; //保证拿出的毫秒数是number类型
      keys.forEach((value: any) => {
        this.ruleForm[value] = query[value];
      });
    }
  }
  @Emit()
  sendSearch(val: any) {} /* 向父级组件发送搜索数据 */
  @Emit()
  sendClear(val: any) {} /* 向父级发送清空的消息 */
  search() {
    this.$router.push({
      path: `/back/creditor`,
      query: this.ruleForm
    });
    this.sendSearch(this.ruleForm);
  } /* 搜索按钮 */
  clear() {
    let keys = Object.keys(this.ruleForm);
    keys.forEach((value: any) => {
      this.ruleForm[value] = "";
    }); /* 表单中的数据清零 */
    this.$router.push({
      path: `/back/creditor`
    }); /* 清空路由 */
    this.sendClear(""); /* 向父级弹射事件 */
  } /* 清空按钮 */
}
</script>
//样式
<style lang='scss' scoped>
.card {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
} /* 为搜索框添加阴影 */
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
    flex-basis: 28%;
  }
  & > div:nth-child(2) {
    flex-basis: 28%;
  }
  & > div:nth-child(3) {
    flex-basis: 44%;
  } /* 为每行的元素分配宽度 */
} /* 搜索框每行样式 */
.button {
  text-align: right;
}
</style>
