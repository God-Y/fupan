//  后台 header
<template>
    <div class="header">
        <div>
            <p>管理员</p>
        </div>
        <span>|</span>
        <div>
            <i class="iconfont icon-caigoutonggerenbangaobaozhenzhucedenglu17"></i>
            <p>{{user}}</p>
        </div>
        <span>|</span>
        <div>
            <p>logout</p>
        </div>
    </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class backHead extends Vue {

    user: string = 'admin'; /* 通过后台渲染用户 */

}

</script>

<style lang='scss'>

.header{
    @include flex-vertical-end;
    height: 100%;
    & > div{
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
