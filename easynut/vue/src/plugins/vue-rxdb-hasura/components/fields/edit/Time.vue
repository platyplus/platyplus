<template lang="pug">
div TODO editing
</template>

<script lang="ts">
import { GenericRxDocument } from '@platyplus/rxdb-hasura'
import { useFormProperty } from '@platyplus/vue-rxdb-hasura'
import { defineComponent, PropType, toRefs } from 'vue'
export default defineComponent({
  name: 'FieldEditTime',
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
    // TODO
    return { model }
  }
})
</script>
