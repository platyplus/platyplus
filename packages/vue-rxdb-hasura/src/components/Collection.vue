<template lang="pug">
component(:is="componentName" :collection="collection")
</template>

<script lang="ts">
import { ContentsCollection } from '@platyplus/rxdb-hasura'
import { computed, defineComponent, PropType } from 'vue'
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
    const componentName = computed(() => `h-collection-${props.type}`)
    return { componentName }
  }
})
</script>
