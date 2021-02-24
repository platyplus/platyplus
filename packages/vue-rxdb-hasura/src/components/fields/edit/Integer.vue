<template lang="pug">
q-input(v-model.number="model" :label="title" type="number" stack-label)
</template>

<script lang="ts">
import { ContentsDocument } from '@platyplus/rxdb-hasura'
import { defineComponent, PropType, toRefs } from 'vue'

import { useFormProperty } from '../../../composables'
export default defineComponent({
  name: 'FieldEditInteger',
  props: {
    document: {
      type: Object as PropType<ContentsDocument>,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const { name, document } = toRefs(props)
    const { model, title } = useFormProperty<number>(document, name)
    return { model, title }
  }
})
</script>
