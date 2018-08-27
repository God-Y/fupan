<template>
  <div>
    <div class="card">
      <div class="card-header">
       查看意见
      </div>
      <div class="card-body">
        <el-form ref="form" :model="advise" label-width="80px" label-position="left" class="manage-form">
          <el-form-item label="手机号">
            <el-input v-model="advise.phone" disabled></el-input>
          </el-form-item>
          <el-form-item label="姓名">
            <el-input v-model="advise.name" disabled></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="advise.email" disabled></el-input>
          </el-form-item>
          <el-form-item label="意见反馈">
            <el-input type="textarea" v-model="advise.proposal" disabled></el-input>
          </el-form-item>
        <el-form-item class="btn-box">
          <el-button type="danger" @click="deletes">删除</el-button>
          <el-button @click="$router.go(-1)">返回</el-button>
        </el-form-item>
      </el-form>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
@Component
export default class CheckAdvise extends Vue {
  //发送http请求，获取数据
  advise: any = {};
  get ID() {
    return this.$route.params.id;
  }
  //获取数据
  getAdvise() {
    (this as any).$api.option.check(this.ID).then((res: any) => {
      let data = res.data;
      if (data.code) {
        this.advise = data.data;
      }
    });
  }
  created() {
    //获取意见查看
    this.getAdvise();
  }
  //删除实名
  deletes() {
    let alertMsg = `<div>
        <p>删除将在本地删除此条建议</p>
        <h3> 确定？</h3></div>`;
    this.$confirm(alertMsg, "操作提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
      dangerouslyUseHTMLString: true, //设置html标签这个值为true
      center: true
    })
      //点击确定按钮
      .then(() => {
        (this as any).$api.option.delete(this.ID).then((res: any) => {
          this.$message({
            type: "success",
            message: "删除成功"
          });
          //取消成功后调用父级方法，更新列表.
        });
      })
      .catch(() => {
        this.$message({
          type: "info",
          message: "取消操作"
        });
      });
  }
}
</script>
<style lang="scss" scoped>
.manage-form {
  width: 80%;
  margin: 50px auto;
}
.card-header {
  text-align: left;
}
.btn-box {
  text-align: left;
}
</style>
