<template>
    <div class="card">
      <div class="card-body">
          <div class="line-style">
            <!-- class one-line的及之内的样式引用至 app页面 -->
            <div> 
                <span>产品名称</span> 
                <el-input v-model="productName" placeholder="请输入内容"  size="mini" clearable> </el-input> 
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
                  <el-input v-model="startingAmount" placeholder="请输入内容"  size="mini" clearable> </el-input> 
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
              <div class="deadline-select"> 
                  <span>期&#12288;&#12288;限</span> 
                  <el-input class="small-size" v-model="upperDeadline" @change="inputMatch(upperDeadline)" size="mini" clearable> </el-input> 

                    <el-select class="small-size" v-model="dayMonthSelect" clearable size="mini">
                      <el-option
                          v-for="item in dayMonth"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                      </el-option>
                    </el-select>
                  ~
                  <el-input class="small-size" v-model="lowerDeadline"  size="mini" clearable> </el-input> 

                    <el-select class="small-size" v-model="dayMonthSelect" clearable size="mini">
                      <el-option
                          v-for="item in dayMonth"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                      </el-option>
                    </el-select>
              </div>
          </div>
          <div class="line-style">
              <!-- class one-line的及之内的样式引用至 app页面 -->
              <div> 
                  <span>产品代号</span> 
                  <el-input v-model="productCode" placeholder="请输入内容"  size="mini" clearable> </el-input> 
              </div>
          </div>
          <div class="button-style">
            <el-button  type="primary" plain>搜索</el-button>
            <el-button @click="clear" type="danger">清空</el-button>
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
  productName: string = ""; /* 产品名称 */
  startDate: string = "全部"; /* 起息日期 */
  upperDate: any = ""; //结束时间
  lowerDate: any = ""; //开始时间
  startingAmount: string = ""; /* 起投金额 */
  singleStatu: string = "全部"; /* 状态 */
  dayMonthSelect: string = "日"; /* 期限选择框 */
  upperDeadline: string = ""; /* 期限上限 */
  lowerDeadline: string = ""; /* 期限下限 */
  productCode: string = ""; /* 产品代号 */
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
  dayMonth: any = [
    {
      value: "日",
      label: "日"
    },
    {
      value: "月",
      label: "月"
    }
  ];
  inputMatch(val: string) {
    console.log(val);
    let reg = /^[0-3]*$/;
    if (reg.test(val)) {
      console.log("hege");
    }
  }
  clear() {
    this.productName = ""; /* 产品名称 */
    this.startDate = "全部"; /* 起息日期 */
    this.upperDate = ""; //结束时间
    this.lowerDate = ""; //开始时间
    this.startingAmount = ""; /* 起投金额 */
    this.singleStatu = "全部"; /* 状态 */
    this.dayMonthSelect = "日"; /* 期限选择框 */
    this.upperDeadline = ""; /* 期限上限 */
    this.lowerDeadline = ""; /* 期限下限 */
    this.productCode = ""; /* 产品代号 */
  }
}
</script>
//样式三
<style lang='scss' scoped>
.card {
  margin-bottom: 20px;
} /* 搜索框下边距 */
.line-style {
  display: flex;
  & > div {
    margin: 10px 15px;
    & > span {
      margin-right: 5px;
      font-size: 14px;
    }
  }
} /* 每行样式 */
.button-style {
  text-align: right;
  margin-right: 5%;
} /* 清空搜索按钮 */

.small-size {
  display: flex;
  margin: 0 8px;
  width: 80px !important;
} /* 输入框长度 */

.deadline-select {
  @include flex-vertical-center;
} /* 期限选择 */
</style>
