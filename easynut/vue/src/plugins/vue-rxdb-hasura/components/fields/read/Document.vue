<template lang="pug">
document-label(:document="refDocument")
</template>

<script lang="ts">
import { GenericRxDocument } from '@platyplus/rxdb-hasura'
import { useRefFieldValue } from '@platyplus/vue-rxdb-hasura'
import { defineComponent, PropType, toRefs } from 'vue'
export default defineComponent({
  name: 'FieldReadDocument',
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
    const refDocument = useRefFieldValue<GenericRxDocument>(document, name)
    return { refDocument }
  }
})
</script>
