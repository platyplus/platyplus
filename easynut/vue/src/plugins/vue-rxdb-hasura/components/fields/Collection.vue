<template lang="pug">
div(v-if="editing") editing
div(v-else)
  document-label(v-for="obj, id in value" :document="obj")
</template>

<script lang="ts">
import { GenericRxDocument } from '@platyplus/rxdb-hasura'
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'FieldCollection',
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
