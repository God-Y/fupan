<template>
    <div>
      <search
      @send-search="getSearch"
      @send-clear="getClear"></search>
      <el-card class="box-card">
        <div slot="header" class="table-title">
          <span style="float: left">内容列表</span>
          <el-button @click="jumpAdd" style="float: right; padding: 3px 0" type="text">+新增</el-button>
        </div>
        <el-table :data="dataList" border class="table-style" style="width: 100%;" >
          <el-table-column type="index" label="序号" width="80" header-align="center"> 
          </el-table-column>
          <el-table-column prop="title" label="标题"   header-align="center" > </el-table-column>
          <el-table-column label="类型"  header-align="center"> 
            <template slot-scope="scope">
              {{scope.row.type | contentType}}
            </template>
          </el-table-column>
          <el-table-column label="状态" header-align="center" > 
            <template slot-scope="scope">
              <span :class="scope.row.state == 10 ? 'success' : 'danger'">
                {{scope.row.state | contentStatu}}
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="editors" label="编辑者"  header-align="center"> </el-table-column>
          <el-table-column label="编辑时间"   header-align="center"> 
          </el-table-column>
          <el-table-column prop="" label="操作" header-align="center" width="250">
            <template slot-scope="scope">
              <div class="oprate">
              <el-button @click="changeState(scope.row.id, scope.row.state)" :class="scope.row.state == 10 ? 'danger': 'success'"  size="mini">{{scope.row.state | oprateStatu}}</el-button> 
              <el-button  size="mini" @click="jumpEdit(scope.row.id, scope.row.state)">编辑</el-button> 
              <el-button  size="mini"  type="danger" plain>删除</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
</template>


<script lang='ts'>
import { Vue, Component, Prop } from "vue-property-decorator";
import search from "../../components/content/search.vue";

@Component({
  components: {
    search
  }
})
export default class contentManagement extends Vue {
  dataList: Array<any> = [];

  created() {
    this.getList("");
  }
  getSearch(val: any) {
    this.getList(val);
  } /* 获取搜索组件的数据，再次请求列表数据 */
  getClear(val: any) {
    this.getList("");
  } /* 获取清除命令 */
  getList(val: any) {
    (this as any).$api.content.getList(val).then((res: any) => {
      console.log(res);
      let data = res.data.data.list;
      this.dataList = data;
      console.log(this.dataList);
    });
  } /* 获取文章列表 */

  jumpAdd() {
    this.$router.push({
      path: "contentEdit"
    });
  } /* 跳转至新增页面 */
  changeState(id: any, state: any) {
    let statu = state == "10" ? "20" : "10"; /* 根据当前状态来改变 */
    this.$confirm(
      statu == "10"
        ? "上线将在前台展示此内容,确认上线？"
        : "下线将使前台不再展示此内容，确认下线？",
      "提示",
      {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }
    )
      .then(() => {
        (this as any).$api.content.changeStatu(id, statu).then((res: any) => {
          console.log(res); /* 接口未痛，操作成功后再弹出提示信息 */
          this.$router.go(0); /* 操作成功刷新一下路由 */
        });
      })
      .catch(() => {
        this.$message("已取消操作");
      });
  }
  jumpEdit(id: any, statu: any) {
    this.$router.push({
      path: "contentEdit",
      query: { id: id, statu: statu }
    });
  } /* 跳转至编辑页面 */
}
</script>

//样式
<style lang='scss'>
.table-title {
  padding-bottom: 15px;
}
.oprate {
  display: flex;
  justify-content: space-between;
} /* 操作 */
.success {
  color: $success !important;
}
.danger {
  color: $danger !important;
}
</style>
