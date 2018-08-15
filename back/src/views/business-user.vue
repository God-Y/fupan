<template>
    <div class="user-list card">
      <div class="card-body">
        <div class="top-form">
          <div>
            手机号码
            <input type="text">
          </div>
          <div>
            真实姓名
            <input type="text">
          </div>
          <date 
          :upperDate="upperDate"
          :lowerDate="lowerDate"
          @start-change="getStart"
          @end-change="getEnd"
          ></date>
        </div> 
      </div>
    </div>
</template>


<script lang='ts'>
import { Vue, Component, Prop } from "vue-property-decorator";
import Date from "common_Components/date/double-date.vue";
@Component({
  components: {
    Date
  }
})
export default class BusinessUser extends Vue {
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
}
</script>
<style lang='scss' scoped>
.top-form {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
input {
  margin-left: 5px;
}
</style>
