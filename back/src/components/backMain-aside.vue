<template>
    <div class="aside">
        <div>
            <i class="iconfont icon-house"></i>
            <span>欢迎页</span>
        </div>
        <div class="line-box" v-for="(item,index) in asideList" :key="item.id">
            <span @click="show(index)" class="line-title">
                <div>
                    <i class="iconfont icon-tool-"></i>
                    {{item.name}}
                </div> 
                <!-- 标题渲染 -->
                <i class="iconfont icon-arrow-left"></i>
            </span>
            <ul class="tabulation" >
                <transition name="fade" v-for="child in item.permissionsList" :key="child.id">
                    <li @click="routerJump(child.id)" v-show="child.visible">
                        {{child.permission}}
                    </li>
                </transition>
            </ul> 
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import router from "@/router";

@Component
export default class backAside extends Vue {
  visible: boolean = true;
  asideList: any = JSON.parse(localStorage.getItem("modulars"));
  show(index: any) {
    const temp = this.asideList[index].permissionsList;
    temp.forEach(value => {
      value.visible = !value.visible;
    });
  } /* 点击显示、隐藏界面板 */

  routerJump(id: number) {
    console.log(id);
    switch (id) {
      case 1:
        router.push("/back/user/1");
        break;
      case 2:
        router.push("/back/verifiel/1");
        break;
      case 3:
        router.push({ name: "BusinessProduct" });
        break;
      case 4:
        router.push({ name: "BusinessCreditor" });
        break;
      case 11:
        router.push({
          name: "content",
          query: {
            pages: "1"
          }
        });
        break;
      case 12:
        router.push({
          path: "message",
          query: {
            pages: "1"
          }
        });
        break;
      case 13:
        router.push({ name: "bank" });
        break;
      case 14:
        router.push({ name: "parameter" });
        break;
      case 16:
        router.push({ path: "/back/option-management/1" });
        break;
      case 31:
        router.push("/back/back-account/1");
        break;
      case 32:
        router.push({ name: "ModifyPwd" });
        break;
      case 33:
        router.push("/back/role/1");
        break;
      case 21:
        router.push("/back/sale-statistics/1");
        break;
    }
  }
}
</script>

<style lang="scss">
@mixin line-padding {
  padding: 0px 15px;
} /* 每行的padding */
$line-height: 48px; /* 行高 */

.aside {
  display: flex;
  flex-direction: column;
  & > div:nth-child(1) {
    @include flex-vertical;
    flex-wrap: wrap;
    @include line-padding();
    min-height: $line-height;
    border-bottom: 1px solid $border-color;
    cursor: pointer;
    i {
      margin-right: 5px;
      font-size: 18px;
    }
  } /* 欢迎页 */
}

.line-box {
  border-bottom: 1px solid $border-color;
} /* 每一栏的下边框 */

.line-title {
  @include flex-vertical-between;
  @include line-padding();
  cursor: pointer;
  flex-basis: 100%;
  min-height: $line-height;
  border-bottom: 1px solid $border-color;
  i {
    font-size: 17px;
  }
} /* 标题 */

.tabulation {
  @include flex-vertical-center;
  flex-wrap: wrap;
  flex-basis: 100%;
  li {
    @include flex-vertical-center;
    flex-basis: 100%;
    min-height: $line-height;
    font-size: 15px;
    border-bottom: 1px solid #f0f0f0;
    cursor: pointer;
  }
} /* 行内容 */

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
} /* 动画 */
</style>
