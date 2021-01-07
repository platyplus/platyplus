<template lang="pug">
component(:is="componentName" :documents="documents" :collection="collection")
</template>

<script lang="ts">
import { toObserver, useSubscription } from '@vueuse/rxjs'
import { RxCollection, RxDocument } from 'rxdb'
import { computed, defineComponent, PropType, ref } from 'vue'

export default defineComponent({
  name: 'Collection',
  props: {
    collection: {
      type: Object as PropType<RxCollection>,
      required: true
    },
    type: {
      type: String,
      default: 'table'
    }
  },
  setup(props) {
    const documents = ref<RxDocument[]>([])
    useSubscription(
      // TODO not sure it's optimised at all
      props.collection.find().$.subscribe(toObserver(documents))
    )
    const componentName = computed(() => `collection-${props.type}`)
    return { documents, componentName }
  }
})
</script>
