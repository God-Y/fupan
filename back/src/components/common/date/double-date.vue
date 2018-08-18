<template>
<div class="date-box">
  <date-pickers placeholder="起止日期" v-model="start" @change="startChanged"></date-pickers>
  ~
  <date-pickers placeholder="结束日期" v-model="end" @change="endChanged"></date-pickers>
</div> 
</template>

<script lang='ts'>
import { Vue, Component, Prop, Emit } from "vue-property-decorator";
import DatePickers from "vue2-datepicker";
// import { constants } from 'http2';

@Component({
  components: {
    DatePickers
  }
})
export default class DatePicker extends Vue {
  @Prop([String, Number])
  upperDate!: string | Date | number; //定义结束搜索时间
  @Prop([String, Number])
  lowerDate!: string | Date | number; //定义开始搜索时间
  //定义两个区间因为要改变，所以不能使用prop，使用计算属性
  get start() {
    return this.lowerDate;
  }
  get end() {
    return this.upperDate;
  }

  //组件向去父级传参
  @Emit() //开始时间向父级传值
  startChange(upperDateNum: number) {}
  @Emit() //结束时间向父级传值
  endChange(endDateNum: number) {}

  //开始change事件传参
  startChanged(val: Date) {
    //设定开始时间的变量
    let upperDateNum: number = val.valueOf();
    this.startChange(upperDateNum);
  }

  //结束change事件传值
  endChanged(val: Date) {
    //设定结束时间的变量
    let endNumber: number = val.valueOf() + 8.64e6 - 1;
    this.endChange(endNumber);
  }
}
</script>
//样式
<style lang='scss' scoped>
.date-box {
  display: inline-block;
}
</style>
