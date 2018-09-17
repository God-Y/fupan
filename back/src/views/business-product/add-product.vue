<template>
    <div>
      <el-form :model="form" status-icon :rules="rules" ref="form2">
        <div class="line-style">
            <el-form-item prop="productCode"> 
                <span class="star-style">*</span>
                <span>产品代号</span> 
                <el-input type="text" placeholder="请输入内容" v-model="form.productCode" auto-complete="off" :disabled="disabled" size="mini" clearable> </el-input> 
            </el-form-item>
            <el-form-item prop="annualizedIncome"> 
                <span class="star-style">*</span>
                <span>年化收益</span>
                <el-input placeholder="请输入内容" v-model="form.annualizedIncome" :disabled="disabled"  size="mini"  clearable> </el-input> 
            </el-form-item>
            <el-form-item prop="repaymentMode"> 
                <span class="star-style">*</span>
                <span>还款方式</span> 
                <el-select v-model="form.repaymentMode" clearable :disabled="disabled" size="mini" placeholder="请选择">
                    <el-option
                        v-for="item in repaymentModeOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
        </div>
        <!-- 第一行 -->
         <div class="line-style">
            <el-form-item prop="name"> 
                <span class="star-style">*</span>
                <span>产品名称</span> 
                <el-input placeholder="请输入内容" v-model="form.name" :disabled="disabled" size="mini" clearable> </el-input> 
            </el-form-item>
            <el-form-item prop="startingAmount"> 
                <span class="star-style">*</span>
                <span>起投金额</span>
                <el-input placeholder="请输入内容" v-model="form.startingAmount" :disabled="disabled" size="mini"  clearable> </el-input> 
            </el-form-item>
            <el-form-item> 
                <span class="star-style">*</span>
                <span>起息日期</span> 
                <el-select v-model="form.valueDate" clearable :disabled="disabled" size="mini" placeholder="请选择">
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
              v-model="form.remark">
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
                <el-radio v-model="form.type" :label=+10>新进产品</el-radio>
                <el-radio v-model="form.type" :label=+20>热门产品</el-radio>
            </div>
        </div>
        <div class="side-span">
            <span>&#12288;推&#12288;&#12288;荐</span>
             <div>
                <el-radio v-model="form.isRecommend" :label=+1>精品推荐</el-radio>
            </div>
        </div>
        <div class="side-span">
            <span>&#12288;限&#12288;&#12288;购</span>
             <div>
                <el-radio v-model="form.isPurchaseLimit" :label=+1>是</el-radio>
                <el-radio v-model="form.isPurchaseLimit" :label=+0>否</el-radio>
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
  // productCode: string = ""; /* 产品代号 */
  // // annualizedIncome: string = ""; /* 年化收益 */
  // repaymentMode: string = "到期本息一次付清"; /* 还款方式 */
  // // name: string = ""; /* 产品名称 */
  // // startingAmount: string = ""; /* 起投金额 */
  // valueDate: string = "t+0"; /* 起息日期 */
  // // deadline: number = 0; /* 期限 */
  // // 以上注释的都放入表单验证的数据对象中
  selectDate: any = 1; /* 期限 日月选择 */
  edit: boolean = false;
  id: any = "";
  editData: any = {};
  // textarea: string = ""; /* 备注 */
  // imgUrl: string = "";
  // type: number = 0; /* 产品分类 */
  // recommend: number = 0; /* 是否推荐 */
  // purchaseLimit: number = 0; /* 是否限购 */
  disabled: boolean = false; /* 禁用按钮 */
  repaymentModeOptions: any = [
    {
      value: 10,
      label: "到期本息一次付清"
    },
    {
      value: 20,
      label: "按月付息，到期还本"
    }
  ];

  startOptions: any = [
    {
      value: 10,
      label: "T+0"
    },
    {
      value: 20,
      label: "T+1"
    },
    {
      value: 30,
      label: "T+2"
    }
  ];
  date: any = [
    {
      value: 1,
      label: "日"
    },
    {
      value: 2,
      label: "月"
    }
  ];
  form: any = {
    productCode: "",
    annualizedIncome: "",
    repaymentMode: 10,
    valueDate: 10,
    name: "",
    startingAmount: "",
    deadline: "",
    remark: "",
    moreDetails: "",
    isShelf: "0",
    isPurchaseLimit: 1,
    isRecommend: 0,
    type: 10
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
  }; //验证收益
  checkname = (rule: any, value: string, callback: any) => {
    if (!value) {
      callback(new Error("请输入"));
    } else {
      callback();
    }
  };
  // 验证起投金额
  checkStartingAmount = (rule: any, value: any, callback: any) => {
    if (!value || value % 10000 != 0) {
      callback(new Error("请输入10000的倍数"));
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
    productCode: [{ validator: this.checkCode, trigger: "blur" }],
    annualizedIncome: [{ validator: this.checkIncome, trigger: "blur" }],
    name: [{ validator: this.checkname, trigger: "blur" }],
    startingAmount: [{ validator: this.checkStartingAmount, trigger: "blur" }],
    deadline: [{ validator: this.checkDeadline, trigger: "blur" }]
  }; /* 验证规则 ，加至 el-form,el-form 会匹配为item中的prop, prop和数据对象/验证规则属性需一致，匹配的每一个对象中的规则对象中校验规则*/
  created() {
    this.judgeEdit(); /* 判断是否编辑页面 */
  } /* 生命周期 */
  judgeEdit() {
    let statu = this.$route.query.statu; /* 获取是不是从新增按钮跳转进来的id */
    if (statu === "edit") {
      this.id = this.$route.query.id;
      this.disabled = true;
      this.edit = true;
      (this as any).$api.product.productInfo(this.id).then((res: any) => {
        console.log(res);
        this.form = res.data.data;
      });
    } /* 禁用按钮 */
  } /* 如果是新增按钮跳转，禁用一些按钮 */
  getUpload(file: any) {
    this.form.moreDetails = file;
    console.log(this.form.moreDetails);
  }
  $refs: any = {
    form2: HTMLFormElement
  };
  //重置表单，定义$refs保证元素能调用方法
  save(formName: any) {
    this.$refs[formName].validate((valid: any) => {
      if (valid) {
        this.form.annualizedIncome = Number(this.form.annualizedIncome);
        this.form.deadline = Number(this.form.deadline);
        this.form.startingAmount = Number(this.form.startingAmount); //转换为number类型
        if (this.selectDate == 2) {
          this.form.deadline *= 30;
        } //期限判断
        if (this.edit) {
          this.editData.type = this.form.type;
          this.editData.isRecommend = this.form.isRecommend;
          this.editData.isPurchaseLimit = this.form.isPurchaseLimit;
          console.log(this.editData);
          (this as any).$api.product
            .editProduct(this.id, this.editData)
            .then((res: any) => {
              console.log(res);
              if (res.data.code === 1) {
                this.$alert("保存成功，点击取消可以返回上一页", "提示", {
                  confirmButtonText: "确定"
                });
              } else {
                let error = res.data.message;
                console.log(error);
                this.$alert(error, "提示", {
                  confirmButtonText: "确定"
                });
                return false;
              }
            });
        } else {
          if (!this.form.moreDetails) {
            this.$alert("请先上传图片", "提示", {
              confirmButtonText: "确定"
            });
            return false;
          }
          (this as any).$api.product.addProduct(this.form).then((res: any) => {
            console.log(res);
            if (res.data.code === 1) {
              this.$alert("保存成功，点击取消可以返回上一页", "提示", {
                confirmButtonText: "确定"
              });
            } else {
              let error = res.data.message;
              console.log(error);
              this.$alert(error, "提示", {
                confirmButtonText: "确定"
              });
            }
          });
          console.log(this.form);
        }
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
