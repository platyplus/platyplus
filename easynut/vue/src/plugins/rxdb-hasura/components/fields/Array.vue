<template lang="pug">
div(v-if="editing") editing
document-label(v-else v-for="obj, id in value" :document="obj")
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

import { GenericRxDocument } from '../../types'

export default defineComponent({
  name: 'FieldArray',
  props: {
    document: {
      type: Object as PropType<GenericRxDocument>,
      required: true
    },
    value: {
      type: Object as PropType<Record<string, GenericRxDocument>>,
      default: {}
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
