<template>
    <div>
      <div class="card">
        <div class="card-body">
          <el-form status-icon  ref="ruleForm2">
            <div class="line-style">
                <el-form-item label="" prop="pass" size="mini">
                  <span>债权人&#12288;</span>
                  <el-input type="text" auto-complete="off" placeholder="请输入内容"></el-input>
                </el-form-item>
                <el-form-item prop="checkPass">
                  <span>身份证号</span>
                  <el-input type="text" auto-complete="off" size="mini" placeholder="请输入内容"></el-input>
                </el-form-item>
                <el-form-item prop="age" size="mini">
                  <span>出借日期</span>
                  <DatePicker></DatePicker>
                </el-form-item>
            </div>
            <div class="line-style">
                <el-form-item label="" prop="pass" size="mini">
                  <span>债权代号</span>
                  <el-input type="text" auto-complete="off" placeholder="请输入内容"></el-input>
                </el-form-item>
                <el-form-item prop="checkPass">
                  <span>状态&#12288;&#12288;</span>
                  <el-select v-model="loan" clearable :disabled="disabled" size="mini" placeholder="请选择">
                    <el-option
                        v-for="item in loanOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item prop="age" size="mini">
                  <span>到期日期</span>
                  <DatePicker></DatePicker>
                </el-form-item>
            </div>
            <div class="line-style">
                <el-form-item label="" prop="pass" size="mini">
                  <span>手机号&#12288;</span>
                  <el-input type="text" auto-complete="off" placeholder="请输入内容"></el-input>
                </el-form-item>
                 <el-form-item prop="checkPass">
                  <span>出借金额</span>
                  <el-input class="input-width" type="text" auto-complete="off" size="mini" placeholder="请输入金额"></el-input>
                  ~
                  <el-input class="input-width" type="text" auto-complete="off" size="mini" placeholder="请输入金额"></el-input>
                </el-form-item>
                <el-form-item prop="checkPass">
                  <span>出借金额</span>
                  <el-input class="input-width" type="text" auto-complete="off" size="mini" placeholder="请输入金额"></el-input>
                  ~
                  <el-input class="input-width" type="text" auto-complete="off" size="mini" placeholder="请输入金额"></el-input>
                </el-form-item>
            </div>
                <el-form-item class="button">
                  <el-button type="primary" >搜索</el-button>
                  <el-button type="danger">清空</el-button>
                </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
</template>

<script lang='ts'>
import { Vue, Component, Prop } from "vue-property-decorator";
import DatePicker from "../../components/common/date/double-date.vue";


@Component({
  components: {
    DatePicker
  }
})
export default class creditorSearchList extends Vue {
  // ruleForm2: any = {
  //   pass: '',
  //   checkPass: '',
  //   age: ''
  // };
  rules2: any = {
    pass: [
      // { validator: validatePass, trigger: 'blur' }
    ],
    checkPass: [
      // { validator: validatePass2, trigger: 'blur' }
    ],
    age: [
      // { validator: checkAge, trigger: 'blur' }
    ]
  };
  submitForm(formName: any) {
    // this.$refs[formName].validate((valid) => {
    // if ("") {
    //   // alert('submit!');
    // } else {
    //   // console.log('error submit!!');
    //   return false;
    // }
  }

  resetForm(formName: any) {
    // this.$refs[formName].resetFields();
  }
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
