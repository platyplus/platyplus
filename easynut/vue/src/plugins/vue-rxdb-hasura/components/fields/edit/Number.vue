<template lang="pug">
InputNumber(:placeholder="name" v-model="model")
</template>

<script lang="ts">
import { GenericRxDocument } from '@platyplus/rxdb-hasura'
import { defineComponent, PropType, toRefs } from 'vue'

import { useFormProperty } from '../../../composables'
export default defineComponent({
  name: 'FieldEditNumber',
  props: {
    document: {
      type: Object as PropType<GenericRxDocument>,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const { name, document } = toRefs(props)
    const { model } = useFormProperty<number>(document, name)
    return { model }
  }
})
</script>
