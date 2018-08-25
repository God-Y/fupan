<template>
  <div>
    <div class="card">
      <div class="card-body">
        <el-form :model="userForm" ref="userForm1" label-width="80px" class="ruleForm">
          <!-- 产品名称 -->
          <el-form-item label="产品名称"  width="150px">
            <el-input type="tel" v-model="userForm.productName" auto-complete="off"></el-input>
          </el-form-item>
          <!-- 姓名 -->
          <el-form-item label="交易类型" prop="status">
            <el-select v-model="userForm.type" placeholder="全部" >
              <el-option label="回款" value="1"></el-option>
              <el-option label="付款" value="-1"></el-option>
            </el-select>
          </el-form-item>
          <!-- 日期组件 -->
           <el-form-item label="交易时间" prop="idName" ref="idName">
            <date
              :upperDate="userForm.upperDate"
              :lowerDate="userForm.lowerDate"
              @start-change="getStart"
              @end-change="getEnd"
            ></date>
          </el-form-item>
          <el-form-item label="交易状态" prop="status">
            <el-select v-model="userForm.status" placeholder="全部" >
              <el-option label="成功" value="10"></el-option>
              <el-option label="失败" value="20"></el-option>
              <el-option label="回款中" value="30"></el-option>
            </el-select>
          </el-form-item>
          <!-- 搜索清空那按钮 -->
          <el-form-item class="btn-box">
            <el-button type="danger" @click="resetForm('userForm1')">清空</el-button>
            <el-button type="primary" @click="search">搜索</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="card">
      <div class="card-header">
        用户列表
      </div>
      <div class="card-body">
        <!-- 表格渲染开始 -->
        <el-table
          :data="dealData"
          border
          style="width: 100%"
          v-loading="listLoading"
          >
          <el-table-column
            type="index"
            label="用户编号"
            width="80"
            align="center"  
          >
          </el-table-column>
          <el-table-column
            label="注册日期"
            width="100"  align="center" >
            <template slot-scope="scope" >
              {{scope.row.gmtCreate|time}}
            </template>
          </el-table-column>
          <el-table-column
            prop="phone"    width="140"
            label="手机号"  align="center" >
          </el-table-column>
          <el-table-column
            prop="idName"     width="80"
            label="真实姓名"  align="center" > 
          </el-table-column>
          <el-table-column
            prop="tradingFlowNumber"
            label="交易流水"  align="center" >
          </el-table-column>
          <el-table-column
            prop="productName" width="90"
            label="产品名称"  align="center" >
          </el-table-column>
          <el-table-column
            label="交易金额（元）" width="120"  align="center" >
            <template slot-scope="scope">
              {{scope.row.amount}}
            </template>
          </el-table-column>
          <el-table-column
            label="交易类型"  width="78" align="center" >
            <template slot-scope="scope">
              <span :class="'status'+scope.row.status">
                {{scope.row.type|dealType}}
              </span>
            </template>
          </el-table-column>
          <el-table-column label="交易状态"  width="78" align="center" >
            <template slot-scope="scope">
              <span :class="'status'+scope.row.status">
                {{scope.row.status|dealStatus}}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            prop="bankName" width="85"
            label="交易银行"  align="center" >
          </el-table-column>
        </el-table>
        <pages :total-num="total"  @page-change="toPage" v-if="dealData.length"></pages>    
        <div class="nullMsg" v-if="!dealData.length">无有效信息</div>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import Date from "common_Components/date/double-date.vue";
import Pages from "common_Components/page/pagination.vue";
@Component({
  components: {
    Date,
    Pages
  }
})
export default class DealRecode extends Vue {
  //发送http请求，获取数据
  dealData: Array<object> = [];
  ID: string = ""; //获取用户ID
  total: number = 0; //用来获取数据的总数
  //可以表格加载动画
  listLoading: boolean = true;
  //关于表单搜索的数据，必须注意的是，组件
  userForm: any = {
    upperDate: "",
    lowerDate: ""
  };
  //获取用户页数
  get pages() {
    return this.$route.params.pages;
  }
  created() {
    this.ID = this.$route.params.id; //赋值路由参数id
    let query: any = this.$route.query; //获取查询参数
    let keys = Object.keys(query);
    if (keys.length) {
      //应对第一次刷新，不需要赋值
      query.upperDate = query.upperDate ? Number(query.upperDate) : ""; //保证拿出的毫秒数是number类型
      query.lowerDate = query.lowerDate ? Number(query.lowerDate) : ""; //保证拿出的毫秒数是number类型
      keys.forEach(value => {
        //foreach循环
        this.userForm[value] = query[value]; //赋值给查询对象
      });
    }
    this.getList(); //请求数据
  }

  //定义一个请求数据的方法
  getList() {
    //发送http请求
    (this as any).$api.user
      .getDeal(this.ID, this.userForm, this.$route.params.pages)
      .then((response: any) => {
        let data = response.data;
        if (data.code) {
          this.dealData = data.data.list;
          this.total = data.data.total;
        }
      })
      .then(() => {
        //获取后加载动画取消
        this.listLoading = false;
      });
  }
  //从子级取到开始时间值
  getStart(value: any) {
    this.userForm.lowerDate = value;
  }
  //从子级取到开始时间值
  getEnd(value: any) {
    this.userForm.upperDate = value;
  }
  //重置清空表单
  resetForm() {
    (this as any).userForm = {
      upperDate: "",
      lowerDate: ""
    };
    this.$router.push(`/back/user-deal/${this.ID}/1`);
    //等于1 的时候，搜索,上面的路由参数已经变成1了
    if (this.pages == "1") {
      this.getList();
    }
  }
  //搜索按钮的实现
  search(): void {
    this.$router.push({
      path: `/back/user-deal/${this.ID}/${this.pages}`,
      query: this.userForm
    });
    this.getList();
  }
  //页码跳转
  toPage(val: number) {
    this.$router.push(`/back/user-deal/${this.ID}/${val}`);
    this.getList();
  }
}
</script>

<style lang="scss" scoped>
.ruleForm {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  @media (min-width: 1520px) {
    width: 1200px;
  }
  .btn-box {
    flex-basis: 398px;
    display: flex;
    justify-content: flex-end;
    button {
      margin-left: 30px;
    }
  }
}
.card-header {
  text-align: left;
}
.status20 {
  color: #f56c6c;
}
.status10 {
  color: #67c23a;
}
.status30 {
  color: #409eff;
}
</style>
