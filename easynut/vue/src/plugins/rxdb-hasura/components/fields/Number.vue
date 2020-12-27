<template lang="pug">
div {{value}}
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'FieldNumber',
  props: {
    value: {
      type: Number,
      default: null
    },
    name: {
      type: String,
      required: true
    }
  }
})
</script>
