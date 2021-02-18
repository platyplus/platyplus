<template lang="pug">
div TODO property-config
</template>

<script lang="ts">
import { ContentsCollection, ContentsDocument } from '@platyplus/rxdb-hasura'
import { debouncedWatch } from '@vueuse/core'
import { toObserver, useSubscription } from '@vueuse/rxjs'
import { defineComponent, PropType, ref } from 'vue'

export default defineComponent({
  name: 'CollectionMetadataPropertyConfig',
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
