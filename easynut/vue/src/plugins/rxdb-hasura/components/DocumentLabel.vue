<template lang="pug">
div {{label}}
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

import { useDocumentLabel } from '../composables'
import { GenericRxDocument } from '../types'
export default defineComponent({
  name: 'DocumentLabel',
  props: {
    document: {
      type: Object as PropType<GenericRxDocument>,
      default: null
    }
  },
  setup(props) {
    const label = useDocumentLabel(props)
    return { label }
  }
})
</script>
