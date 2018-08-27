<template>
    <div>
      <el-card class="box-card">
        <div slot="header" style="text-align:left">
          新增/编辑
        </div>
        <el-form :model="data" :rules="rules" ref="ruleForm" status-icon class="">
          <div class="line-style">
            <el-form-item prop="title">
              <span class="span-style">银行名称</span>
              <el-input v-model="data.bankName" type="text" size="mini" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item prop="title">
              <span class="span-style">单笔限额</span>
              <el-input v-model="data.SingleLimit" type="text" size="mini" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item prop="title">
              <span class="span-style">日累计限额</span>
              <el-input v-model="data.dailyLimit" type="text" size="mini" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item prop="title">
              <span class="span-style">支付机构号</span>
              <el-input v-model="data.paymentNumber" type="text" size="mini" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item prop="title">
              <span class="span-style">提现机构号</span>
              <el-input v-model="data.presentNumber" type="text" size="mini" auto-complete="off"></el-input>
            </el-form-item>
          </div>
           <div class="upload">
            <span class="span-style">ICON</span>
            <uploadTwo
            :base=data.bankLogo
            @upload-info="getContentPicture"></uploadTwo>
          </div>
          <el-form-item class="button-style">
            <el-button @click="launch('ruleForm')" type="primary" size="small">发送</el-button>
            <el-button @click="draft('ruleForm')" size="small" type="info">存为草稿</el-button>
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
export default class bankAdd extends Vue {
  data: any = {
    bankLogo: ""
  }; /* 数据对象 */

  getContentPicture(val: any) {
    console.log(val);
    this.data.bankLogo = val;
  } /* 获取上传图片的的url */

  checkTitle = (rule: any, value: any, callback: any) => {
    if (value === undefined) {
      return callback(new Error("请填写完整！"));
    } else {
      callback();
    }
  }; /* 校验标题 */

  checkBrief = (rule: any, value: any, callback: any) => {
    if (!value) {
      return callback(new Error("请必须要输入！"));
    } else {
      callback();
    }
  }; /* 校验匹配 */

  rules: any = {
    title: [{ validator: this.checkTitle, trigger: "blur" }],
    brief: [{ validator: this.checkBrief, trigger: "blur" }]
  }; /* 校验规则 */

  $refs: any;
  submitForm(formName: any) {
    this.$refs[formName].validate((valid: any) => {
      if (valid) {
        if (!this.data.content) {
          this.$alert("请上传图片", "提示", {
            confirmButtonText: "确定",
            type: "error"
          });
          return false;
        } else {
          (this as any).$api.message.send(this.data).then((res: any) => {
            console.log(res);
          }); /* 发送HTTP请求 */
        }
      } else {
        this.$alert("请把带 * 提示的内容填写完成", "提示", {
          confirmButtonText: "确定",
          type: "warning"
        });
        return false;
      }
    });
  } /* 发送请求 */
  launch(formName: any) {
    this.data.status = "10";
    this.submitForm(formName);
  } /* 立即上线 */

  draft(formName: any) {
    this.data.status = "20";
    this.submitForm(formName);
  } /* 存为草稿 */

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
  width: 260px;
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
  width: 60px;
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
  margin-left: 5%;
  margin-top: 20px;
  & > div {
    margin: 0 !important;
  }
} /* 按钮组样式 */
</style>
