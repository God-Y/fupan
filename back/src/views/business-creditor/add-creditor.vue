<template>
    <div class="add-creditor">
        <div class="edit-title">新增/编辑</div>
        <div>
            <div class="one-line line-style">
                <!-- class one-line的及之内的样式引用至 新增产品页面 -->
                <div> 
                    <span>债权人身份证号</span> 
                    <el-input placeholder="请输入内容"  size="mini" clearable> </el-input> 
                </div>
                <div> 
                    <span>债权人</span>
                    <el-input placeholder="请输入内容"  size="mini"  clearable> </el-input> 
                </div>
                <div> 
                    <span>债券人手机号</span> 
                    <el-input placeholder="请输入内容" size="mini"  clearable> </el-input> 
                </div>
            </div>
            <!-- 第一行 -->
            <div class="one-line line-style">
                <div> 
                    <span>出借期限</span> 
                    <el-input placeholder="请输入内容"  size="mini" clearable> </el-input> 
                </div>
                <div> 
                    <span>出借日期</span>
                    <el-input placeholder="请输入内容"  size="mini"  clearable> </el-input> 
                </div>
                <div> 
                    <span>出借金额</span> 
                    <el-input placeholder="请输入内容"  size="mini"  clearable> </el-input> 
                </div>
            </div>
            <!-- 第二行 -->
             <div class="one-line line-style">
                <div> 
                    <span>债权代号</span> 
                    <el-input placeholder="请输入内容"  size="mini" clearable> </el-input> 
                </div>
                <div> 
                    <span>债权性质</span>
                    <el-input placeholder="请输入内容"  size="mini"  clearable> </el-input> 
                </div>
                <div> 
                    <span>债权年利率</span> 
                    <el-input placeholder="请输入内容"  size="mini"  clearable> </el-input> 
                </div>
            </div>
            <!-- 第三行 -->
             <div class="one-line line-style">
                <div> 
                    <span>相关备注</span> 
                    <el-input placeholder="请输入内容"  size="mini" clearable> </el-input> 
                </div>
            </div>
            <!-- 第四行 -->
            <div class="one-line line-style">
                <div> 
                    <span></span> 
                    <el-button type="primary">保存</el-button>
                    <el-button type="danger" plain>取消</el-button>
                </div>
            </div>
        </div>
    </div>
</template>


<script lang='ts'>
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class addCreditor extends Vue {}
</script>

//样式
<style scoped lang='scss'>
.add-creditor {
  border: 1px solid $light-grey;
}
.edit-title {
  padding: 15px;
  margin-bottom: 30px;
  border-bottom: 1px solid $light-grey;
}
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
