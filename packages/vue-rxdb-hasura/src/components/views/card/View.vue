<template lang="pug">
DataView(:value="documents" :layout="layout" :paginator="true" :rows="9")
  template(#header)
    div.p-grid.p-nogutter
      div.p-col-6(style="text-align: left")
        Dropdown(v-model="sortKey" :options="sortOptions" optionLabel="label" placeholder="Sort By Price" @change="onSortChange($event)")
      div.p-col-6(style="text-align: right")
        DataViewLayoutOptions(v-model="layout")
  template(#list='slotProps')
    .p-col-12
      .p-col-12
        router-link.p-md-4(:to="{ name: 'document', params: { collection: collection.name, id: slotProps.data.primary }}")
          Card.p-m-1
            template(#title)
              DocumentLabel(:document="slotProps.data")
  template(#grid='slotProps')
    router-link.p-col-4.p-md-4(:to="{ name: 'document', params: { collection: collection.name, id: slotProps.data.primary }}")
      Card.p-m-1
        template(#title)
          // TODO get the link from the parent component
          DocumentLabel(:document="slotProps.data")

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
    const layout = ref('grid')
    const sortKey = ref()
    const sortOptions = ref()
    return { layout, sortKey, sortOptions }
  }
})
</script>
<style lang="scss" scoped>
.product-grid-item {
  margin: 0.5em;
  border: 1px solid #dee2e6;
}
</style>
>
