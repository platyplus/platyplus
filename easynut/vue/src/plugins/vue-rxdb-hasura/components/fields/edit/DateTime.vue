<template lang="pug">
Calendar(v-model="model" :showTime="true" :showSeconds="true" appendTo="body")
</template>

<script lang="ts">
import { GenericRxDocument } from '@platyplus/rxdb-hasura'
import { useFormProperty } from '@platyplus/vue-rxdb-hasura'
import { defineComponent, PropType, toRefs } from 'vue'

export default defineComponent({
  name: 'FieldEditDateTime',
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
    // TODO internationalize preferably without using momentjs (too big)
    const { name, document } = toRefs(props)
    const { model } = useFormProperty<string>(document, name)
    return { model }
  }
})
</script>
