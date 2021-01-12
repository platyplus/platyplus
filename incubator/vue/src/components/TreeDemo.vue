<template>
  <div class="p-grid">
    <div class="p-col-12">
      <div class="card">
        <h5>Tree</h5>
        <Tree
          v-model:selectionKeys="selectedTreeValue"
          :value="treeValue"
          selection-mode="checkbox"
        ></Tree>
      </div>
    </div>
    <div class="p-col-12">
      <div class="card">
        <h5>TreeTable</h5>
        <TreeTable
          v-model:selectionKeys="selectedTreeTableValue"
          :value="treeTableValue"
          selection-mode="checkbox"
        >
          <template #header> FileSystem </template>
          <Column field="name" header="Name" :expander="true"></Column>
          <Column field="size" header="Size"></Column>
          <Column field="type" header="Type"></Column>
        </TreeTable>
      </div>
    </div>
  </div>
</template>

<script>
import NodeService from '../service/NodeService'

export default {
  data() {
    return {
      treeValue: null,
      selectedTreeValue: null,
      treeTableValue: null,
      selectedTreeTableValue: null
    }
  },
  nodeService: null,
  created() {
    this.nodeService = new NodeService()
  },
  mounted() {
    this.nodeService.getTreeNodes().then(data => (this.treeValue = data))
    this.nodeService
      .getTreeTableNodes()
      .then(data => (this.treeTableValue = data))
  }
}
</script>

<style scoped></style>
