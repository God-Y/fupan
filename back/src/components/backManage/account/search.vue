<template>
  <div>
    <div class="card">
      <div class="card-body">
        <el-form :model="userForm" ref="userForm1" label-width="96px" class="ruleForm">
          <!-- 产品名称 -->
          <el-form-item label="角色名" class="" prop="status" >
            <el-select v-model="userForm.roleName" placeholder="全部"  class="input-item">
              <el-option :label="item.roleName" :value="item.roleName" v-for ="item in roleList" :key="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="用户名"  class="form-item">
            <el-input type="tel" v-model="userForm.name" auto-complete="off"></el-input>
          </el-form-item>
          <!-- 搜索清空那按钮 -->
          <el-form-item class="btn-box ">
            <el-button type="danger" @click="resetForm">清空</el-button>
            <el-button type="primary" @click="search">搜索</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
@Component
export default class AccountSearch extends Vue {
  @Prop([Object])
  searchParams!: any; //定义搜索数据
  //关于表单搜索的数据，必须注意的是，组件
  userForm: any = this.searchParams;
  roleList: object[] = [];
  getRoles(pages: any = 1) {
    (this as any).$api.backRoles.all().then((res: any) => {
      let data = res.data;
      if (data.code) {
        this.roleList = data.data;
      }
    });
  }
  created() {
    this.getRoles();
  }
  //重置清空表单
  resetForm() {
    let pages = this.$route.params.pages;
    //跳转路由
    this.$router.push({
      path: `/back/back-account/1`,
      query: {}
    });
    this.$emit("clear");
  }
  //搜索按钮的实现
  search(): void {
    let pages = this.$route.params.pages;
    this.$router.push({
      path: `/back/back-account/${pages}`,
      query: this.userForm
    });
    this.$emit("searchList");
  }
}
</script>

<style lang="scss" scoped>
.ruleForm {
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
  justify-content: space-between;
  @media (min-width: 1520px) {
    width: 1200px;
  }
  .form-item {
    width: 280px;
  }
  .btn-box {
    display: flex;
    justify-content: flex-end;
    button {
      margin-left: 30px;
    }
  }
}
</style>
