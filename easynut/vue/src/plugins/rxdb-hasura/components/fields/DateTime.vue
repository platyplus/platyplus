<template lang="pug">
div(v-if="editing") editing
div(v-else) {{formatedValue}}
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

export default defineComponent({
  name: 'FieldDateTime',
  props: {
    value: {
      type: String,
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
  },
  setup(props) {
    const formatedValue = computed(() => new Date(props.value).toLocaleString())
    return { formatedValue }
  }
})
</script>
