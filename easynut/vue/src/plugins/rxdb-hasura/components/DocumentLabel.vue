<template lang="pug">
div {{label}}
</template>

<script lang="ts">
import { RxDocument } from 'rxdb'
import { defineComponent, PropType } from 'vue'

import { useDocumentLabel } from '../composables'
export default defineComponent({
  name: 'DocumentLabel',
  props: {
    document: {
      type: Object as PropType<RxDocument<Record<string, unknown>>>,
      default: null
    }
  },
  setup(props) {
    const label = useDocumentLabel(props)
    return { label }
  }
})
</script>
