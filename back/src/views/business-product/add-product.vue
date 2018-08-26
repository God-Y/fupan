<template>
    <div>
      <el-form :model="form" status-icon :rules="rules" ref="form2">
        <div class="line-style">
            <el-form-item prop="Pcode"> 
                <span class="star-style">*</span>
                <span>产品代号</span> 
                <el-input type="text" placeholder="请输入内容" v-model="form.Pcode" auto-complete="off" :disabled="disabled" size="mini" clearable> </el-input> 
            </el-form-item>
            <el-form-item prop="yearIncome"> 
                <span class="star-style">*</span>
                <span>年化收益</span>
                <el-input placeholder="请输入内容" v-model="form.yearIncome" :disabled="disabled"  size="mini"  clearable> </el-input> 
            </el-form-item>
            <el-form-item prop="loan"> 
                <span class="star-style">*</span>
                <span>还款方式</span> 
                <el-select v-model="loan" clearable :disabled="disabled" size="mini" placeholder="请选择">
                    <el-option
                        v-for="item in loanOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
        </div>
        <!-- 第一行 -->
         <div class="line-style">
            <el-form-item prop="Pname"> 
                <span class="star-style">*</span>
                <span>产品名称</span> 
                <el-input placeholder="请输入内容" v-model="form.Pname" :disabled="disabled" size="mini" clearable> </el-input> 
            </el-form-item>
            <el-form-item prop="startingAmount"> 
                <span class="star-style">*</span>
                <span>起投金额</span>
                <el-input placeholder="请输入内容" v-model="form.startingAmount" :disabled="disabled" size="mini"  clearable> </el-input> 
            </el-form-item>
            <el-form-item> 
                <span class="star-style">*</span>
                <span>起息日期</span> 
                <el-select v-model="startDate" clearable :disabled="disabled" size="mini" placeholder="请选择">
                    <el-option
                        v-for="item in startOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
        </div>
        <!-- 第二行 -->
         <div class="line-style deadline">
            <el-form-item prop="deadline"> 
                <span class="star-style">*</span>
                <span>期&#12288;&#12288;限</span> 
                <el-input placeholder="请输入内容" v-model="form.deadline" :disabled="disabled" size="mini" clearable> </el-input> 
            </el-form-item>
            <!-- 期限 -->
            <el-form-item> 
                <el-select v-model="selectDate" clearable :disabled="disabled" size="mini" placeholder="请选择">
                    <el-option
                        v-for="item in date"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <!-- 选择日、月 -->
        </div>
        <!-- 第三行 -->
        <div class="textarea">
            <span>&#12288;备&#12288;&#12288;注</span>
            <el-input
              :disabled="disabled"
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="请输入内容,字数长度限制为50"
              maxlength = 50
              v-model="textarea">
            </el-input>
        </div>
        <!-- 第四行 -->
        <div class="side-span">
            <span>&#12288;更多详情</span>
            <uploadFile 
            @upload-info="getUpload"
            :disabled="disabled"
            ></uploadFile>
        </div>
        <div class="side-span">
            <span>&#12288;角&#12288;&#12288;标</span>
            <div>
                <el-radio v-model="type" label="1">新进产品</el-radio>
                <el-radio v-model="type" label="2">热门产品</el-radio>
            </div>
        </div>
        <div class="side-span">
            <span>&#12288;推&#12288;&#12288;荐</span>
             <div>
                <el-radio v-model="recommend" label="1">精品推荐</el-radio>
            </div>
        </div>
        <div class="side-span">
            <span>&#12288;限&#12288;&#12288;购</span>
             <div>
                <el-radio v-model="purchaseLimit" label="1">是</el-radio>
                <el-radio v-model="purchaseLimit" label="2">否</el-radio>
            </div>
        </div>
        <div class="side-span footer-button">
            <el-button @click="save('form2')" type="primary" :plain="true">保存</el-button>
            <el-button @click="prePage" type="danger" plain>取消</el-button>
        </div>
      </el-form>
    </div>
</template>


<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import uploadFile from "../../components/upload-file.vue"; /* import 上传文件组件 */

@Component({
  components: {
    uploadFile /* 上传文件组件 */
  }
})
export default class addProduct extends Vue {
  /*
  所有的按钮和输入框还需要绑定 双向绑定数据， 
    */
  // Pcode: string = ""; /* 产品代号 */
  // yearIncome: string = ""; /* 年化收益 */
  loan: string = "到期本息一次付清"; /* 还款方式 */
  // Pname: string = ""; /* 产品名称 */
  // startingAmount: string = ""; /* 起投金额 */
  startDate: string = "t+0"; /* 起息日期 */
  // deadline: number = 0; /* 期限 */
  // 以上注释的都放入表单验证的数据对象中
  selectDate: string = "日"; /* 期限 日月选择 */
  textarea: string = ""; /* 备注 */
  imgUrl: string = "";
  type: number = 0; /* 产品分类 */
  recommend: number = 0; /* 是否推荐 */
  purchaseLimit: number = 0; /* 是否限购 */
  disabled: boolean = false; /* 禁用按钮 */
  loanOptions: any = [
    {
      value: "选项1",
      label: "到期本息一次付清"
    },
    {
      value: "选项2",
      label: "按月付息，到期还本"
    }
  ];

