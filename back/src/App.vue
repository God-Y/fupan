<template>
  <div id="app">
    <router-view/> <!-- 路由出口 -->
  </div>
</template>

<style lang="scss">

@import './assets/style/reset/normalize'; /* 导入reset样式 */


#app {
  height: 100%;
}

 @mixin border-style {
    border: 1px solid $border-color;
    } /* 边框样式 */
.listBox {
       padding: 10px;
       font-size: 14px;
       table {
            width: 100%;
            border-collapse: collapse;
            border-top: none;
            tr {
                @include list-style();
                @include border-style();
            } /* 表格样式 */
            tr:nth-child(1) {
                background: $header-bg-grey;
            } /* 表头 */
            td {
                min-height: 40px;
                max-width: 280px;
            } /*  */
       }
   } /* 列表页表格样式 */

.one-line {
        @include flex-vertical-between;
        margin-bottom: 30px;
        & > div {
            @include flex-vertical-between;
            justify-content: flex-start;
            flex-basis: 33.33%;
                span {
                    margin: 0 10px;
                    white-space: nowrap;
                } /* 输入框 左边字体 */
        }
    } /* 新增页面 每一行三个元素时的样式 */

    .el-input {
        width: 200px !important;
    } /* 输入框长度 */

</style>

/*  */