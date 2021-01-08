<template lang="pug">
document-label(v-for="document, id in refCollection" :document="document")
</template>

<script lang="ts">
import { ContentsDocument } from '@platyplus/rxdb-hasura'
import { useRefFieldValue } from '@platyplus/vue-rxdb-hasura'
import { defineComponent, PropType, toRefs } from 'vue'

export default defineComponent({
  name: 'FieldReadCollection',
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
    const refCollection = useRefFieldValue<Array<ContentsDocument>>(
      document,
      name
    )
    return { refCollection }
  }
})
</script>
