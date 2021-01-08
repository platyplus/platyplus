<template lang="pug">
div {{label}}
</template>

<script lang="ts">
import { ContentsDocument } from '@platyplus/rxdb-hasura'
import { defineComponent, PropType, toRefs } from 'vue'

import { useDocumentLabel } from '../composables'

export default defineComponent({
  name: 'DocumentLabel',
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
