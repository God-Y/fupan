<template>
    <div>
      <el-card class="box-card">
        <div slot="header" style="text-align:left">
          参数设置
        </div>
        <el-form :model="data" :rules="rules" ref="ruleForm" status-icon class="">
          <el-card class="box-card">
            <div slot="header" style="text-align:left">
              公章上传
            </div>
            <div class="upload">
              <span class="span-style">公章</span>
              <uploadTwo
              :disabled="disabled"
              :base=data.seal
              @upload-info="getContentPicture"></uploadTwo>
            </div>
          </el-card>
          <el-card class="box-card" style="margin-top:20px;">
            <div slot="header" style="text-align:left">
              提醒设置
            </div>
            <div class="line-style">
              <el-form-item prop="investmentEnd">
                <span class="span-style">投资到期消息提前天数</span>
                <el-input v-model="data.investmentEnd" :disabled="disabled" type="text" size="mini" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item prop="claimEnd">
                <span class="span-style">债权到期提前天数</span>
                <el-input v-model="data.claimEnd" type="text" size="mini" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item prop="claimLine">
                <span class="span-style">总债权投满警戒线</span>
                <el-input v-model="data.claimLine" type="text" size="mini" auto-complete="off"></el-input>
              </el-form-item>
            </div>
          </el-card>
            <el-form-item class="button-style">
              <el-button @click="save('ruleForm')" type="primary" size="small">保存</el-button>
              <el-button @click="cancel" size="small" type="danger">取消</el-button>
            </el-form-item>
        </el-form>
    </el-card>
    </div>
</template>

<script lang='ts'>
import { Vue, Component, Prop } from "vue-property-decorator";
import upload from "../../components/upload-file.vue";
import uploadTwo from "../../components/common/upload-file/upload-two.vue";

@Component({
  components: {
    upload,
    uploadTwo
  }
})
export default class parameter extends Vue {
  data: any = {
    seal: ""
  }; /* 数据对象 */
  disabled: boolean = false;

  getContentPicture(val: any) {
    this.data.seal = val;
  } /* 获取上传图片的的url */

  checkinvestmentEnd = (rule: any, value: any, callback: any) => {
    if (!value || !Number(value)) {
      return callback(new Error("请必须要输入，并且数值为数字"));
    } else {
      callback();
    }
  }; /* 校验 银行名称 */

  checkclaimEnd = (rule: any, value: any, callback: any) => {
    if (!value || !Number(value)) {
      return callback(new Error("请必须要输入，并且数值为数字"));
    } else {
      callback();
    }
  }; /* 校验 单笔限额 */

  checkclaimLine = (rule: any, value: any, callback: any) => {
    if (!value || !Number(value)) {
      return callback(new Error("请必须要输入，并且数值为数字"));
    } else {
      callback();
    }
  }; /* 校验 日累计限额 */

  rules: any = {
    investmentEnd: [{ validator: this.checkinvestmentEnd, trigger: "blur" }],
    claimEnd: [{ validator: this.checkclaimEnd, trigger: "blur" }],
    claimLine: [{ validator: this.checkclaimLine, trigger: "blur" }]
  }; /* 校验规则 */

  $refs: any;
  submitForm(formName: any) {
    let id = this.$route.query.id;
    this.$refs[formName].validate((valid: any) => {
      if (valid) {
        if (!this.data.seal) {
          this.$alert("请上传图片", "提示", {
            confirmButtonText: "确定",
            type: "error"
          }); /* 判断图片是否存在 */
          return false;
        } else {
          (this as any).$api.parameter.sendData(this.data).then((res: any) => {
            console.log(res);
          }); /* 发送新增保存请求 */
        }
      } else {
        this.$alert("请把带 * 提示的内容填写完成", "提示", {
          confirmButtonText: "确定",
          type: "warning"
        });
        return false;
      } /* 如果校验不成功，弹窗提示 */
    });
  } /* 发送请求 */

  save(formName: any) {
    this.submitForm(formName);
  } /* 保存 */

  cancel() {
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
<style lang="scss" scoped>
.el-input {
  width: 200px;
}
.line-style {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.star {
  color: red;
} /* 警示 */
.span-style {
  display: inline-block;
  white-space: nowrap;
  text-align: left;
  margin-right: 20px !important;
} /*  */
.upload {
  display: flex;
  margin-bottom: 20px;
  & > span {
    white-space: nowrap;
    margin-right: 20px;
    font-size: 14px;
  }
}
.button-style {
  text-align: left;
  margin-top: 20px;
  & > div {
    margin: 0 !important;
  }
} /* 按钮组样式 */
</style>
