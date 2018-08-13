<template>
    <div class="box">
        <div class="addTitle">
            <span>产品列表</span>
            <span> <router-link to="addProduct">+新增</router-link></span>
        </div>
        <!-- 新增 -->
        <div class='listBox'>
            <table>
                <thead>
                    <tr id="listTitle">
                        <th>产品代号</th>
                        <th>产品名称</th>
                        <th>年华收益率（%）</th>
                        <th>期限</th>
                        <th>起投金额（元）</th>
                        <th>起息日期</th>
                        <th>推荐</th>
                        <th>状态</th>
                        <th>操作</th>
                    </tr>
                    <tr v-for="item in list" :key="item.id">
                        <td>{{item.code}}</td>
                        <td>{{item.name}}</td>
                        <td>{{item.rate}}</td>
                        <td>{{item.deadline}}</td>
                        <td>{{item.start}}</td>
                        <td>{{item.startdate}}</td>
                        <td>{{item.commend}}</td>
                        <td>{{item.state}}</td>
                        <td class="handle">
                            <a>{{item.type}}</a>
                            <a>{{item.edit}}</a>
                        </td>
                    </tr>
                </thead>
            </table>
            <!-- 列表 -->
        </div>
    </div>
</template>


<script lang='ts'>

import {Vue, Component, Prop} from 'vue-property-decorator';
import DatePicker from '../components/date-picker.vue';

@Component({
    components:{
        DatePicker, /* 日期组件 */
    }
})
export default class BusinessProduct extends Vue {

    list:any = [
        {
            code:'XSB',
            name:'新手体验计划',
            rate:'12.00',
            deadline:'1月',
            start:'10,000.00',
            startdate:'T+0',
            commend:'精品推荐',
            state:'在售',
            type:'下架',
            edit:'编辑'
        }
    ]
}

</script>

//样式
<style lang='scss'>

    @mixin border-style {
    border: 1px solid $border-color;
    } /* 边框样式 */

    .box {
        @include border-style();
    } 

    .addTitle {
        @include flex-vertical-between;
        @include list-style();
        border-bottom: 1px solid $border-color;
        font-size: 14px;
        & > span:nth-child(2){
            color: blue;
            cursor: pointer;
        }
    } /* 新增title */

   .listBox {
       padding: 10px;
       font-size: 14px;
       table {
            width: 100%;
            border-collapse: collapse;
            border-top: none;
            tr {
                @include list-style();
                @include border-style();
            } /* 表格样式 */
            tr:nth-child(1) {
                background: $header-bg-grey;
            } /* 表头 */
            td {
                min-height: 40px;
                max-width: 280px;
            } /*  */
       }
   }

   .handle {
       @include flex-vertical-between;
       justify-content: space-around;
       a{
           cursor: pointer;
       }
       a:nth-child(2) {
        color: blue;           
       }
   } /* 操作 */
   
</style>
