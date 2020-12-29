<template lang="pug">
input(v-if="editing" type="text" :placeholder="name" v-model="model")
div(v-else) {{value}}
</template>

<script lang="ts">
import { defineComponent, toRefs } from 'vue'

import { useFormProperty } from '../../composables'
export default defineComponent({
  name: 'FieldString',
  props: {
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
    const { name, value } = toRefs(props)
    const model = useFormProperty(name, value)
    return { model }
  }
})
</script>
