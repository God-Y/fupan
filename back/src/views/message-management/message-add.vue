<template>
    <div>
      <el-card class="box-card">
        <div slot="header" style="text-align:left">
          新增/编辑
        </div>
        <el-form :model="data" :rules="rules" ref="ruleForm" status-icon class="demo-ruleForm">
          <el-form-item prop="title" class="line-style">
            <i class="star">*</i>
            <span class="span-style">标&#12288;&#12288;题</span>
            <el-input v-model="data.title" type="text" size="mini" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item prop="checkPass" class="line-style">
            <span class="span-style">发送人群</span>
            <el-select v-model="data.sendingCrowd" placeholder="请选择">
              <el-option label="认证投资人" value="10"></el-option>
              <el-option label="所有人" value="20"></el-option>
          </el-select>
          </el-form-item>
          <el-form-item prop="brief" class="line-style">
            <i class="star">*</i>
            <span class="span-style">简&#12288;&#12288;述</span>
            <el-input 
              style="width:500px"
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
              v-model="data.brief">
            </el-input>
          </el-form-item>
           <div class="upload">
            <i class="star">*</i>
            <span>内&#12288;&#12288;容</span>
            <uploadTwo
            :base=data.content
            @upload-info="getContentPicture"></uploadTwo>
          </div>
           <el-form-item prop="checkPass" class="line-style">
            <span class="span-style">消息类型</span>
            <el-select v-model="data.type" placeholder="请选择">
              <el-option label="即时发送" value="10"></el-option>
              <el-option label="定时发送" value="20"></el-option>
          </el-select>
          </el-form-item>
          <el-form-item v-if="data.type === '20'" class="line-style">
            <span class="span-style">定时发送</span>
              <el-date-picker
                @change="changetime"
                v-model="data.timingTime"
                type="datetime"
                placeholder="选择日期及时间">
              </el-date-picker>
          </el-form-item>
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
export default class messageAdd extends Vue {
  data: any = {
    content: "",
    sendingCrowd: "10",
    type: "10"
  }; /* 数据对象 */
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

  getContentPicture(val: any) {
    console.log(val);
    this.data.content = val;
  } /* 获取上传图片的的url */
  changetime(val: Date) {
    this.data.timingTime = val.valueOf();
  } /* 把定时发送的时间转换成时间戳 */

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
  width: 200px;
}
.line-style {
  width: 100%;
  text-align: left;
}
.star {
  color: red;
} /* 警示 */
.span-style {
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
  margin-left: 80px;
  margin-top: 20px;
  & > div {
    margin: 0 !important;
  }
} /* 按钮组样式 */
</style>
