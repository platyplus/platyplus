<template lang="pug">
div {{formatedValue}}
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
    }
  },
  setup(props) {
    const formatedValue = computed(() => new Date(props.value).toLocaleString())
    return { formatedValue }
  }
})
</script>
