<template lang="pug">
input(v-if="editing" type="date" :placeholder="name" v-model="model")
div(v-else) {{formatedValue}}
</template>

<script lang="ts">
import { computed, defineComponent, PropType, toRefs } from 'vue'

import { useFormProperty } from '../../composables'
import { GenericRxDocument } from '../../types'

export default defineComponent({
  name: 'FieldDate',
  props: {
    document: {
      type: Object as PropType<GenericRxDocument>,
      required: true
    },
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
    const { name, document } = toRefs(props)
    const model = useFormProperty(document, name)
    const formatedValue = computed(() =>
      new Date(props.value).toLocaleDateString()
    )
    return { formatedValue, model }
  }
})
</script>
