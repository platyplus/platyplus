<template lang="pug">
InputText(v-if="editing" :placeholder="name" v-model="model" type="text")
div(v-else) {{model}}
</template>

<script lang="ts">
import { GenericRxDocument } from '@platyplus/rxdb-hasura'
import { defineComponent, PropType, toRefs } from 'vue'

import { useFormProperty } from '../../composables'
export default defineComponent({
  name: 'FieldString',
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
    const { model, changed } = useFormProperty<string>(document, name)
    return { model, changed }
  }
})
</script>
