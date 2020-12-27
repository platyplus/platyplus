<template lang="pug">
div
  document-label(:document="value")
</template>

<script lang="ts">
import { RxDocument } from 'rxdb'
import { computed, defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'FieldDocument',
  props: {
    value: {
      type: Object as PropType<RxDocument<Record<string, unknown>> | null>,
      default: null
    },
    name: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const isDoc = computed(() => {
      props.value?.isInstanceOfRxDocument
    })
    return { isDoc }
  }
})
</script>
