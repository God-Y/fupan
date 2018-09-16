<template>
    <div class="header">
        <div>
            <p>{{userMsg.roleName}}</p>
        </div>
        <span>|</span>
        <div>
            <i class="iconfont icon-caigoutonggerenbangaobaozhenzhucedenglu17"></i>
            <p>{{userMsg.name}}</p>
        </div>
        <span>|</span>
        <div>
            <p @click="loginout">logout</p>
        </div>
    </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class backHead extends Vue {
  user: string = "admin"; /* 通过后台渲染用户 */
  userMsg: any = JSON.parse(localStorage.getItem("backUser"));
  loginout() {
    this.$confirm("确定退出账户?", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    })
      .then(() => {
        (this as any).$api.user.loginOut().then(() => {
          localStorage.removeItem("backUser");
          localStorage.removeItem("modulars");
          localStorage.removeItem("isLogin");
          this.$store.commit("loginOut");
          this.$message({
            type: "success",
            message: "退出登陆!"
          });
          setTimeout(() => {
            this.$router.push("/");
          }, 500);
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

<style lang='scss'>
.header {
  @include flex-vertical-end;
  height: 100%;
  & > div {
    @include flex-vertical;
    margin: 0 10px;
    padding: 0 15px;
    height: 100%;
    cursor: pointer;
    & > i {
      margin-right: 5px;
    }
  }
  & :hover {
    background: #f0f0f0;
  }
}
</style>
