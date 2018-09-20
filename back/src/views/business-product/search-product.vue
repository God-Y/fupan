<template>
    <div class="card">
      <div class="card-body">
          <div class="line-style">
            <!-- class one-line的及之内的样式引用至 app页面 -->
            <div> 
                <span>产品名称</span> 
                <el-input v-model="sendData.name" placeholder="请输入内容"  size="mini" clearable> </el-input> 
            </div>
            <div> 
                <span>起息日期</span>
                <el-select v-model="sendData.valueDate" clearable size="mini" placeholder="请选择">
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
              <!-- <DatePicker
              :lowerDate="sendData.lowerAnnualizedIncome"
              :upperDate="sendData.upperAnnualizedIncome"
              @start-change="getStart"
              @end-change="getEnd"
              ></DatePicker> -->
                <el-input class="small-size" v-model="lowerAnnualizedIncome" size="mini" clearable> </el-input> 
                ~
                <el-input class="small-size" v-model="upperAnnualizedIncome" size="mini" clearable> </el-input> 
                %
            </div>
          </div>
          <div class="line-style">
              <!-- class one-line的及之内的样式引用至 app页面 -->
              <div> 
                  <span>起投金额</span> 
                  <el-input v-model="sendData.startingAmount" placeholder="请输入内容"  size="mini" clearable> </el-input> 
              </div>
              <div> 
                  <span>状&#12288;&#12288;态</span>
                  <el-select v-model="sendData.isShelf" clearable size="mini" placeholder="请选择">
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
                  <el-input class="small-size" v-model="sendData.lowerDeadline" size="mini" clearable> </el-input> 

                    <el-select class="small-size" v-model="dayMonthSelect" clearable size="mini">
                      <el-option
                          v-for="item in dayMonth"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                      </el-option>
                    </el-select>
                  ~
                  <el-input class="small-size" v-model="sendData.upperDeadline"  size="mini" clearable> </el-input> 

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
                  <el-input v-model="sendData.productCode" placeholder="请输入内容"  size="mini" clearable> </el-input> 
              </div>
          </div>
          <div class="button-style">
            <el-button @click="search" type="primary" plain>搜索</el-button>
            <el-button @click="clear" type="danger">清空</el-button>
          </div>
        </div>
    </div>
</template>


<script lang='ts'>
import { Vue, Component, Prop, Emit } from "vue-property-decorator";
import DatePicker from "../../components/common/date/double-date.vue";

@Component({
  components: {
    DatePicker
  }
})
export default class searchProduct extends Vue {
  sendData: any = {};
  dayMonthSelect: any = 1;
  lowerAnnualizedIncome: any = "";
  upperAnnualizedIncome: any = "";
  created() {
    let query: any = this.$route.query;
    let keys: any = Object.keys(query);
    if (keys.length) {
      keys.forEach((value: any) => {
        this.sendData[value] = query[value];
      });
      console.log(this.sendData);
    }
  }
  mounted() {
    let query: any = this.$route.query;
    let keys: any = Object.keys(query);
    if (keys.length) {
      keys.forEach((value: any) => {
        this.sendData[value] = query[value];
      });
      console.log(this.sendData);
      this.sendSearch(this.sendData);
    }
  } //发送保存的搜索数据
  @Emit()
  sendSearch(val: any) {}
  @Emit()
  sendClear(val: any) {}

  startOptions: any = [
    {
      value: 0,
      label: "全部"
    },
    {
      value: 10,
      label: "正常"
    },
    {
      value: 20,
      label: "已冻结"
    }
  ];
  status: any = [
    {
      value: 2,
      label: "全部"
    },
    {
      value: 0,
      label: "停售"
    },
    {
      value: 1,
      label: "在售"
    }
  ];
  dayMonth: any = [
    {
      value: 1,
      label: "日"
    }
  ];
  search() {
    if (this.dayMonthSelect) console.log(this.sendData);
    if (this.lowerAnnualizedIncome || this.upperAnnualizedIncome) {
      if (!Number(this.lowerAnnualizedIncome || this.upperAnnualizedIncome)) {
        this.$message("期限必须是数字");
        return false;
      } else {
        this.sendData.upperAnnualizedIncome = this.upperAnnualizedIncome / 100;
        this.sendData.lowerAnnualizedIncome = this.lowerAnnualizedIncome / 100;
      }
    } //把年化收益转换一下
    if (this.sendData.lowerDeadline || this.sendData.upperDeadline) {
      if (
        !Number(this.sendData.lowerDeadline) ||
        !Number(this.sendData.upperDeadline)
      ) {
        this.$message("期限必须是数字");
        return false;
      }
    }
    this.$router.push({
      path: "/back/product",
      query: this.sendData
    });
    this.sendSearch(this.sendData);
  }
  clear() {
    let keys = Object.keys(this.sendData);
    keys.forEach((value: any) => {
      this.sendData[value] = "";
    }); /* 表单中的数据清零 */
    this.lowerAnnualizedIncome = "";
    this.upperAnnualizedIncome = "";
    this.$router.push({
      path: "/back/product"
    });
    this.sendClear("");
  }
}
</script>
//样式三
<style lang='scss' scoped>
.el-input {
  width: 200px !important;
}
.card {
  margin-bottom: 20px;
} /* 搜索框下边距 */

.line-style {
  margin-bottom: 20px;
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
    flex-basis: 28%;
  }
  & > div:nth-child(2) {
    flex-basis: 28%;
  }
  & > div:nth-child(3) {
    flex-basis: 44%;
    text-align: left;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  } /* 为每行的元素分配宽度 */
} /* 搜索框每行样式 */
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
