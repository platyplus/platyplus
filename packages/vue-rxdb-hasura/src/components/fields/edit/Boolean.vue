<template lang="pug">
div.p-component.p-inputtext
  Checkbox(v-model="model" :binary="true")
</template>

<script lang="ts">
import { ContentsDocument } from '@platyplus/rxdb-hasura'
import { defineComponent, onMounted, PropType, toRefs } from 'vue'

import { useFormProperty } from '../../../composables'

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
    const { model } = useFormProperty<boolean>(document, name)
    return { model }
  }
})
</script>
