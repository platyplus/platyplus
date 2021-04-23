<template lang="pug">
q-field(:label="title" stack-label)
  template(#control)
    q-toggle(v-model="model" label="")
</template>

<script lang="ts">
import { ContentsDocument } from '@platyplus/rxdb-hasura'
import { defineComponent, onMounted, PropType, toRefs } from 'vue'

import { useFormProperty, useProperty } from '../../../composables'

export default defineComponent({
  name: 'FieldEditBoolean',
  props: {
    document: {
      type: Object as PropType<ContentsDocument>,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    inTable: {
      type: Boolean,
      default: false
    },
    editing: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    onMounted(() => {
      // * Hack to change value on first click in datatables
      if (props.inTable) model.value = !model.value
    })
    const { name, document } = toRefs(props)
    const property = useProperty(document, name)
    const { model, title } = useFormProperty<boolean>(document, name)
    // TODO allow undefined value if property is not required
    return { model, property, title }
  }
})
</script>
