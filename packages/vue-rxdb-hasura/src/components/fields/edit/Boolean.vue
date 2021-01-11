<template lang="pug">
Checkbox(v-model="model" :binary="true")
</template>

<script lang="ts">
import { ContentsDocument } from '@platyplus/rxdb-hasura'
import { defineComponent, PropType, toRefs } from 'vue'

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
    editing: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const { name, document } = toRefs(props)
    const { model } = useFormProperty<boolean>(document, name)
    return { model }
  }
})
</script>
