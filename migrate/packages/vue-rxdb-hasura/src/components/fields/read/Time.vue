<template lang="pug">
div {{formatedValue || '&nbsp;'}}
</template>

<script lang="ts">
import { ContentsDocument } from '@platyplus/rxdb-hasura'
import { computed, defineComponent, PropType, toRefs } from 'vue'

import { useFieldValue } from '../../../composables'
export default defineComponent({
  name: 'FieldReadTime',
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
    const value = useFieldValue<string | undefined>(document, name)
    // TODO internationalize, preferably without using momentjs (too big)
    const formatedValue = computed(
      () => value.value && value.value.substr(0, 8)
    )
    return { formatedValue }
  }
})
</script>
