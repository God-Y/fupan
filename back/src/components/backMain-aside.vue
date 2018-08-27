<template>
    <div class="aside">
        <div>
            <i class="iconfont icon-house"></i>
            <span>欢迎页</span>
        </div>
        <div class="line-box" v-for="(item, index) in list" :key="item.id">
            <span @click="show(index)" class="line-title">
                <div>
                    <i class="iconfont icon-tool-"></i>
                    {{item.name}}
                </div> 
                <!-- 标题渲染 -->
                <i class="iconfont icon-arrow-left"></i>
            </span>
            <ul class="tabulation">
                <transition name="fade" v-for="child in item.child" :key="child.id">
                    <li v-show="child.visible" @click="routerJump(child.id)" >
                        {{child.name}}
                    </li>
                </transition>
            </ul> 
            <!-- 列表渲染 -->
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import router from "@/router";

@Component
export default class backAside extends Vue {
  visible: boolean = true;
  list: Array<any> = [
    {
      id: 1,
      name: "业务管理",
      child: [
        {
          id: 1.1,
          name: "用户管理",
          visible: true
        },
        {
          id: 1.2,
          name: "实名认证",
          visible: true
        },
        {
          id: 1.3,
          name: "产品管理",
          visible: true
        },
        {
          id: 1.4,
          name: "债券管理",
          visible: true
        }
      ]
    },
    {
      id: 2,
      name: "运营管理",
      child: [
        {
          id: 2.1,
          name: "内容管理",
          visible: true
        },
        {
          id: 2.2,
          name: "消息认证",
          visible: true
        },
        {
          id: 2.3,
          name: "银行管理",
          visible: true
        },
        {
          id: 2.4,
          name: "参数管理",
          visible: true
        },
        {
          id: 2.5,
          name: "版本管理",
          visible: true
        },
        {
          id: 2.6,
          name: "意见反馈",
          visible: true
        }
      ]
    },
    {
      id: 3,
      name: "后台管理",
      child: [
        {
          id: 3.1,
          name: "账户管理",
          visible: true
        },
        {
          id: 3.2,
          name: "修改密码",
          visible: true
        },
        {
          id: 3.3,
          name: "角色管理",
          visible: true
        }
      ]
    },
    {
      id: 4,
      name: "统计模块",
      child: [
        {
          id: 4.1,
          name: "销量统计",
          visible: true
        }
      ]
    }
  ]; /* 假数据 */
  show(index: any) {
    let temp = this.list;
    temp = this.list[index].child;
    for (let num = 0; num < temp.length; num++) {
      temp[num].visible = !temp[num].visible;
    }
  } /* 点击显示、隐藏界面板 */

  routerJump(id: number) {
    console.log(id);
    switch (id) {
      case 1.1:
        router.push("/back/user/1");
        break;
      case 1.2:
        router.push("/back/verifiel/1");
        break;
      case 1.3:
        router.push({ name: "BusinessProduct" });
        break;
      case 1.4:
        router.push({ name: "BusinessCreditor" });
        break;
      case 2.1:
        router.push({ name: "content" });
        break;
      case 2.2:
        router.push({ path: "message" });
        break;
      case 2.6:
        router.push({ path: "/back/option-management/1" });
        break;
      case 3.1:
        router.push("/back/back-account/1");
        break;
      case 3.2:
        router.push({ name: "ModifyPwd" });
        break;
      case 3.3:
        router.push("/back/role/1");
        break;
      case 4.1:
        router.push("/back/sale-statistics/1");
        break;
    }
  }
}
</script>

// 样式------------
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
