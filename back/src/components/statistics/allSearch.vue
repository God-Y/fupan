<template>
  <div>
    <div class="card">
      <div class="card-body">
        <el-form :model="statisticsForm" ref="statisticsForm" status-icon :rules="rules"  label-width="96px" class="ruleForm">
          <!-- 产品名称 -->
          <el-form-item label="产品名称" prop="productName" ref="productName">
            <el-input type="text" v-model="statisticsForm.productName"  auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="产品代号"  class="form-item">
            <el-input type="text" v-model="statisticsForm.poductCode" auto-complete="off"></el-input>
          </el-form-item>
          <!-- 搜索清空那按钮 -->
          <el-form-item class="btn-box ">
            <el-button type="danger" @click="resetForm">清空</el-button>
            <el-button type="primary" @click="search">搜索</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
@Component
export default class StatisticsSearch extends Vue {
  @Prop([Object])
  searchParams!: any; //定义搜索数据
  //关于表单搜索的数据，必须注意的是，组件
  statisticsForm: any = this.searchParams;
  private checkName = (rule: any, value: string, callback: any) => {
    //真实姓名自定义验证规则
    if (!value) {
      return this.$refs.productName.resetField();
    } else {
      setTimeout(() => {
        //中文验证
        let re: RegExp = new RegExp("[\\u4E00-\\u9FFF]+", "g");
        if (!re.test(value)) {
          callback(new Error("请输入中文"));
        } else {
          callback();
        }
      }, 500);
    }
  };
  rules: object = {
    productName: [{ validator: this.checkName, trigger: "blur" }]
  };
  //重置表单，定义$refs保证元素能调用方法
  $refs: any = {
    statisticsForm: HTMLFormElement
  };

  //重置清空表单
  resetForm() {
    let pages = this.$route.params.pages;
    //跳转路由
    this.$refs["statisticsForm"].resetFields();
    this.$router.push({
      path: `/back/sale-statistics/1`,
      query: {}
    });
    this.$emit("clear", pages);
  }
  //搜索按钮的实现
  search(): void {
    let pages = this.$route.params.pages;
    this.$router.push({
      path: `/back/sale-statistics/${pages}`,
      query: this.statisticsForm
    });
    this.$emit("searchList");
  }
}
</script>

<style lang="scss" scoped>
.ruleForm {
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
  justify-content: space-between;
  @media (min-width: 1520px) {
    width: 1200px;
  }
  .form-item {
    width: 280px;
  }
  .btn-box {
    display: flex;
    justify-content: flex-end;
    button {
      margin-left: 30px;
    }
  }
}
</style>
