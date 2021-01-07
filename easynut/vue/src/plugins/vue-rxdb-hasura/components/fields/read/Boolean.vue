<template lang="pug">
Checkbox(v-model="value" :binary="true")
</template>

<script lang="ts">
import { GenericRxDocument } from '@platyplus/rxdb-hasura'
import { useFieldValue } from '@platyplus/vue-rxdb-hasura'
import { defineComponent, PropType, toRefs } from 'vue'

export default defineComponent({
  name: 'FieldReadBoolean',
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
    const value = useFieldValue<boolean>(document, name)
    return { value }
  }
})
</script>
