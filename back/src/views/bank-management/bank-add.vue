<template>
    <div>
      <el-card class="box-card">
        <div slot="header" style="text-align:left">
          新增/编辑
        </div>
        <el-form :model="data" :rules="rules" ref="ruleForm" status-icon class="">
          <div class="line-style">
            <el-form-item prop="bankName">
              <span class="span-style">银行名称</span>
              <el-input v-model="data.bankName" :disabled="disabled" type="text" size="mini" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item prop="singleLimit">
              <span class="span-style">单笔限额</span>
              <el-input v-model="data.singleLimit" type="text" size="mini" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item prop="dailyLimit">
              <span class="span-style">日累计限额</span>
              <el-input v-model="data.dailyLimit" type="text" size="mini" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item prop="paymentNumber">
              <span class="span-style">支付机构号</span>
              <el-input v-model="data.paymentNumber" :disabled="disabled" type="text" size="mini" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item prop="presentNumber">
              <span class="span-style">提现机构号</span>
              <el-input v-model="data.presentNumber" :disabled="disabled" type="text" size="mini" auto-complete="off"></el-input>
            </el-form-item>
          </div>
           <div class="upload">
            <span class="span-style">ICON</span>
            <uploadTwo
            :disabled="disabled"
            :base=data.bankLogo
            @upload-info="getContentPicture"></uploadTwo>
          </div>
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
export default class bankAdd extends Vue {
  data: any = {
    bankLogo: ""
  }; /* 数据对象 */
  disabled: boolean = false;
  created() {
    let id = this.$route.query.id;
    if (id) {
      this.disabled = true;
      this.getData(id);
    } /*  */
  }
  getData(id: any) {
    (this as any).$api.bank.editDateiled(id).then((res: any) => {
      console.log(res);
      this.data = res.data.data;
    });
  } /* 获取编辑数据 */
  getContentPicture(val: any) {
    this.data.bankLogo = val;
  } /* 获取上传图片的的url */

  checkBankName = (rule: any, value: any, callback: any) => {
    if (!value) {
      return callback(new Error("请填写完整！"));
    } else {
      callback();
    }
  }; /* 校验 银行名称 */

  checkSingleLimit = (rule: any, value: any, callback: any) => {
    if (!value || !Number(value)) {
      return callback(new Error("请必须要输入，并且数值为数字"));
    } else {
      callback();
    }
  }; /* 校验 单笔限额 */

  checkDailyLimit = (rule: any, value: any, callback: any) => {
    if (!value || !Number(value)) {
      return callback(new Error("请必须要输入，并且数值为数字"));
    } else {
      callback();
    }
  }; /* 校验 日累计限额 */

  checkPaymentNumber = (rule: any, value: any, callback: any) => {
    if (!value) {
      return callback(new Error("请必须要输入"));
    } else {
      callback();
    }
  }; /* 校验 支付机构号 */

  checkPresentNumber = (rule: any, value: any, callback: any) => {
    if (!value) {
      return callback(new Error("请必须要输入"));
    } else {
      callback();
    }
  }; /* 校验 支付机构号 */

  rules: any = {
    bankName: [{ validator: this.checkBankName, trigger: "blur" }],
    SingleLimit: [{ validator: this.checkSingleLimit, trigger: "blur" }],
    dailyLimit: [{ validator: this.checkDailyLimit, trigger: "blur" }],
    paymentNumber: [{ validator: this.checkPaymentNumber, trigger: "blur" }],
    presentNumber: [{ validator: this.checkPresentNumber, trigger: "blur" }]
  }; /* 校验规则 */

  $refs: any;
  submitForm(formName: any) {
    let id = this.$route.query.id;
    this.$refs[formName].validate((valid: any) => {
      if (valid) {
        if (!this.data.bankLogo) {
          this.$alert("请上传图片", "提示", {
            confirmButtonText: "确定",
            type: "error"
          }); /* 判断图片是否存在 */
          return false;
        } else {
          if (id) {
            (this as any).$api.bank
              .editChange(id, this.data)
              .then((res: any) => {
                console.log(res);
                if(res.data.code === 1){
                  this.$message({
                    message: '操作成功',
                    type: 'success'
                  });
                  this.$router.go(-1);
                }
              }); /* 如果是编辑页面，发送编辑请求 */
          } else {
            (this as any).$api.bank.launch(this.data).then((res: any) => {
              console.log(res);
              if(res.data.code === 1){
                this.$message({
                  message: '操作成功',
                  type: 'success'
                });
                this.$router.go(-1);
              }
            }); /* 发送新增保存请求 */
          }
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
