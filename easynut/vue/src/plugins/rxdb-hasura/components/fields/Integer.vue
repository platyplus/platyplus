<template lang="pug">
div {{value}}
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'FieldInteger',
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
