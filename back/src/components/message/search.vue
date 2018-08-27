<template>
    <div>
        <div class="card">
        <div class="card-body">
          <el-form status-icon  ref="ruleForm2">
            <div class="line-style">
                <el-form-item prop="pass" size="mini">
                  <span>标题</span>
                  <el-input v-model="data.title" type="text" auto-complete="off" placeholder="请输入内容"></el-input>
                </el-form-item>
                <el-form-item>
                  <span>编辑者</span>
                  <el-input v-model="data.redactor" type="text" auto-complete="off" size="mini" placeholder="请输入内容"></el-input>
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
            </div>
            <div class="line-style">
                <el-form-item  size="mini">
                  <span>状态</span>
                  <el-select v-model="data.status" placeholder="请选择">
                    <el-option label="上线" value="10"></el-option>
                    <el-option label="草稿" value="0"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item  size="mini">
                  <span>类型&#12288;</span>
                  <el-select v-model="data.type" placeholder="请选择">
                    <el-option label="所有人" value="20"></el-option>
                    <el-option label="认证投资人" value="30"></el-option>
                  </el-select>
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
  sendSearch(data: any) {}

  @Emit()
  sendClear(data: any) {}
  search() {
    this.$router.push({
      path: `/back/content`,
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
      path: `/back/content`
    }); /* 清空路由 */
    this.sendClear("");
  } /* 清除 */
}
</script>

//样式
<style lang='scss' scoped>
.card {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
} /* 为搜索框添加阴影 */
.el-input {
  width: 200px !important;
}
.input-width {
  width: 100px !important;
} /* input输入框的长度 */
.line-style {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  div {
    text-align: left;
  }
  span {
    margin-right: 10px;
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
