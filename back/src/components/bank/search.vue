<template>
    <div>
        <div class="card">
        <div class="card-body">
          <el-form :model="data" :rules="rules" status-icon class="form-style" ref="ruleForm2">
                <el-form-item prop="pass" size="mini">
                  <span>银行名称</span>
                  <el-input v-model="data.bankName" type="text" auto-complete="off" placeholder="请输入内容"></el-input>
                </el-form-item>
                <el-form-item>
                  <span>编辑者&#12288;&#12288;</span>
                  <el-input v-model="data.modifier" type="text" auto-complete="off" size="mini" placeholder="请输入内容"></el-input>
                </el-form-item>
                <el-form-item  size="mini">
                  <span>编辑时间</span>
                  <DatePicker
                  :upperDate="data.upperDate"
                  :lowerDate="data.lowerDate"
                  @start-change="getupperDate"
                  @end-change="getlowerDate"
                  ></DatePicker>
                </el-form-item>
                <div style="display:flex">
                  <el-form-item prop="lowerSingleLimit" ref="lowerSingleLimit" size="mini">
                    <span>单笔限额</span>
                    <el-input v-model="data.lowerSingleLimit" type="text" class="small-size" auto-complete="off" placeholder="请输入上限"></el-input> ~
                  </el-form-item>
                  <el-form-item prop="upperSingleLimit" ref="upperSingleLimit" size="mini">
                    &#12288;<el-input v-model="data.upperSingleLimit" type="text" class="small-size" auto-complete="off" placeholder="请输入下限"></el-input>
                  </el-form-item>
                </div>
                <div style="display:flex">
                  <el-form-item prop="lowerDailyLimit" ref="lowerDailyLimit" size="mini">
                    <span>日累计限额</span>
                    <el-input v-model="data.lowerDailyLimit" type="text" class="small-size" auto-complete="off" placeholder="请输入内容"></el-input> ~
                  </el-form-item>
                  <el-form-item prop="upperDailyLimit" ref="upperDailyLimit" size="mini">
                    &#12288;<el-input v-model="data.upperDailyLimit" type="text" class="small-size" auto-complete="off" placeholder="请输入内容"></el-input>
                  </el-form-item>
                </div>
                <el-form-item class="button">
                  <el-button type="primary" @click="search">搜索</el-button>
                  <el-button type="danger" @click="clear">清空</el-button>
                </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
</template>


<script lang='ts'>
import { Vue, Component, Prop, Emit } from "vue-property-decorator";
import DatePicker from "../common/date/double-date.vue";
@Component({
  components: {
    DatePicker
  }
})
export default class search extends Vue {
  data: any = {
    upperDate: "",
    lowerDate: ""
  };
  getupperDate(val: any) {
    this.data.lowerDate = val;
  } /* 获取时间 */
  getlowerDate(val: any) {
    this.data.upperDate = val;
  } /* 获取时间 */
  $refs: any;
  checklowerSingle: any = (rule: any, value: any, callback: any) => {
    let num = +this.data.upperSingleLimit;
    value = +value;
    if (!value) {
      return this.$refs.lowerSingleLimit.resetField();
    } else if (!Number(value) || value > num) {
      callback(new Error("请输入，数值不能大于下限值"));
    } else {
      callback();
    }
  }; /* 校验单笔限额上线 */
  checkUpperSingle: any = (rule: any, value: any, callback: any) => {
    let num = +this.data.lowerSingleLimit;
    value = +value;
    if (!value) {
      return this.$refs.upperSingleLimit.resetField();
    } else if (!Number(value) || value < num) {
      callback(new Error("请输入，数值不能小于下限值"));
    } else {
      callback();
    }
  }; /* 校验单笔限额 下限 */
  checkLowerDailyLimit: any = (rule: any, value: any, callback: any) => {
    let num = +this.data.upperDailyLimit;
    value = +value;
    if (!value) {
      return this.$refs.lowerDailyLimit.resetField();
    } else if (!Number(value) || value > num) {
      callback(new Error("请输入，数值不能大于下限值"));
    } else {
      callback();
    }
  }; /* 校验日累计 上限 */

  checkUpperDailyLimit: any = (rule: any, value: any, callback: any) => {
    let num = +this.data.lowerDailyLimit;
    value = +value;
    if (!value) {
      return this.$refs.upperDailyLimit.resetField();
    } else if (!Number(value) || value < num) {
      callback(new Error("请输入，数值不能小于下限值"));
    } else {
      callback();
    }
  }; /* 校验日累计 下限 */

  rules: any = {
    lowerSingleLimit: [{ validator: this.checklowerSingle, bigger: "blur" }],
    upperSingleLimit: [{ validator: this.checkUpperSingle, bigger: "blur" }],
    lowerDailyLimit: [{ validator: this.checkLowerDailyLimit, bigger: "blur" }],
    upperDailyLimit: [{ validator: this.checkUpperDailyLimit, bigger: "blur" }]
  };
  created() {
    let query: any = this.$route.query;
    let keys: any = Object.keys(query);
    if (keys.length) {
      query.lowerDate = query.lowerDate ? Number(query.lowerDate) : ""; //保证拿出的毫秒数是number类型
      query.upperDate = query.upperDate ? Number(query.upperDate) : ""; //保证拿出的毫秒数是number类型
      keys.forEach((value: any) => {
        this.data[value] = query[value];
      });
    }
  }
  @Emit()
  sendSearch(data: any) {} /* 向父级发送请求数据 */

  @Emit()
  sendClear(data: any) {} /* 向父级发送清空请求 */
  search() {
    this.$router.push({
      path: `/back/bank`,
      query: this.data
    });
    this.sendSearch(this.data);
  } /* 搜索 */

  clear() {
    let keys = Object.keys(this.data);
    keys.forEach((value: any) => {
      this.data[value] = "";
    }); /* 表单中的数据清零 */
    this.$router.push({
      path: `/back/bank`
    }); /* 清空路由 */
    this.sendClear("");
  } /* 清除 */
}
</script>

//样式
<style lang='scss' scoped>
.form-style {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  span {
    margin-right: 10px;
  }
}
.card {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
} /* 为搜索框添加阴影 */
.el-input {
  width: 200px !important;
}
.small-size {
  width: 120px !important;
} /* 输入框长度 */
.button {
  display: flex;
  flex-basis: 390px;
  justify-content: flex-end;
}
</style>
