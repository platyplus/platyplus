<template lang="pug">
p-input-text(:placeholder="name" v-model="model" type="text")
</template>

<script lang="ts">
import { ContentsDocument } from '@platyplus/rxdb-hasura'
import { defineComponent, PropType, toRefs } from 'vue'

import { useFormProperty } from '../../../composables'
export default defineComponent({
  name: 'FieldEditString',
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
    const { model } = useFormProperty<string>(document, name)
    return { model }
  }
})
</script>