  startOptions: any = [
    {
      value: "选项1",
      label: "t+0"
    },
    {
      value: "选项2",
      label: "t+1"
    },
    {
      value: "选项3",
      label: "t+2"
    }
  ];
  date: any = [
    {
      value: "选项1",
      label: "日"
    },
    {
      value: "选项2",
      label: "月"
    }
  ];
  form: any = {
    Pcode: "",
    yearIncome: "",
    Pname: "",
    startingAmount: "",
    deadline: ""
  }; /* 表单验证 数据对象 */
  private checkCode = (rule: any, value: string, callback: any) => {
    if (!value) {
      callback(new Error("请输入"));
    } else {
      callback();
      /* 不加callback就不显示 值为正确时的提示 */
    }
  }; /* 验证 产品代号输入 */
  checkIncome = (rule: any, value: string, callback: any) => {
    if (!value) {
      callback(new Error("请输入"));
    } else {
      callback();
    }
  };
  checkPname = (rule: any, value: string, callback: any) => {
    if (!value) {
      callback(new Error("请输入"));
    } else {
      callback();
    }
  };
  checkStartingAmount = (rule: any, value: string, callback: any) => {
    if (!value) {
      callback(new Error("请输入"));
    } else {
      callback();
    }
  };
  checkDeadline = (rule: any, value: string, callback: any) => {
    if (!value) {
      callback(new Error("请输入"));
    } else {
      callback();
    }
  };
  rules: any = {
    Pcode: [{ validator: this.checkCode, trigger: "blur" }],
    yearIncome: [{ validator: this.checkIncome, trigger: "blur" }],
    Pname: [{ validator: this.checkPname, trigger: "blur" }],
    startingAmount: [{ validator: this.checkStartingAmount, trigger: "blur" }],
    deadline: [{ validator: this.checkDeadline, trigger: "blur" }]
  }; /* 验证规则 ，加至 el-form,el-form 会匹配为item中的prop, prop和数据对象/验证规则属性需一致，匹配的每一个对象中的规则对象中校验规则*/
  created() {
    this.judgeEdit(); /* 判断是否编辑页面 */
  } /* 生命周期 */
  judgeEdit() {
    let statu = this.$route.query.statu; /* 获取是不是从新增按钮跳转进来的id */
    if (statu === "edit") {
      this.disabled = true;
    } /* 禁用按钮 */
  } /* 如果是新增按钮跳转，禁用一些按钮 */
  getUpload(file: any) {
    this.imgUrl = file;
    console.log(this.imgUrl);
  }
  $refs: any = {
    form2: HTMLFormElement
  };
  //重置表单，定义$refs保证元素能调用方法
  save(formName: any) {
    this.$refs[formName].validate((valid: any) => {
      if (valid) {
        console.log("submit!");
      } else {
        this.$message({
          message: "请填写必须的项目哦",
          type: "error",
          center: true
        });
        return false;
      }
    }); /* 如果有未输入的 提示 */
  }
  prePage() {
    this.$confirm("是否取消?", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    })
      .then(() => {
        this.$router.go(-1);
      })
      .catch(() => {
        this.$message({
          type: "info",
          message: "已取消确认"
        });
      });
  } /* 点击取消返回上一页 */
}
</script>

//样式
<style scoped lang="scss">
.el-input {
  width: 200px !important;
}
@mixin side-span-padding {
  white-space: nowrap;
  margin-left: 20px;
  margin-right: 10px;
}
.line-style {
  @include flex-vertical-between;
  flex-wrap: wrap;
  span {
    margin: 0 8px;
  }
}
.star-style {
  color: red;
} /* * 颜色 */
.deadline {
  justify-content: flex-start;
  .el-select {
    margin-left: 10px;
    width: 100px;
  }
} /* 期限 */
.textarea {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 30px;
  span {
    @include side-span-padding;
  }
  .el-textarea {
    width: 60%;
  }
} /* 输入区域 */
.side-span {
  display: flex;
  margin-bottom: 30px;
  > span {
    @include side-span-padding();
  }
} /* 输入框侧边侧边 */
.footer-button {
  margin-left: 35px;
  button {
    width: 100px;
  }
}
</style>
