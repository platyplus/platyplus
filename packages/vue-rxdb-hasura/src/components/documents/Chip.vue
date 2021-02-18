<template lang="pug">
.p-chip.p-component.p-mr-2.p-mb-1
  .p-chip-text {{label}}
</template>

<script lang="ts">
import { ContentsDocument } from '@platyplus/rxdb-hasura'
import { defineComponent, PropType, toRefs } from 'vue'

import { useDocumentLabel } from '../../composables'

export default defineComponent({
  name: 'DocumentChip',
  props: {
    document: {
      type: Object as PropType<ContentsDocument>,
      default: null
    }
  },
  setup(props) {
    const { document } = toRefs(props)
    const label = useDocumentLabel(document)
    return { label }
  }
})
</script>
