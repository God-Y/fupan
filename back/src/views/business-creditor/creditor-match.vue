<template>
    <div>
        <div class="box">
            <div class="addTitle">
                <span>LTZ1的债权匹配（出借时间：2016-11-07~2016-12-07，出借金额：500,000.00元，剩余待匹金额：0.00元）</span>
                <span> <router-link to="addProduct">匹配</router-link></span>
            </div>
            <!-- 新增 -->
            <div class='listBox'>
                <table>
                    <thead>
                        <tr id="listTitle">
                            <th>出借合同编号</th>
                            <th>债权协议编号</th>
                            <th>匹配用户</th>
                            <th>匹配产品</th>
                            <th>起息日期</th>
                            <th>到期日期</th>
                            <th>投资金额（元）</th>
                        </tr>
                        <tr v-for="item in list" :key="item.id">
                            <td>{{item.code}}</td>
                            <td>{{item.name}}</td>
                            <td>{{item.rate}}</td>
                            <td>{{item.deadline}}</td>
                            <td>{{item.start}}</td>
                            <td>{{item.startdate}}</td>
                            <td>{{item.commend}}</td>
                        </tr>
                    </thead>
                </table>
                <!-- 列表 -->
            </div>
        </div>
    </div>
</template>


<script lang='ts'>
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class creditorMatch extends Vue {
  list: any = [
    {
      code: "XSB",
      name: "新手体验计划",
      rate: "12.00",
      deadline: "1月",
      start: "10,000.00",
      startdate: "T+0",
      commend: "精品推荐",
      state: "在售",
      type: "下架",
      edit: "编辑"
    }
  ];
}
</script>

//样式
<style lang='scss'>
</style>
