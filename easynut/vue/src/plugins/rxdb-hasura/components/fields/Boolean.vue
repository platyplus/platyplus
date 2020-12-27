<template lang="pug">
div {{value}}
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'FieldBoolean',
  props: {
    value: {
      type: Boolean,
      default: null
    },
    name: {
      type: String,
      required: true
    }
  }
})
</script>
