<template>
    <!-- 上传图片 -->
    <div>
        <div class="uploadButton">
            <input type="file" :disabled="disabled" id="file" @change='handleFileChange' class="fileInput">
            <label for="file" >点击上传文件</label>
        </div>
        <div class="imgPreview" >
            <span>Photo Preview Area</span>
            <img  :src="getdataurl" >
        </div>
        <table class='fileInfo'>
            <thead>
                <tr>
                    <th>图片名</th>
                    <th>文件大小</th>
                    <th>进度</th>
                    <th>操作</th>
                </tr>
                <tr class="info-line">
                    <td>{{files.name}}</td>
                    <td>{{filesSize+ 'MB'}}</td>
                    <td>
                        <div class="progressBox">
                            <div v-if="start" class="progress" 
                            :style="{width:progress}">
                            </div> <!-- v-if的作用是等到点击上传后才显现 -->
                        </div>
                    </td>
                    <td>
                        <div class="buttonStyle">
                            <el-button :plain="true" :disabled="disabled" @click="uploadImg">上传</el-button>
                            <el-button @click="init">删除</el-button>
                        </div>
                    </td>
                </tr>
            </thead>
        </table>
    </div>
</template>


<script lang='ts'>
import { Vue, Component, Prop, Emit } from "vue-property-decorator";
import uploader from "vue-simple-uploader";
import Axios from "axios";
import { Input } from "element-ui";
@Component
export default class uploadFile extends Vue {
  files: any = { name: "" }; /* 文件信息 */
  progress: any = 0; /* 上传文件进度 */
  start: boolean = false; /* 控制进度条显示 */
  filesSize: any = 0; /* 文件大小 */
  dataurl: any = "";
  @Prop([Boolean])
  disabled!: boolean; /* 判断是否禁用 */
  @Prop()
  geturl!: any; /* 图片base64 */

  get getdataurl() {
    if(this.geturl){
      return this.dataurl = this.geturl;
    }else {
      return this.dataurl;
    }
  }
  created() {
  //  if(this.geturl){
  //    console.log(this.geturl);
  //    this.dataurl = this.geturl;
  //  } 
  }
  @Emit()
  uploadInfo(files: any) {} /* 向父级发送上传文件成功后的url */

  handleFileChange(e: any) {
    this.init(); /* 每次change就初始化一次 */
    if (e.target.files[0].size >= 2516582) {
      this.$alert("请选择文件大小为3MB以下的文件", "错误提示", {
        confirmButtonText: "确定"
      });
      return false;
    } /* 限制文件大小 */

    this.files = e.target.files[0];
    if (this.files != undefined) {
      this.filesSize = (this.files.size / 1024 / 1024).toFixed(3);
    } /* 文件大小转换 */
    this.imgPreview(this.files);
  } /* 通过change事件获取文件信息 */

  imgPreview(file: any) {
    if (file !== undefined) {
      if (/^image/.test(file.type)) {
        /* 匹配文件类型为image的文件 */
        // 创建一个reader
        var reader = new FileReader();
        // 将图片将转成 base64 格式
        reader.readAsDataURL(file);
        // 读取成功后的回调
        reader.onloadend = result => {
          this.dataurl = result;
          this.dataurl = this.dataurl.currentTarget.result; /* 提取base64码 */
        };
      }
    } else {
      this.init();
      this.$alert("请选择文件", "错误提示", {
        confirmButtonText: "确定"
      });
    }
  } /* 通过fileready来实现本地预览 */

  uploadImg() {
    if (this.files.name == "" || this.files.name == undefined) {
      this.$alert("请先上传文件", "错误提示", {
        confirmButtonText: "确定"
      });
      return false;
    } /* 如果没有选择文件就点击上传，弹窗 */

    this.start = true; /* 进度条显示 */
    let form = new FormData();
    form.append("file", this.files); /* 添加获取到的文件 */
    let config = {
      onUploadProgress: (progressEvent: any) => {
        console.log(progressEvent.loaded);
        console.log(progressEvent);
        this.progress =
          (((progressEvent.loaded / progressEvent.total) * 100) | 0) + "%";
        console.log(this.progress);
      }
    }; /* 上传进度事件 */

    (this as any).$api.common
      .uploadPicture(form, config)
      .then((res: any) => {
        console.log(res);
        let message = res.data;
        this.uploadInfo(message); /* 请求成功后返回的url返回给父级 */
      })
      .catch(() => {
        this.uploadInfo("请求错误");
        this.$message({
          type: "error",
          message: "请求错误，请稍后重试！"
        });
        this.progress = 0;
      }); /* 上传成功的回调，信息在这里面提取，要限制上传图片的大小 */
  } /* 点击上传按钮，发送HTTP请求 */

  init() {
    this.start = false;
    this.files = "";
    this.dataurl = "";
    this.progress = 0;
    this.filesSize = 0;
  } /* 初始化， 删除按钮 */
}
</script>

//样式
<style lang="scss">
@mixin buttonStyle {
  display: inline-block;
  padding: 6px 25px;
  margin-bottom: 10px;
  font-size: 14px;
  font-weight: 300;
  text-align: center;
  background: #fff;
  border: 1px solid #dcdfe6;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.1s;
}
@mixin buttonHover {
  color: #409eff;
  border-color: #c6e2ff;
  background-color: #ecf5ff;
}
.fileInput {
  position: absolute;
  z-index: -1;
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
} /* 隐藏input */
.fileInput + label {
  @include buttonStyle();
} /* 点击按钮样式 */
.fileInput:focus + label,
.fileInput:hover + label {
  @include buttonHover();
} /* 点击和hover效果 */
.uploadButton {
  text-align: left;
}
.imgPreview {
  position: relative;
  padding: 5px;
  width: 100%;
  height: 300px;
  border: 1px solid #c0c4cc;
  border-bottom: none;
  text-align: center;
  span {
    position: absolute;
    top: 0;
    left: 0;
    color: #e8e8e8;
    font-weight: 300;
    font-size: 100px;
    letter-spacing: 4px;
  }
  img {
    position: relative;
    display: block;
    height: 100%;
    z-index: 1;
  }
} /* 预览图片 */

.fileInfo {
  border-collapse: collapse;
  width: 100%;
  table-layout: fixed;
  tr,
  td,
  th {
    border: 1px solid #c0c4cc;
    height: 40px;
    width: 25%;
    word-break: break-word;
  }
  .info-line {
    td:nth-child(3) {
      @include flex-vertical-center;
      width: 100%;
      border: none;
    }
  }
} /* 文件信息表格 */
.progressBox {
  width: 200px;
  height: 6px;
  border: 1px solid #ccc;
  border-radius: 15px;
  overflow: hidden; /*让实际的上传进度条充满这个条框*/
  box-shadow: 0 0 5px 0px #ddd inset;
}
.progress {
  background: #409eff;
  // width: 200px;
  height: 6px;
  // transition: 2s;
} /* 上传进度条 */

.buttonStyle {
  @include flex-vertical-between;
  justify-content: space-around;
  button {
    @include buttonStyle();
    margin: 0;
  }
  button:hover {
    @include buttonHover();
  }
}
</style>
