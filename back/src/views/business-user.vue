<template>
    <div>
        <p>用户管理</p>
        <Date></Date>
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
export default class BusinessUser extends Vue {}
</script>
//样式
<style lang='scss'>
</style>
