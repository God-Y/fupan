<template>
    <div>
        <div class="one-line line-style">
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
              <el-input placeholder="请输入内容" size="mini"  clearable> </el-input> 
          </div>
        </div>
        <div class="one-line line-style">
            <!-- class one-line的及之内的样式引用至 app页面 -->
            <div> 
                <span>起投金额</span> 
                <el-input placeholder="请输入内容"  size="mini" clearable> </el-input> 
            </div>
            <div> 
                <span>状态</span>
                <el-input placeholder="请输入内容"  size="mini"  clearable> </el-input> 
            </div>
            <div> 
                <span>期限</span> 
                <el-input placeholder="请输入内容" size="mini"  clearable> </el-input> 
            </div>
        </div>
         <div class="one-line line-style">
            <!-- class one-line的及之内的样式引用至 app页面 -->
            <div> 
                <span>产品代号</span> 
                <el-input placeholder="请输入内容"  size="mini" clearable> </el-input> 
            </div>
        </div>
    </div>
</template>


<script lang='ts'>
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class searchProduct extends Vue {
  startDate: string = "全部";
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
}
</script>
//样式三
<style lang='scss' scoped>
.line-style {
  & > div {
    & > span:nth-child(1) {
      color: #000;
      width: 30%;
      text-align: left;
      font-size: 14px;
    }
  }
}
</style>
