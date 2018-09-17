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
            <template slot-scope="scope">
              {{scope.row.gmtUpdate | time}}
            </template>
          </el-table-column>
          <el-table-column prop="" label="操作" header-align="center" width="250">
            <template slot-scope="scope">
              <div class="oprate">
              <el-button @click="changeState(scope.row.id, scope.row.state)" :class="scope.row.state == 10 ? 'danger': 'success'"  size="mini">{{scope.row.state | oprateStatu}}</el-button> 
              <el-button  size="mini" @click="jumpEdit(scope.row.id, scope.row.state)">编辑</el-button> 
              <el-button @click="deleteContent(scope.row.id)" size="mini"  type="danger" plain>删除</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <pages :total-num="total"  @page-change="toPage" v-if="total>10"></pages>    
      </el-card>
    </div>
</template>


<script lang='ts'>
import { Vue, Component, Prop } from "vue-property-decorator";
import search from "../../components/content/search.vue";
import Pages from "common_Components/page/pagination.vue";

@Component({
  components: {
    search,
    Pages
  }
})
export default class contentManagement extends Vue {
  dataList: Array<any> = [];
  sendData: any = {}
  total: number = 0; //总条数
  created() {
    this.getList(this.sendData);
  }
  getSearch(val: any) {
    console.log(val);
    this.sendData = val;
    console.log(this.sendData);
    this.getList(this.sendData);
  } /* 获取搜索组件的数据，再次请求列表数据 */
  getClear(val: any) {
    this.getList(this.sendData);
      this.$router.push({ 
       path: "/back/content",query:{
        pages: "1"
      }
    });
  } /* 获取清除命令 */
  getList(val: any) {
    let pages = this.$route.query.pages;
    console.log(pages);
    (this as any).$api.content.getList(val, pages).then((res: any) => {
      console.log(res);
      let data = res.data.data.list;
      this.dataList = data;
      this.total = res.data.data.total;
      console.log(this.dataList);
    });
  } /* 获取文章列表 */
  toPage(val: any) {
     this.$router.push({ 
       path: "/back/content",query:{
        pages: val
    }
     });
    this.getList(this.sendData);
  }
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
          if(res.data.code === 1) {
            this.getList(this.sendData);
          }
        });
      })
      .catch(() => {
        this.$message("已取消操作");
      });
  }
  deleteContent(id: any) {
     this.$confirm(
      "是否删除？",
      "提示",
      {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }
    ).then(() => {
        (this as any).$api.content.deleteContent(id).then((res: any) => {
          console.log(res); /* 接口未痛，操作成功后再弹出提示信息 */
          if(res.data.code === 1) {
            this.getList(this.sendData);
          }
        });
      })
      .catch(() => {
        this.$message("已取消操作");
      });
  }
  jumpEdit(id: any, statu: any) {
    this.$router.push({
      path: "contentEdit",
      query: { id: id }
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
