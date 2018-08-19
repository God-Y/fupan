<template>
    <div>
      <el-form status-icon :rules="rules" ref="form">
        <div class="one-line">
            <el-form-item prop="code"> 
                <span class="star-style">*</span>
                <span>产品代号</span> 
                <el-input placeholder="请输入内容" v-model="form.Pcode" auto-complete="off" :disabled="disabled" size="mini" clearable> </el-input> 
            </el-form-item>
            <div> 
                <span class="star-style">*</span>
                <span>年化收益</span>
                <el-input placeholder="请输入内容" v-model="yearIncome" :disabled="disabled"  size="mini"  clearable> </el-input> 
            </div>
            <div> 
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
            </div>
        </div>
        <!-- 第一行 -->
         <div class="one-line">
            <div> 
                <span class="star-style">*</span>
                <span>产品名称</span> 
                <el-input placeholder="请输入内容" v-model="Pname" :disabled="disabled" size="mini" clearable> </el-input> 
            </div>
            <div> 
                <span class="star-style">*</span>
                <span>起投金额</span>
                <el-input placeholder="请输入内容" v-model="startingAmount" :disabled="disabled" size="mini"  clearable> </el-input> 
            </div>
            <div> 
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
            </div>
        </div>
        <!-- 第二行 -->
         <div class="one-line deadline">
            <div> 
                <span class="star-style">*</span>
                <span>期&#12288;&#12288;限</span> 
                <el-input placeholder="请输入内容" v-model="deadline" :disabled="disabled" size="mini" clearable> </el-input> 
            </div>
            <!-- 期限 -->
            <div> 
                <el-select v-model="selectDate" clearable :disabled="disabled" size="mini" placeholder="请选择">
                    <el-option
                        v-for="item in date"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </div>
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
            <uploadFile :disabled="disabled"></uploadFile>
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
            <el-button type="primary">保存</el-button>
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
  yearIncome: string = ""; /* 年化收益 */
  loan: string = "到期本息一次付清"; /* 还款方式 */
  Pname: string = ""; /* 产品名称 */
  startingAmount: string = ""; /* 起投金额 */
  startDate: string = "t+0"; /* 起息日期 */
  deadline: number = 0; /* 期限 */
  selectDate: string = "日"; /* 期限 日月选择 */
  textarea: string = ""; /* 备注 */
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
    income: "",
    loan: "",
    name: "",
    amount: "",
    start: "",
    dead: ""
  }; /* 表单验证 数据对象 */
  checkCode = (rule: any, value: any, callback: any) => {
    console.log(this.form.Pcode);
    if (!this.form.Pcode) {
      callback(new Error("请输入"));
    } else {
      callback();
      /* 不加callback就不显示 值为正确时的提示 */
    }
  }; /* 验证 产品代号输入 */
  rules: any = {
    code: [
      { validator: this.checkCode, trigger: "blur" }
    ]
  }; /* 验证规则 ，加至 el-form*/
  created() {
    this.judgeEdit(); /* 判断是否编辑页面 */
  } /* 生命周期 */
  judgeEdit() {
    let statu = this.$route.query.statu; /* 获取是不是从新增按钮跳转进来的id */
    if (statu === "edit") {
      this.disabled = true;
    } /* 禁用按钮 */
  } /* 如果是新增按钮跳转，禁用一些按钮 */
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
@mixin side-span-padding {
  white-space: nowrap;
  margin-left: 20px;
  margin-right: 10px;
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
