<template lang="pug">
router-link(v-if="refDocument" :to="{ name: 'document', params: { collection: refDocument.collection.name, id: refDocument.primary }}")
  h-document(:document="refDocument" type="chip")
div(v-else) &nbsp;
</template>

<script lang="ts">
import { ContentsDocument } from '@platyplus/rxdb-hasura'
import { defineComponent, PropType, toRefs } from 'vue'

import { useRefFieldValue } from '../../../composables'
export default defineComponent({
  name: 'FieldReadDocument',
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
    const refDocument = useRefFieldValue<ContentsDocument>(document, name)
    return { refDocument }
  }
})
</script>
