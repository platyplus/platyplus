<template lang="pug">
div {{value ?? '&nbsp;'}}
</template>

<script lang="ts">
import { ContentsDocument } from '@platyplus/rxdb-hasura'
import { defineComponent, PropType, toRefs } from 'vue'

import { useFieldValue } from '../../../composables'

export default defineComponent({
  name: 'FieldReadNumber',
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
    const value = useFieldValue<unknown>(document, name)
    return { value }
  }
})
</script>
