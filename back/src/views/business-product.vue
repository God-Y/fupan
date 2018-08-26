<template>
<div>
    <searchProduct></searchProduct>
    <div class="box">
        <div class="addTitle">
            <span>产品列表</span>
            <span> <router-link :to="{ path: 'addProduct', query: { id: 'add' }}">+新增</router-link></span>
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
                        <td>{{item.annualizedIncome | annualized }}</td>
                        <td>{{item.deadline}}</td>
                        <td>{{item.startingAmount}}</td>
                        <td>{{item.valueDate | valueDate}}</td>
                        <td>{{item.recommend | reconmend}}</td>
                        <td :class="{success:item.shelf===0, danger:item.shelf===1}">{{item.shelf | statu}}</td>
                        <td class="handle">
                            <el-button type="text" @click="shelfOperate(item.id,item.shelf)" >
                              <a :class="{success:item.shelf===1, danger:item.shelf===0}" >{{item.shelf | shelf}}</a>
                            </el-button>
                            <a @click="jumpEdit(item.id)">编辑</a>
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
      this.list = response.data.data.list;
      console.log(this.list);
    });
  } /* 组件生成后获取HTTP请求数据 */
  jumpEdit(id: string) {
    this.$router.push({
      path: "addProduct",
      query: { id: id, statu: "edit" }
    }); /* 路由加入参数 */
  } /* 跳转至编辑页面 */
  shelfOperate(id: number, shelf: number) {
    let statu = shelf === 0 ? 0 : 1; /* 判断上下架状态 */
    // 弹窗提示
    this.$confirm("是否执行此操作?", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    })
      .then(() => {
        axios.get(`api/a/product_shelf/${id}`).then(res => {
          console.log(res);
        }); /* 点击确定发送请求 */
        this.$message({
          type: "success",
          message: "操作成功!"
        });
      })
      .catch(() => {
        this.$message({
          type: "info",
          message: "已取消"
        });
      });
  } /* 上下架功能 */
}
</script>

//样式
<style lang='scss' >
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
