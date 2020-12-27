<template lang="pug">
div
  document-label(:document="value")
</template>

<script lang="ts">
import { RxDocument } from 'rxdb'
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'FieldObject',
  props: {
    value: {
      type: Object as PropType<RxDocument<Record<string, unknown>>>,
      default: null
    },
    name: {
      type: String,
      required: true
    }
  }
})
</script>
