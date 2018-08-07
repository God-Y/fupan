
<template>
  <div class="home">
    <el-container>
      <el-header >
        <backHead></backHead>
        <!-- 页眉组件 -->
      </el-header>
      <el-container>
        <el-aside width="200px">
          <backAside></backAside>
          <!-- 侧边栏组件 -->
        </el-aside>
        <el-main>
          <router-view></router-view>
          <!-- 主内容区路由出口 -->
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import  backHead from '../components/backMain-header.vue';
import backAside from '../components/backMain-aside.vue';

@Component({
  components: {
  backHead,
  backAside
  }
})
export default class Home extends Vue {
  input:string = ''
}
</script>

<style scoped lang='scss'>

  .el-aside,  .el-header{
    border: 1px solid $border-color;
    border-top: none;
  } /* UI框架侧边栏、页眉 */
  
  .el-main {
    background-color: #fff;
    color: #333;
    text-align: center;
  } /* UI 框架主内容区 */
  
  .home, .el-container {
    height: 100%;
  } /* 容器 */
  
</style>
