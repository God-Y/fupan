<template>
<div class="date-box">
  <date-pickers placeholder="起始日期" v-model="start" 
  :not-after="end ||new Date() " width="150"
  @change="startChanged" ></date-pickers>
  ~
  <date-pickers placeholder="结束日期" v-model="end" 
    :not-before="start" :not-after="new Date()" width="150"
    @change="endChanged"
  ></date-pickers>
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
  //对计算属性设置set 方法
  set start(newValue: any) {}
  get end() {
    return this.upperDate;
  }
  set end(newValue: any) {}

  //组件向去父级传参
  @Emit() //开始时间向父级传值
  startChange(upperDateNum: number | string) {}
  @Emit() //结束时间向父级传值
  endChange(endDateNum: number | string) {}

  //开始change事件传参
  startChanged(val: Date) {
    //设定开始时间的变量
    if (val) {
      console.log(val);
      let upperDateNum: number = val.valueOf();
      this.startChange(upperDateNum);
    } else if (val == null) {
      let value = "";
      this.startChange(value);
    }
  }

  //结束change事件传值
  endChanged(val: Date) {
    //设定结束时间的变量
    if (val) {
      let endNumber: number = val.valueOf() + 8.64e6 - 1;
      this.endChange(endNumber);
    } else if (val == null) {
      let value = "";
      this.endChange(value);
    }
  }
}
</script>
//样式
<style lang='scss' scoped>
.date-box {
  display: inline-block;
}
</style>
