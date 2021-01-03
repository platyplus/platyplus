<template lang="pug">
input(v-if="editing" type="number" :placeholder="name" v-model="model") 
div(v-else) {{value}}
</template>

<script lang="ts">
import { GenericRxDocument } from '@platyplus/rxdb-hasura'
import { defineComponent, PropType, toRefs } from 'vue'

import { useFormProperty } from '../../composables'

export default defineComponent({
  name: 'FieldInteger',
  props: {
    document: {
      type: Object as PropType<GenericRxDocument>,
      required: true
    },
    value: {
      type: Number,
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
    const model = useFormProperty<number>(document, name)
    return { model }
  }
})
</script>
