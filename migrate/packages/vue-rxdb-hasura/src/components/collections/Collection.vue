<template lang="pug">
component(:is="componentName" v-bind="props")
</template>

<script lang="ts">
import { ContentsCollection, ContentsDocument } from '@platyplus/rxdb-hasura'
import { MangoQuery } from 'rxdb'
import { computed, defineComponent, PropType } from 'vue'
export default defineComponent({
  name: 'Collection',
  props: {
    collection: {
      type: Object as PropType<ContentsCollection>,
      required: true
    },
    type: {
      type: String as PropType<string | undefined>,
      required: false,
      default: undefined
    },
    query: {
      type: Object as PropType<MangoQuery<ContentsDocument>>,
      default: () => ({})
    }
  },
  setup(props) {
    const componentName = computed(
      () => `h-collection-${props.type || props.collection.componentName()}`
    )
    return { props, componentName }
  }
})
</script>
