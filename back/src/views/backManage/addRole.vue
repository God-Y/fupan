<template>
  <div>
    <div class="card">
      <div class="card-header">
        {{title}}角色
      </div>
      <div class="card-body">
        <el-form :model="Roler" label-position="left" label-width="100px" class="manage-form">
          <el-form-item label="角色名" class="role-name"  prop="rolenName">
            <el-input v-model="Roler.roleName" :disabled="nameUse" ></el-input>
          </el-form-item>
          <el-form-item label="业务管理" prop="type">
            <el-checkbox-group v-model="Roler.permissions">
              <el-checkbox 
                v-for="item in list1" :key="item.id"
                :label="item.id" name="type">{{item.permission}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="运营管理" prop="type">
            <el-checkbox-group v-model="Roler.permissions">
              <el-checkbox 
                v-for="item in list2" :key="item.id"
                :label="item.id" name="type">{{item.permission}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="统计管理" prop="type">
            <el-checkbox-group v-model="Roler.permissions">
              <el-checkbox 
                v-for="item in list3" :key="item.id"
                :label="item.id" name="type">{{item.permission}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="后台管理" prop="type">
            <el-checkbox-group v-model="Roler.permissions">
              <el-checkbox 
                v-for="item in list4" :key="item.id"
                :label="item.id" name="type">{{item.permission}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item align="left">
            <el-button type="primary"
             @click="submit()"
             :disabled="!submitUse"
             >确定</el-button>
            <el-button @click="$router.go(-1)">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
@Component
export default class ManageRole extends Vue {
  //设置一个字符串，确定是新增还是
  title: string = "";
  //编辑页不可以编辑用户名
  nameUse: boolean = false;
  //定义发送的数据
  Roler: any = {
    roleName: "",
    permissions: []
  };
  allRoles: any = [];
  // 业务管理
  list1: any = [
    { permission: "用户管理", id: 1 },
    { permission: "实名认证", id: 2 },
    { permission: "产品管理", id: 3 },
    { permission: "债券管理", id: 4 }
  ];
  // 运营管理
  list2: any = [
    { permission: "内容管理", id: 11 },
    { permission: "消息管理", id: 12 },
    { permission: "银行管理", id: 13 },
    { permission: "参数管理", id: 14 },
    { permission: "意见反馈", id: 15 }
  ];
  // 销量统计
  list3: any = [{ permission: "销量统计", id: 21 }];
  // 后台管理
  list4: any = [
    { permission: "账户管理", id: 31 },
    { permission: "修改密码", id: 32 },
    { permission: "角色管理", id: 33 }
  ];

  get msg() {
    //计算属性获取值
    return this.$route.params.msg;
  }
  //提交按钮在没有输入的时候不能点击
  get submitUse() {
    let lengthBoolean = this.Roler.permissions.length > 0;
    return this.Roler.roleName && lengthBoolean;
  }
  //根据id获取相关账户的角色相关信心
  getRoleMsg() {
    let ID = this.$route.params.id;
    (this as any).$api.backRoles.getRoleMsg(ID).then((res: any) => {
      let data = res.data;
      console.log(data);
      this.Roler.permissions = data.data.permissionsId;
      this.Roler.roleName = data.data.roleName;
    });
  }
  //所有的角色
  getAll() {
    (this as any).$api.backRoles.getAllRole().then((res: any) => {
      let data = res.data;
      if (data.code) {
        this.allRoles = data.data;
      }
    });
  }
  created() {
    //获取角色信息
    this.getAll();
    if (this.msg == "add") {
      this.title = "新增";
    } else if (this.msg == "edit") {
      this.nameUse = true;
      this.title = "编辑";
      this.getRoleMsg();
    }
  }
  //提交按钮
  submit() {
    //新增账户的逻辑，发送http请求
    if (this.msg == "add") {
      (this as any).$api.backRoles.addRole(this.Roler).then((res: any) => {
        if (res.data.code) {
          //成功
          this.$message({
            message: "新增成功，返回用户列表页",
            type: "success"
          });
          setTimeout(() => {
            this.$router.go(-1);
          }, 1000);
        } else {
          //失败，重置表单
          this.$message({
            message: res.data.message,
            type: "error"
          });
        }
      });
    }
    //编辑用户逻辑
    if (this.msg == "edit") {
      let ID = this.$route.params.id;
      (this as any).$api.backRoles.editRole(ID, this.Roler).then((res: any) => {
        if (res.data.code) {
          //成功
          this.$message({
            message: "编辑成功，返回角色列表",
            type: "success"
          });
          setTimeout(() => {
            this.$router.go(-1);
          }, 1000);
        } else {
          //失败，重置表单
          this.$message({
            message: res.data.message,
            type: "error"
          });
        }
      });
    }
  }
}
</script>
<style lang="scss" scoped>
.manage-form {
  text-align: left;
}
.card-header {
  text-align: left;
}
.role-name {
  width: 400px;
}
</style>
