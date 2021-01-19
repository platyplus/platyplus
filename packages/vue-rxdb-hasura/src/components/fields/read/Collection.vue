<template lang="pug">
div(v-if="!refCollection") loading...
template(v-else-if="refCollection.length" v-for="document, id in refCollection")
  router-link(:to="{ name: 'document', params: { collection: document.collection.name, id: document.primary }}")
    h-document(:document="document" layout="chip")
div(v-else) &nbsp;
</template>

<script lang="ts">
import { ContentsDocument } from '@platyplus/rxdb-hasura'
import { defineComponent, PropType, toRefs } from 'vue'

import { useRefFieldValue } from '../../../composables'

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
    },
    options: {
      type: Object,
      default: () => ({})
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
