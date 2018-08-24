<template>
    <div>
      <div class="card">
        <div class="card-body">
          <el-form status-icon  ref="ruleForm2">
            <div class="line-style">
                <el-form-item label="" prop="pass" size="mini">
                  <span>匹配日期&#12288;</span>
                  <el-input v-model="formData.matchDate" type="text" auto-complete="off" placeholder="请输入内容"></el-input>
                </el-form-item>
                <el-form-item prop="checkPass">
                  <span>匹配用户&#12288;</span>
                  <el-input v-model="formData.matchUser" type="text" auto-complete="off" size="mini" placeholder="请输入内容"></el-input>
                </el-form-item>
                <el-form-item prop="age" size="mini">
                  <span>到期日期&#12288;</span>
                  <DatePicker
                  :upperDate="formData.valueEndupperDate"
                  :lowerDate="formData.valueEndlowerDate"
                  @start-change="getValueEndupperDate"
                  @end-change="getValueEndlowerDate"></DatePicker>
                </el-form-item>
            </div>
            <div style="text-align:left">
                <el-form-item prop="age" size="mini">
                  <span>起息日期&#12288;</span>
                  <DatePicker
                  :upperDate="formData.valueStartupperDate"
                  :lowerDate="formData.valueStartlowerDate"
                  @start-change="getStartupperDate"
                  @end-change="getStartlowerDate"
                  ></DatePicker>
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
import { Vue, Component, Prop } from "vue-property-decorator";
import DatePicker from "../../../components/common/date/double-date.vue";

@Component({
  components: {
    DatePicker
  }
})
export default class mtachSearch extends Vue {
  formData: any = {
    valueEndupperDate: "",
    valueEndlowerDate: "",
    valueStartupperDate: "",
    valueStartlowerDate: ""
  };
  getValueEndupperDate(val: any) {
    this.formData.valueEndlowerDate = val;
  } /* 到期日期上限 */
  getValueEndlowerDate(val: any) {
    this.formData.valueEndupperDate = val;
  }
  getStartupperDate(val: any) {
    this.formData.valueStartlowerDate = val;
  } /* 起息日期上限 */
  getStartlowerDate(val: any) {
    this.formData.valueStartupperDate = val;
  }
  created() {
    this.getRouteData(); /* 获取从路由中储存的数据 */
  }
  search() {
    let id = this.$route.query.id;
    this.formData.id = id ; /* 获取的路由id 存至对象 */
    let data = this.formData;
    (this as any).$api.creditor.matchSearch(id, data).then((res: any) => {
      console.log(res);
    });
    this.$router.push({
      path: `/back/creditorMatch`,
      query: this.formData
    })
  } /* 搜索按钮 */
  clear() {
    let query: any = this.$route.query;
    let keys: any = Object.keys(query);
    keys.forEach((value: any) => {
      this.formData[value] = "";
    })
    this.$router.push({
      path: `/back/creditorMatch`,
      query: {id:query.id}
    })
  } /* 清空按钮 */
  getRouteData() {
    let query: any = this.$route.query;
    let keys: any = Object.keys(query);
    if(keys.length) {
       query.valueEndupperDate = query.valueEndupperDate
        ? Number(query.valueEndupperDate)
        : ""; //保证拿出的毫秒数是number类型
      query.valueEndlowerDate = query.valueEndlowerDate
        ? Number(query.valueEndlowerDate)
        : ""; //保证拿出的毫秒数是number类型
      query.valueStartupperDate = query.valueStartupperDate
        ? Number(query.valueStartupperDate)
        : ""; //保证拿出的毫秒数是number类型
      query.valueStartlowerDate = query.valueStartlowerDate
        ? Number(query.valueStartlowerDate)
        : ""; //保证拿出的毫秒数是number类型
      keys.forEach((value: any) => {
        this.formData[value] = query[value];
      });
    }
  } /* 获取储存在路由中的数据 */
}
</script>
//样式
<style lang='scss' scoped>
.card {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
} /* 为搜索框添加阴影 */
.input-width {
  width: 100px !important;
} /* input输入框的长度 */
.line-style {
  @include flex-vertical-between;
  flex-wrap: wrap;
  width: 100%;
  div {
    text-align: left;
  }
  span {
    margin-right: 5px;
  }
  & > div:nth-child(1) {
    flex-basis: 33%;
  }
  & > div:nth-child(2) {
    flex-basis: 33%;
  }
  & > div:nth-child(3) {
    flex-basis: 34%;
  } /* 为每行的元素分配宽度 */
} /* 搜索框每行样式 */
.button {
  text-align: right;
}
</style>
