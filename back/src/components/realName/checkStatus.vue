<template>
<el-dialog
  title="操作提示"
  :visible="dialogVisible"
  width="30%"
  :before-close="handleClose"
  class="dialog-box"
  >
  <span class="dialog-title">请选择通过或拒绝审核信息</span>
  <el-form  label-width="0">
    <el-form-item >
      <el-radio-group v-model="checkForm.status">
        <el-radio label="通过"  class="dialog-item"></el-radio>
        <el-radio label="拒绝"  class="dialog-item"></el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item v-if="checkForm.status == '拒绝'">
       <el-input type="textarea" v-model="checkForm.reason"
          placeholder="请填拒绝理由，25字以内" class="reason-item" 
       ></el-input>
    </el-form-item>
  </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="handleClose">取 消</el-button>
    <el-button type="primary" @click="comfirm">确 定</el-button>
  </span>
</el-dialog>
</template>


<script lang="ts">
import { Vue, Component, Prop, Emit } from "vue-property-decorator";
@Component
export default class CheckStatus extends Vue {
  @Prop([Boolean])
  visible!: boolean;
  @Prop([String])
  userId!: string;
  @Emit()
  confirmStatus(params: any) {}

  get dialogVisible() {
    return this.visible;
  }
  checkForm:object = {
    reason: "",
    status: "通过"
  };
  //点击确定按钮发送http请求,把数据传送出去
  comfirm() {
    this.confirmStatus(this.checkForm);
  }
  handleClose(done:any) {
    this.$message('取消操作');
    (this as any).$parent.checkVisible = false;
  }
}
</script>

<style lang="scss" scoped>
.dialog-box >>> .el-radio__label {
  font-size: 25px;
}
.dialog-box {
  .reason-item,.dialog-title {
    font-size: 16px;
  }
  .dialog-title {
    display: inline-block;
    margin-bottom: 30px;
  }
}
</style>
