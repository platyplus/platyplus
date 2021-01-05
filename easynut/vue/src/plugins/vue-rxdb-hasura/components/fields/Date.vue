<template lang="pug">
Calendar(v-if="editing" id="dateformat" v-model="model" dateFormat="yy-mm-dd")
div(v-else) {{formatedValue}}
</template>

<script lang="ts">
import { GenericRxDocument } from '@platyplus/rxdb-hasura'
import { computed, defineComponent, PropType, toRefs } from 'vue'

import { useFormProperty } from '../../composables'

export default defineComponent({
  name: 'FieldDate',
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
    const { model } = useFormProperty<string>(document, name)
    const formatedValue = computed(() =>
      new Date(model.value).toLocaleDateString()
    )
    return { formatedValue, model }
  }
})
</script>
