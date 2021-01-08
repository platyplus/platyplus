<template lang="pug">
div {{value}}
</template>

<script lang="ts">
import { ContentsDocument } from '@platyplus/rxdb-hasura'
import { useFieldValue } from '@platyplus/vue-rxdb-hasura'
import { defineComponent, PropType, toRefs } from 'vue'
export default defineComponent({
  name: 'FieldReadGeneric',
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
