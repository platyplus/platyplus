<template lang="pug">
input(v-if="editing" type="text" :placeholder="name" v-model="model")
div(v-else) {{value}}
</template>

<script lang="ts">
import { defineComponent, PropType, toRefs } from 'vue'

import { useFormProperty } from '../../composables'
import { GenericRxDocument } from '../../types'
export default defineComponent({
  name: 'FieldString',
  props: {
    document: {
      type: Object as PropType<GenericRxDocument>,
      required: true
    },
    value: {
      type: [String, Number, Object, Array, Boolean],
      default: ''
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
    const model = useFormProperty<string>(document, name)
    return { model }
  }
})
</script>
