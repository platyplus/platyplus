<template lang="pug">
component(:is="componentName" :documents="documents" :collection="collection")
</template>

<script lang="ts">
import { ContentsCollection, ContentsDocument } from '@platyplus/rxdb-hasura'
import { toObserver, useSubscription } from '@vueuse/rxjs'
import { computed, defineComponent, PropType, ref } from 'vue'
export default defineComponent({
  name: 'Collection',
  props: {
    collection: {
      type: Object as PropType<ContentsCollection>,
      required: true
    },
    type: {
      type: String,
      default: 'table'
    }
  },
  setup(props) {
    // TODO not sure it's optimised
    const documents = ref<ContentsDocument[]>([])
    useSubscription(
      props.collection.find().sort('label').$.subscribe(toObserver(documents))
    )
    const componentName = computed(() => `collection-${props.type}`)
    return { documents, componentName }
  }
})
</script>
