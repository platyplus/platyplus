<template lang="pug">
div {{formatedValue}}
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

export default defineComponent({
  name: 'FieldDate',
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
    const formatedValue = computed(() =>
      new Date(props.value).toLocaleDateString()
    )
    return { formatedValue }
  }
})
</script>
