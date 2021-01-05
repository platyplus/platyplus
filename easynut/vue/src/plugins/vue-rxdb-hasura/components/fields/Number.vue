<template lang="pug">
InputNumber(v-if="editing" :placeholder="name" v-model="model")
div(v-else) {{model}}
</template>

<script lang="ts">
import { GenericRxDocument } from '@platyplus/rxdb-hasura'
import { defineComponent, PropType, toRefs } from 'vue'

import { useFormProperty } from '../../composables'
export default defineComponent({
  name: 'FieldNumber',
  props: {
    document: {
      type: Object as PropType<GenericRxDocument>,
      required: true
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
    const { model } = useFormProperty<number>(document, name)
    return { model }
  }
})
</script>
