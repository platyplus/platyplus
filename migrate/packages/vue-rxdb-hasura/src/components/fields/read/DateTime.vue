<template lang="pug">
div {{formatedValue || '&nbsp;'}}
</template>

<script lang="ts">
import { ContentsDocument } from '@platyplus/rxdb-hasura'
import { computed, defineComponent, PropType, toRefs } from 'vue'

import { useFieldValue } from '../../../composables'

export default defineComponent({
  name: 'FieldReadDateTime',
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
    // TODO internationalize, preferably without using momentjs (too big)
    const { name, document } = toRefs(props)
    const value = useFieldValue<string | undefined>(document, name)
    const formatedValue = computed(
      () => value.value && new Date(value.value).toLocaleString()
    )
    return { formatedValue, value }
  }
})
</script>
