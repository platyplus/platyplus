<template lang="pug">
div {{value}}
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'FieldString',
  props: {
    value: {
      type: [String, Number, Object, Array, Boolean],
      default: null
    },
    name: {
      type: String,
      required: true
    }
  }
})
</script>
