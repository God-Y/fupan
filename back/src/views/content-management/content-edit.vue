<template>
    <div>
      <el-card class="box-card">
        <div slot="header" style="text-align:left">
          新增/编辑
        </div>
        <el-form  status-icon class="demo-ruleForm">
          <el-form-item prop="pass" class="line-style">
            <i class="star">*</i>
            <span class="span-style">标题名称</span>
            <el-input v-model="data.title" type="text" size="mini" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item prop="checkPass" class="line-style">
            <span class="span-style">类&#12288;&#12288;型&ensp;</span>
            <el-select v-model="data.type" @change="judgeType" placeholder="请选择">
              <el-option label="推荐页banner" value="10"></el-option>
              <el-option label="帮助中心" value="20"></el-option>
              <el-option label="关于我们" value="30"></el-option>
          </el-select>
          </el-form-item>
          <div v-if="banner" class="upload">
            <i class="star">*</i>
            <span>封&#12288;&#12288;面</span>
            <upload
            :geturl=cover
            @clear="clearOne"
            @upload-info="getCover"></upload>
          </div>
           <div class="upload">
            <i class="star">*</i>
            <span>内&#12288;&#12288;容</span>
            <uploadTwo
            :base=content
            @clear="clearTwo"
            @upload-info="getContentPicture"></uploadTwo>
          </div>
          <el-form-item class="button-style">
            <el-button @click="launch" type="primary" size="small">立即上线</el-button>
            <el-button @click="draft" size="small" type="info">存为草稿</el-button>
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
export default class contentEdit extends Vue {
  data: any = {
    content: "",
    cover: "",
    type: "30"
  }; /* 数据对象 */
  cover: any = "";
  content: any = "";
  banner: any = false; /* 判断是否是banner的Boolean值 */
  checkrequest: boolean = false;
  // get bannershow() {
  //   if(this.$route.query.statu === "10"){
  //     return true;
  //   }else {
  //     return false;
  //   }
  // }
  created() {
    console.log("1");
    //  if (this.$route.query.statu === "10") {
    //   this.banner = true;
    // }
    this.getDetailed();
  }
  activated() {
    console.log("2");
    this.getDetailed();
    // if (this.$route.query.statu === "10") {
    //   this.banner = true;
    // }
  }
  getDetailed() {
    this.banner = false;
    let id = this.$route.query.id;
    if (id) {
      (this as any).$api.content.editDateiled(id).then((res: any) => {
        console.log(res);
        this.data = res.data.data;
        console.log(this.data.cover);
        this.cover = this.data.cover;
        console.log(this.data.content);
        this.content = this.data.content;
        console.log(this.data.type);
        console.log(res.data.data.type);
        if (res.data.data.type == 10) {
          this.banner = true;
        }
        switch (this.data.type) {
          case 10:
            return (this.data.type = "10");
          case 20:
            return (this.data.type = "20");
          case 30:
            return (this.data.type = "30");
        }
      });
    }
  } /* 获取数据详情 */
  judgeType(val: any) {
    this.data.content = "";
    this.data.cover = "";
    console.log(val);
    this.banner = false;
    if (val === "10") {
      this.banner = true;
    }
  } /* type change 事件判断点击的是banner的话就把上传组件显示 */
  getCover(val: any) {
    console.log(val);
    this.data.cover = val;
  } /* 获取子组件返回的封面的url */

  clearOne(val: any) {
    this.data.cover = "";
    this.cover = "";
    console.log(this.data.cover);
  }

  getContentPicture(val: any) {
    console.log(val);
    this.data.content = val;
  } /* 获取内容的url */
  clearTwo(val: any) {
    this.data.content = "";
    this.content = "";
    console.log(this.data.content);
  }
  launch() {
    console.log(this.data.contentUrl);
    this.data.state = "10"; /* 状态判断为立即上线 */
    if (this.data.type === "10") {
      if (!this.data.cover || !this.data.content || !this.data.title) {
        this.$alert("请把带*号的内容填写完整", "错误提示", {
          confirmButtonText: "确定"
        });
        return false;
      } /* 如果未填写完全，弹窗返回错误 */
    }
    if (this.data.type !== "10") {
      if (!this.data.content || !this.data.title) {
        this.$alert("请把带*号的内容填写完整", "错误提示", {
          confirmButtonText: "确定"
        });
        return false;
      } /* 如果未填写完全，弹窗返回错误 */
    }
    this.request(this.data.type);
  } /* 立即上线 */

  draft() {
    this.data.state = "20"; /* 状态判断为存为草稿 */
    if (this.data.type === "10") {
      if (!this.data.cover || !this.data.content || !this.data.title) {
        this.$alert("请把带*号的内容填写完整", "错误提示", {
          confirmButtonText: "确定"
        });
        return false;
      } /* 如果未填写完全，弹窗返回错误 */
    }
    if (this.data.type !== "10") {
      if (!this.data.content || !this.data.title) {
        this.$alert("请把带*号的内容填写完整", "错误提示", {
          confirmButtonText: "确定"
        });
        return false;
      } /* 如果未填写完全，弹窗返回错误 */
    }
    this.request(this.data.type); /* 传入type 判断是否是banner */
  } /* 存为草稿 */

  request(type: any) {
    let id = this.$route.query.id;
    // this.data.editors = "zheng";
    console.log(this.data);
    //   如果有路由id，请求的是修改的接口
    if (id) {
      if (type === "10") {
        // this.bannerError(); /* 判断资料是否填写完全 */
        (this as any).$api.content
          .editChange(id, this.data)
          .then((res: any) => {
            console.log(res);
            if (res.data.code === 1) {
              this.goback();
            }
          });
        //如果state== "10" 那么是banner进来的，则两个图片都需要上传
      } else {
        // this.validate();
        (this as any).$api.content
          .editChange(id, this.data)
          .then((res: any) => {
            console.log(res);
            if (res.data.code === 1) {
              this.goback();
            }
          });
      } /* 如果不是banner， 发送请求 */
    } else {
      /* 没有路由id  ， 使用的是新增接口 */
      if (type === "10") {
        // this.bannerError();
        (this as any).$api.content.launch(this.data).then((res: any) => {
          console.log(res);
          if (res.data.code === 1) {
            this.goback();
          }
        });
        //如果state== "10" 那么是banner进来的，则两个图片都需要上传
      } else {
        // this.validate();
        console.log(this.data);
        (this as any).$api.content.launch(this.data).then((res: any) => {
          console.log(res);
          if (res.data.code === 1) {
            this.goback();
          }
        });
      } /* 如果不是banner， 发送请求 */
    }
  } /* 发送请求的代码 */
  // bannerError() {
  //   if (!this.data.cover || !this.data.content || !this.data.title) {
  //     this.$alert("请把带*号的内容填写完整", "错误提示", {
  //       confirmButtonText: "确定"
  //     });
  //     return;
  //   } /* 如果未填写完全，弹窗返回错误 */
  // } /* 如果有banner的验证是否填写完整 */
  // validate() {
  //   if (!this.data.content || !this.data.title) {
  //     this.$alert("请把带*号的内容填写完整", "错误提示", {
  //       confirmButtonText: "确定"
  //     });
  //   } /* 如果未填写完全，弹窗返回错误 */
  //   return false;
  // }
  goback() {
    this.$message({
      message: "操作成功",
      type: "success"
    });
    this.$router.go(-1); /* 点击确定后返回上一页 */
  }
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
<style lang='scss' scoped>
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
