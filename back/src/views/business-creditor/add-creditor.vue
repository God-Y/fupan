<template>
    <div>
        <div>新增/编辑</div>
        <div>
            <div class="one-line">
            <div> 
                <span></span>
                <span>债权人身份证号</span> 
                <el-input placeholder="请输入内容"  size="mini" clearable> </el-input> 
            </div>
            <div> 
                <span></span>
                <span>债权人</span>
                <el-input placeholder="请输入内容" v-model="yearIncome"  size="mini"  clearable> </el-input> 
            </div>
            <div> 
                <span></span>
                <span>债券人手机号</span> 
                <el-input placeholder="请输入内容" v-model="yearIncome"  size="mini"  clearable> </el-input> 
            </div>
            </div>
            <!-- 第一行 -->
            <div class="one-line">
                <div> 
                    <span></span>
                    <span>产品名称</span> 
                    <el-input placeholder="请输入内容"  size="mini" clearable> </el-input> 
                </div>
                <div> 
                    <span></span>
                    <span>起投金额</span>
                    <el-input placeholder="请输入内容"  size="mini"  clearable> </el-input> 
                </div>
                <div> 
                    <span></span>
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
            </div>
            <!-- 第二行 -->
            <div class="one-line deadline">
                <div> 
                    <span></span>
                    <span>期&#12288;&#12288;限</span> 
                    <el-input placeholder="请输入内容"  size="mini" clearable> </el-input> 
                </div>
                <div> 
                    <el-select v-model="selectDate" clearable size="mini" placeholder="请选择">
                        <el-option
                            v-for="item in date"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </div>
        </div>
    </div>
</template>


<script lang='ts'>

import {Vue, Component, Prop} from 'vue-property-decorator';

@Component
export default class addCreditor extends Vue {

}

</script>

//样式
<style lang='scss'>

</style>
