<template>
    <div class="card">
      <div class="card-body">
          <div class="line-style">
            <!-- class one-line的及之内的样式引用至 app页面 -->
            <div> 
                <span>产品名称</span> 
                <el-input placeholder="请输入内容"  size="mini" clearable> </el-input> 
            </div>
            <div> 
                <span>起息日期</span>
                <el-select v-model="startDate" clearable size="mini" placeholder="请选择">
                  <el-option
                      v-for="item in startOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                  </el-option>
                </el-select>
            </div>
            <div> 
              <span>年化收益</span> 
              <DatePicker
              :upperDate="upperDate"
              :lowerDate="lowerDate"
              @start-change="getStart"
              @end-change="getEnd"
              ></DatePicker>
            </div>
          </div>
          <div class="line-style">
              <!-- class one-line的及之内的样式引用至 app页面 -->
              <div> 
                  <span>起投金额</span> 
                  <el-input placeholder="请输入内容"  size="mini" clearable> </el-input> 
              </div>
              <div> 
                  <span>状&#12288;&#12288;态</span>
                  <el-select v-model="singleStatu" clearable size="mini" placeholder="请选择">
                  <el-option
                      v-for="item in status"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                  </el-option>
                </el-select>
              </div>
              <div> 
                  <span>期&#12288;&#12288;限</span> 
                  <el-input placeholder="请输入内容" size="mini"  clearable> </el-input> 
              </div>
          </div>
          <div class="line-style">
              <!-- class one-line的及之内的样式引用至 app页面 -->
              <div> 
                  <span>产品代号</span> 
                  <el-input placeholder="请输入内容"  size="mini" clearable> </el-input> 
              </div>
          </div>
          <div class="button-style">
            <el-button  type="primary" plain>搜索</el-button>
            <el-button type="danger">清空</el-button>
          </div>
        </div>
    </div>
</template>


<script lang='ts'>
import { Vue, Component, Prop } from "vue-property-decorator";
import DatePicker from "../../components/common/date/double-date.vue";

@Component({
  components: {
    DatePicker
  }
})
export default class searchProduct extends Vue {
  startDate: string = "全部"; /* 起息日期 */
  singleStatu: string = "全部"; /* 状态 */
  upperDate: any = ""; //结束时间
  lowerDate: any = ""; //开始时间
  getStart(value: number) {
    //从子级取到开始时间值
    this.lowerDate = value;
  }
  getEnd(value: number) {
    //从子级取到开始时间值
    this.upperDate = value;
  }
  startOptions: any = [
    {
      value: "全部",
      label: "全部"
    },
    {
      value: "正常",
      label: "正常"
    },
    {
      value: "已冻结",
      label: "已冻结"
    }
  ];
  status: any = [
    {
      value: "全部",
      label: "全部"
    },
    {
      value: "停售",
      label: "停售"
    },
    {
      value: "在售",
      label: "在售"
    }
  ];
}
</script>
//样式三
<style lang='scss' scoped>
.card {
  margin-bottom: 20px;
}
.line-style {
  display: flex;
  & > div {
    margin: 10px 15px;
    & > span {
      margin-right: 5px;
      font-size: 14px;
    }
  }
}
.button-style {
  text-align: right;
  margin-right: 5%;
}
</style>
