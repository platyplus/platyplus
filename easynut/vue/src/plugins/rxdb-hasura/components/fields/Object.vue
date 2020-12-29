<template lang="pug">
div(v-if="editing") editing
div(v-else) {{value}}
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

import { GenericRxDocument } from '../../types'

export default defineComponent({
  name: 'FieldObject',
  props: {
    value: {
      type: Object as PropType<GenericRxDocument | null>,
      default: null
    },
    name: {
      type: String,
      required: true
    },
    editing: {
      type: Boolean,
      default: false
    }
  }
})
</script>
