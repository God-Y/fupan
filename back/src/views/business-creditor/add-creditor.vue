<template>
    <div>
       <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>新增/编辑</span>
        </div>
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
                <el-input type="text" auto-complete="off" size="mini" placeholder="请输入内容"></el-input>
              </el-form-item>
          </div>
          <div class="line-style">
              <el-form-item label="" prop="pass" size="mini">
                <span>债权代号</span>
                <el-input type="text" auto-complete="off" placeholder="请输入内容"></el-input>
              </el-form-item>
              <el-form-item prop="checkPass">
                <span>状态&#12288;&#12288;</span>
                <el-input type="text" auto-complete="off" size="mini" placeholder="请输入金额"></el-input>
              </el-form-item>
              <el-form-item prop="age" size="mini">
                <span>到期日期</span>
                <el-input type="text" auto-complete="off" size="mini" placeholder="请输入内容"></el-input>
              </el-form-item>
          </div>
          <div class="line-style">
              <el-form-item label="" prop="pass" size="mini">
                <span>手机号&#12288;</span>
                <el-input type="text" auto-complete="off" placeholder="请输入内容"></el-input>
              </el-form-item>
                <el-form-item prop="checkPass">
                <span>出借金额</span>
                <el-input type="text" auto-complete="off" size="mini" placeholder="请输入金额"></el-input>
              </el-form-item>
              <el-form-item prop="checkPass">
                <span>出借金额</span>
                <el-input type="text" auto-complete="off" size="mini" placeholder="请输入金额"></el-input>
              </el-form-item>
          </div>
          <div class="line-style">
              <el-form-item label="" prop="pass" size="mini">
                <span>手机号&#12288;</span>
                <el-input type="text" auto-complete="off" placeholder="请输入内容"></el-input>
              </el-form-item>
          </div>
          <el-form-item class="button">
            <el-button type="primary" >保存</el-button>
            <el-button type="danger">取消</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
</template>


<script lang='ts'>
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class addCreditor extends Vue {}
</script>

//样式
<style scoped lang='scss'>
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
