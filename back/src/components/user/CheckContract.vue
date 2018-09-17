<template>
  <div>
   
  </div>    
</template>

<script>
// export default {
//   data() {
//     return {
//       outerVisible: false,
//       innerVisible: false
//     };
//   }
// };
</script>
<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
@Component({})
export default class ContractDialog extends Vue {
  //发送http请求，获取数据。
  @Prop(Boolean)
  outerVisible!: boolean; //定义外层对话框的消息
  @Prop(Object)
  params!: object;
  get outer() {
    return this.outerVisible;
  }
  innerVisible: boolean = false;
}
</script>
