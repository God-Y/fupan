<template>
    <div>
      <search
      @send-search="getSearch"
      @send-clear="getClear"></search>
      <el-card class="box-card">
        <div slot="header" class="table-title">
          <span style="float: left">消息列表</span>
          <el-button @click="jumpAdd" style="float: right; padding: 3px 0" type="text">+新增</el-button>
        </div>
        <el-table :data="dataList" border class="table-style" style="width: 100%;" >
          <el-table-column type="index" label="序号" width="80" header-align="center"> 
          </el-table-column>
          <el-table-column prop="title" label="标题"   header-align="center" > </el-table-column>
          <el-table-column label="发送人群"  header-align="center"> 
            <template slot-scope="scope">
              {{scope.row.sendingCrowd | messageCrowd}}
            </template>
          </el-table-column>
          <el-table-column label="状态" header-align="center" > 
            <template slot-scope="scope">
              <span :class="scope.row.status == 10 ? 'success' : 'danger'">
                {{scope.row.status | messageStatu}}
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="editors" label="编辑者"  header-align="center"> </el-table-column>
          <el-table-column label="编辑时间"   header-align="center">
            <template slot-scope="scope">
              {{scope.row.timingTime | timeSecond}}
            </template>
          </el-table-column>
          <el-table-column prop="" label="操作" header-align="center" width="250">
            <template slot-scope="scope">
              <div class="oprate">
              <el-button @click="changeState(scope.row.id, scope.row.status)" :class="scope.row.status == 10 ? 'danger': 'success'"  size="mini">{{scope.row.status | messageJudgeStatus}}</el-button> 
              <el-button @click="deleteMsg(scope.row.id)" size="mini"  type="danger" plain>删除</el-button>
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
import search from "../../components/message/search.vue";
import Pages from "common_Components/page/pagination.vue";

@Component({
  components: {
    search,
    Pages
  }
})
export default class messageManagement extends Vue {
  dataList: Array<any> = [];
  total: number = 0; //总条数
  sendData: any = {}

  created() {
    this.getList(this.sendData);
  }
  getSearch(val: any) {
    console.log(val);
    this.sendData = val;
    this.getList(this.sendData);
  } /* 获取搜索组件的数据，再次请求列表数据 */
  getClear(val: any) {
    this.getList(this.sendData);
  } /* 获取清除命令 */
  getList(val: any) {
    let pages = this.$route.query.pages;
    console.log(pages);
    (this as any).$api.message.getList(val, pages).then((res: any) => {
      console.log(res);
      let data = res.data.data.list;
      this.dataList = data;
      console.log(this.dataList);
      this.total = res.data.data.total;
    });
  } /* 获取文章列表 */
  toPage(val: any) {
     this.$router.push({ 
       path: "/back/message",query:{
        pages: val
    }
     });
    this.getList(this.sendData);
  }
  jumpAdd() {
    this.$router.push({
      path: "messageAdd"
    });
  } /* 跳转至新增页面 */
  changeState(id: any, state: any) {
    console.log(id, state);
    let statu = state == "10" ? "0" : "10"; /* 根据当前状态来改变 */
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
        (this as any).$api.message.changeStatu(id, statu).then((res: any) => {
          console.log(res); /* 接口未痛，操作成功后再弹出提示信息 */
          if(res.data.code === 1) {
            this.$message("操作成功");
            this.getList(this.sendData);
          }
        });
      })
      .catch(() => {
        this.$message("已取消操作");
      });
  }
  deleteMsg(id: any) {
    this.$confirm(
      "确认删除吗？","提示",
      {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }
    )
      .then(() => {
        (this as any).$api.message.deleteMsg(id).then((res: any) => {
          console.log(res); /* 接口未痛，操作成功后再弹出提示信息 */
          if(res.data.code === 1) {
            this.$message("操作成功");
            this.getList(this.sendData);
          }
        });
      })
      .catch(() => {
        this.$message("已取消操作");
      });
  }
}
</script>

//样式
<style lang='scss'>
.table-title {
  padding-bottom: 15px;
}
.oprate {
  display: flex;
  justify-content: space-around;
} /* 操作 */
.success {
  color: $success !important;
}
.danger {
  color: $danger !important;
}
</style>
