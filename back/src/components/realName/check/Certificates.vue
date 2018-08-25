<template>
  <el-form  label-width="84px" class="ruleForm center-form">
  <!-- 用户编号 -->
    <el-form-item label="身份证正面"  align="left">
      <img :src="userMsg.idFront" alt="" class="idImg">
      <div class="nullMsg" v-if="!userMsg.idFront">无有效信息</div>
    </el-form-item>
    <el-form-item label="身份证反面" class="backId" align="left">
      <img :src="userMsg.idBack" alt="" class="idImg">
      <div class="nullMsg" v-if="!userMsg.idBack">无有效信息</div>
    </el-form-item>
      <!-- 拒绝理由为空时，不显示拒绝理由的选项 -->
     <el-form-item label="拒绝理由" v-if="userMsg.refusal">
       <el-input type="textarea" v-model="userMsg.refusal" :disabled="true"
         class="reason-item"
       ></el-input>
    </el-form-item>
  </el-form>
</template>


<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
@Component
export default class Certificates extends Vue {
  @Prop([Object])
  userDetial!: object;
  //定义一个计算属性属性，用来接收父级传过来的属性值
  get userMsg() {
    return this.userDetial;
  }
}
</script>

<style lang="scss" scoped>
.card {
  text-align: left;
}
.ruleForm {
  display: flex;
  flex-wrap: wrap;
  @media (min-width: 1520px) {
    width: 1200px;
  }
  .backId {
    margin-left: 60px;
  }
  .idImg {
    width: 283px;
  }
  .reason-item {
    width: 280px;
    height: 150px;
    color: #000;
  }
}
</style>
