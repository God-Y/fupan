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
                <transition name="fade" v-for="child in item.child" :key='child.id'>
                    <li v-show="child.visible" @click='routerJump(child.id)' >
                        {{child.name}}
                    </li>
                </transition>
            </ul> 
            <!-- 列表渲染 -->
        </div>
    </div>
</template>

<script lang='ts'>
    import {Vue, Component, Prop} from 'vue-property-decorator';
    import router from '@/router';

    @Component
    export default class backAside extends Vue {

        visible:boolean = true;
        list:Array<any> = [
            {
                id: 1,
                name: '业务管理',
                child: [
                    {
                        id: 1.1,
                        name: '用户管理',
                        visible: true
                    },
                    {
                        id: 1.2,
                        name: '实名认证',
                        visible: true
                    },
                    {
                        id: 1.3,
                        name: '产品管理',
                        visible: true
                    },
                    {
                        id: 1.4,
                        name: '债券管理',
                        visible: true
                    }                    
                ]
            },
             {
                id: 2,
                name: '业务管理',
                child: [
                    {
                        id: 2.1,
                        name: '用户管理',
                        visible: true
                    },
                    {
                        id: 2.2,
                        name: '实名认证',
                        visible: true
                    },
                    {
                        id: 2.3,
                        name: '产品管理',
                        visible: true
                    },
                    {
                        id: 2.4,
                        name: '债券管理',
                        visible: true
                    }                    
                ]
            },
        ] /* 假数据 */
        show(index: any) {

            let temp = this.list;
            temp = this.list[index].child;

            for (let num=0; num<temp.length; num++) {
                temp[num].visible = ! temp[num].visible;
            }
        } /* 点击显示、隐藏界面板 */

        routerJump(id:number) {
            console.log(id);
            switch(id){
                case 1.1:
                    router.push({name:'BusinessUser'})
                    break;
                case 1.2:
                    router.push({name:'BusinessVerified'})
                    break;
                case 1.3:
                    router.push({name:'BusinessProduct'})
                    break;
                case 1.4:
                    router.push({name:'BusinessCreditor'})
                    break;
            }
        }
    }

</script>

// 样式------------
<style lang='scss'>
    @mixin line-padding {
        padding: 0px 15px;
    } /* 每行的padding */
    $line-height:48px; /* 行高 */

    .aside{
        display: flex;
        flex-direction: column;
        & > div:nth-child(1){
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

    .fade-enter-active, .fade-leave-active {
    transition: opacity .2s;
    }
    .fade-enter, .fade-leave-to {
    opacity: 0;
    } /* 动画 */
</style>
