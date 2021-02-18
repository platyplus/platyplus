<template lang="pug">
component(v-if="document" :is="componentName" :document="document")
span(v-else) loading...
</template>

<script lang="ts">
import { ContentsDocument } from '@platyplus/rxdb-hasura'
import { computed, defineComponent, PropType } from 'vue'
export default defineComponent({
  name: 'Document',
  props: {
    document: {
      type: Object as PropType<ContentsDocument>,
      required: false,
      default: undefined
    },
    type: {
      type: String as PropType<string | undefined>,
      required: false,
      default: undefined
    }
  },
  setup(props) {
    const componentName = computed(
      () => `h-document-${props.type || props.document.componentName()}`
    )
    return { componentName }
  }
})
</script>
