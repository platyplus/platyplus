<template lang="pug">
div(v-if="editing") editing
div(v-else)
  document-label(:document="value")
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'

import { GenericRxDocument } from '../../types'

export default defineComponent({
  name: 'FieldDocument',
  props: {
    value: {
      type: Object as PropType<GenericRxDocument | null>,
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
    const isDoc = computed(() => {
      props.value?.isInstanceOfRxDocument
    })
    return { isDoc }
  }
})
</script>
