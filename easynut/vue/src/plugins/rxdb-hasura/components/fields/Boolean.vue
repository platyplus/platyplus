<template lang="pug">
div(v-if="editing") editing
div(v-else) {{value}}
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
    },
    editing: {
      type: Boolean,
      default: false
    }
  }
})
</script>
