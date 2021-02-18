<template lang="pug">
p-data-view(:value="documents" :type="type")
  template(#header)
    div.p-grid.p-nogutter
      div.p-col-6(style="text-align: left")
        span.p-input-icon-left.p-input-icon-right
          i.pi.pi-search
          p-input-text(placeholder="Search" v-model="filter" type="text")
          i.pi.pi-times(v-show="filter" @click="filter = ''")
      div.p-col-6.p-text-right
        div.p-d-inline-flex
          div.p-mr-3
            router-link.p-md-4(v-if="collection.canInsert()" :to="{ name: 'newDocument', params: { collection: collection.name}}")
              button.p-button.p-button-icon-only
                i.pi.pi-plus
          p-data-view-layout-options(v-model="type")
  template(#list='slotProps')
    .p-col-12.p-nogutter
      router-link.p-col-12(:to="{ name: 'document', params: { collection: collection.name, id: slotProps.data.primary }}")
        p-card.p-m-1
          template(#title)
            h-document(:document="slotProps.data" type="label")
  template(#grid='slotProps')
    router-link.p-col-4.p-md-4(:to="{ name: 'document', params: { collection: collection.name, id: slotProps.data.primary }}")
      h-document(:document="slotProps.data" type="card")
</template>

<script lang="ts">
import { ContentsCollection, ContentsDocument } from '@platyplus/rxdb-hasura'
import { debouncedWatch } from '@vueuse/core'
import { toObserver, useSubscription } from '@vueuse/rxjs'
import { defineComponent, PropType, ref } from 'vue'

export default defineComponent({
  name: 'CollectionCard',
  props: {
    collection: {
      type: Object as PropType<ContentsCollection>,
      default: null
    }
  },
  setup(props) {
    const type = ref('list')
    const sortKey = ref()
    const filter = ref()
    const documents = ref<ContentsDocument[]>([])
    debouncedWatch(
      () => filter.value,
      val => {
        useSubscription(
          props.collection
            .find({
              selector: { label: { $regex: new RegExp(val, 'i') } }
            })
            .sort('label')
            .$.subscribe(toObserver(documents))
        )
      },
      { immediate: true, debounce: 300 }
    )
    return { type, sortKey, filter, documents }
  }
})
</script>

<style></style>
