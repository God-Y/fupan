<template>
<div>
    <searchProduct></searchProduct>
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
                        <td>{{item.productCode}}</td>
                        <td>{{item.name}}</td>
                        <td>{{item.annualizedIncome}}</td>
                        <td>{{item.deadline}}</td>
                        <td>{{item.startingAmount}}</td>
                        <td>{{valueDate(item.valueDate)}}</td>
                        <td>{{reconmend(item.recommend)}}</td>
                        <td :class="{success:item.shelf===0, danger:item.shelf===1}">{{statu(item.shelf)}}</td>
                        <td class="handle">
                            <a :class="{success:item.shelf===1, danger:item.shelf===0}">{{shelf(item.shelf)}}</a>
                            <a>编辑</a>
                        </td>
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
import axios from "axios";
import searchProduct from "./business-product/search-product.vue"; /*  */

@Component({
  components: {
    searchProduct
  }
})
export default class BusinessProduct extends Vue {
  list: any[] = [];
  created() {
    axios.get("/api/a/list/investment-product").then(response => {
      console.log(response);
      this.list = response.data.data.list;
      console.log(this.list);
    });
  } /* 组件生成后获取HTTP请求数据 */
  valueDate(value: number) {
    switch (value) {
      case 10:
        return "T+0";
      case 20:
        return "T+1";
      case 30:
        return "T+2";
    }
  } /* 起息日期 */
  reconmend(value: number) {
    switch (value) {
      case 0:
        return "不推荐";
      case 1:
        return "推荐";
    }
  } /* 推荐 */
  statu(value: number) {
    switch (value) {
      case 0:
        return "在售";
      case 1:
        return "停售";
    }
  } /* 状态判断 */
  shelf(value: number) {
    switch (value) {
      case 0:
        return "下架";
      case 1:
        return "上架";
    }
  } /* 上下架 */
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
  & > span:nth-child(2) {
    & > a {
      color: $blue;
    }
    cursor: pointer;
  }
}
/* 新增title */
.handle {
  @include flex-vertical-between;
  justify-content: space-around;
  a {
    cursor: pointer;
  }
  a:nth-child(2) {
    color: $blue;
  }
}
/* 操作 */
.success {
  color: $success;
}
.danger {
  color: $danger;
}
</style>
