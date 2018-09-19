<template>
  <div class="card">
    <div class="card-header">申请详情</div>
    <div class="card-body">
      <user-msg :user-detial = "data"></user-msg>
      <div class="card" >
        <div class="card-header">证件信息</div>
        <div class="card-body">
          <Certificates :user-detial = "data"></Certificates>
        </div>
      </div>
      <el-button type="primary" @click="comfirm" :disabled="checkStatus">{{checkBtnMsg}}</el-button>
      <el-button @click="$router.go(-1)">返回</el-button>
    </div>
    <check-log :visible='checkVisible' :user-id ="ID" class="check-log"></check-log> 
  </div>
</template>


<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import UserMsg from "../../components/realName/check/userMsg.vue";
import Certificates from "../../components/realName/check/Certificates.vue";
import checkLog from "@/components/realName/checkStatus2.vue";
import bus from "@/bus/bus";
@Component({
  components: {
    UserMsg,
    Certificates,
    checkLog
  }
})
export default class UserDetial extends Vue {
  data: object = {}; //定义一个对象用来接收数据
  get ID() {
    return Number(this.$route.params.id);
  }
  //确定
  status: number = 0;
  //弹出框是否显示
  checkVisible: boolean = false;
  //创建实例获取数据
  created() {
    this.getList(this.ID);
  }
  //当user的status为30或者50不能点击审核
  get checkStatus() {
    if (this.status == 30 || this.status == 60 || this.status == 10) {
      return true;
    } else {
      return false;
    }
  }
  //确定按钮的信息，保证审核或者取消实名
  get checkBtnMsg() {
    if (this.status == 20) {
      return "取消实名";
    } else {
      return "审核";
    }
  }
  //定义一个请求数据的方法
  getList(id: number) {
    (this as any).$api.real.checkDetial(id).then((response: any) => {
      let data = response.data;
      if (data.code) {
        this.data = data.data;
        this.status = data.data.idAuthentication;
      }
    });
  }
  //点击确定按钮
  comfirm() {
    if (this.status == 20) {
      //调取消实名的函数
      this.cancelName(this.ID);
    } else {
      this.checkUser();
    }
  }
  //审核状态，分未认证和再申请，弹窗属性设置为true
  checkUser() {
    this.checkVisible = true;
  }
  //通过mouted 来实现中央数据总线来监听事件
  mounted() {
    bus.$on("comfirmStatus2", (data: any) => {
      this.checkVisible = false;
      let params: any = {}; //创建一个对象用于传递参数
      if (data.status == "通过") {
        params.code = 1;
        params.refusal = "";
      } else {
        params.code = 0;
        params.refusal = data.reason;
      }
      (this as any).$api.real.checkRealName(this.ID, params).then(() => {
        this.$message({
          message: "实名认证成功",
          type: "success"
        });
        //成功后跳转回列表页
        this.getList(this.ID);
      });
    });
  }
  //取消实名会弹窗
  cancelName(uid: string | number) {
    let alertMsg = `<div>
        <p>取消实名将删除用户身份信息</p>
        <h3> 确认取消？</h3></div>`;
    this.$confirm(alertMsg, "操作提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
      dangerouslyUseHTMLString: true, //设置html标签这个值为true
      center: true
    })
      //点击确定按钮
      .then(() => {
        (this as any).$api.real.verificationCancel(uid).then((res: any) => {
          this.$message({
            type: "success",
            message: "取消成功"
          });
        });
      })
      .then(() => {
        //取消成功后跳转回列表页
        this.$router.push(`/back/verifiel/1`);
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
.card {
  text-align: left;
}
.check-log {
  text-align: center;
}
</style>
