<template>
<div class="bg-box">
    <div>
        <form >
            <input v-model="name" type="text" placeholder="please enter your name">
            <input v-model='password' type="password" placeholder="please enter your password">
            <button type="button" v-on:click='submit' >Login</button>
        </form>
    </div>
</div>
</template>

<script lang='ts'>
import { Component, Vue, Provide } from "vue-property-decorator";
import axios from "axios";

@Component
export default class login extends Vue {
  name: string = "";
  password: string = "";
  data: any = {};
  submit(): boolean {
    let user = {
      name: this.name,
      password: this.password
    };
    (this as any).$api.user.login(user).then((res: any) => {
      console.log(res);
      this.$router.push({ name: "backend" });
    });
    return false;
  }
  /* 暂时使用任务6-10的接口来测试反向代理和请求，此数据需要更改 */
}
</script>

<style scoped lang="scss">
/* 加上scoped属性是为了把css的属性限制在这个组件中 */
.bg-box {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background: url(https://i.loli.net/2018/08/06/5b67cc71c2563.jpg) no-repeat
    center;
  background-size: cover;
  /* 背景图片 */
  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 30px;
    width: 500px;
    height: 310px;
    background: rgba(0, 0, 0, 0.7);
    input {
      margin: 10px 0;
      padding: 3px 10px;
      height: 30px;
      transition: border 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
      background: #fff;
      border-radius: 4px;
      border: 1px solid #dcdee2;
      font-size: 12px;
      &:hover,
      &:focus {
        border-color: #57a3f3;
      }
    } /* input 输入框样式 */
    button {
      margin: 10px 0;
      height: 40px;
      font-size: 13px;
      color: #fff;
      background: #2d8cf0;
      border-radius: 4px;
      border: 1px;
      outline: none;
      &:hover {
        background: #57a3f3;
      }
    } /* 登录框按钮 */
  }
}
</style>
