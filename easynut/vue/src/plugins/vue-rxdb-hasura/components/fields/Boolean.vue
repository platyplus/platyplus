<template lang="pug">
Checkbox(v-model="model" :binary="true")
</template>

<script lang="ts">
import { GenericRxDocument } from '@platyplus/rxdb-hasura'
import { defineComponent, PropType, toRefs } from 'vue'

import { useFormProperty } from '../../composables'

export default defineComponent({
  name: 'FieldBoolean',
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
    const { model } = useFormProperty<boolean>(document, name)
    return { model }
  }
})
</script>
