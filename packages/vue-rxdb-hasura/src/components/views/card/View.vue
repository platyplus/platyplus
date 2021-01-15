<template lang="pug">
DataView(:value="documents" :layout="layout")
  template(#header)
    div.p-grid.p-nogutter
      div.p-col-6(style="text-align: left")
        Dropdown(v-model="sortKey" :options="sortOptions" optionLabel="label" placeholder="Sort By Price" @change="onSortChange($event)")
      div.p-col-6.p-text-right
        div.p-d-inline-flex
          div.p-mr-3
            router-link.p-md-4(v-if="collection.canInsert()" :to="{ name: 'newDocument', params: { collection: collection.name}}")
              button.p-button.p-button-icon-only
                i.pi.pi-plus
          DataViewLayoutOptions(v-model="layout")
  template(#list='slotProps')
    .p-col-12.p-nogutter
      router-link.p-col-12(:to="{ name: 'document', params: { collection: collection.name, id: slotProps.data.primary }}")
        Card.p-m-1
          template(#title)
            h-document-label(:document="slotProps.data" layout="label")

  template(#grid='slotProps')
    router-link.p-col-4.p-md-4(:to="{ name: 'document', params: { collection: collection.name, id: slotProps.data.primary }}")
      h-document(:document="slotProps.data" layout="card")
</template>

<script lang="ts">
import { ContentsCollection, ContentsDocument } from '@platyplus/rxdb-hasura'
import { defineComponent, PropType, ref } from 'vue'

export default defineComponent({
  name: 'CollectionCard',
  props: {
    collection: {
      type: Object as PropType<ContentsCollection>,
      default: null
    },
    documents: {
      type: Object as PropType<ContentsDocument[]>,
      default: []
    }
  },
  setup() {
    const layout = ref('list')
    const sortKey = ref()
    const sortOptions = ref()
    return { layout, sortKey, sortOptions }
  }
})
</script>

<style>
.p-list-list-wrapper {
  overflow: auto;
}
.p-list-list {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
.p-list-item {
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
</style>
