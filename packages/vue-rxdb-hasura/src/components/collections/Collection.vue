<template lang="pug">
div collection
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
      type: String as PropType<string | undefined>,
      required: false,
      default: undefined
    }
  },
  setup(props) {
    const componentName = computed(() => {
      console.log(
        'componentName',
        `h-collection-${props.type || props.collection.componentName()}`
      )
      return `h-collection-${props.type || props.collection.componentName()}`
    })
    return { componentName }
  }
})
</script>
