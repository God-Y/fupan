<template>
    <div>
      <div class="card">
        <div class="card-body">
          <el-form status-icon  ref="ruleForm2">
            <div class="line-style">
                <el-form-item label="" prop="pass" size="mini">
                  <span>匹配日期</span>
                  <el-input type="text" auto-complete="off" placeholder="请输入内容"></el-input>
                </el-form-item>
                <el-form-item prop="checkPass">
                  <span>匹配用户</span>
                  <el-input type="text" auto-complete="off" size="mini" placeholder="请输入内容"></el-input>
                </el-form-item>
                <el-form-item prop="age" size="mini">
                  <span>到期日期</span>
                  <DatePicker></DatePicker>
                </el-form-item>
            </div>
            <div style="text-align:left">
                <el-form-item prop="age" size="mini">
                  <span>到期日期</span>
                  <DatePicker></DatePicker>
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
import DatePicker from "../../../components/common/date/double-date.vue";


@Component({
  components: {
    DatePicker
  }
})
export default class mtachSearch extends Vue {

}
</script>
//样式
<style lang='scss' scoped>
.card {
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
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
