<template>
     <div class="box">
        <div class="addTitle">
            <span>债权列表</span>
            <span> <router-link to="addCreditor">+新增</router-link></span>
        </div>
        <!-- 新增 -->
        <div class='listBox'>
            <table>
                <thead>
                    <tr id="listTitle">
                        <th>债券代号</th>
                        <th>债权人</th>
                        <th>债权人手机</th>
                        <th>债权人身份证号码</th>
                        <th>出借期限（月）</th>
                        <th>出借日期</th>
                        <th>到期日期</th>
                        <th>出借金额（元）</th>
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
                        <td>{{item.statu}}</td>
                        <td class="handle">
                            <a><router-link to="creditorMatch">{{item.type}}</router-link></a>
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

@Component
export default class BusinessCreditor extends Vue {
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
            statu:'使用中',
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
