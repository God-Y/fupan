<template>
  <div>
    <check-search :search-params = "userForm" @searchList ="search"
      @clearParams = "clear"
    ></check-search>
    <check-table :table-params = "list" 
    :loading="listLoading" :total = "total"
    ></check-table>
  </div>
</template>


<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import CheckSearch from "../../components/realName/list/checkForm.vue";
import CheckTable from "../../components/realName/list/checkTable.vue";
@Component({
  components: {
    CheckSearch,
    CheckTable
  }
})
export default class RealList extends Vue {

}
</script>

<style lang="scss" scoped>
</style>
