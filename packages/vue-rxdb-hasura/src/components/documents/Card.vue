<template lang="pug">
p-card.p-m-1.p-p-2(style="border: 1px solid #dee2e6;")
  template(#title)
    // TODO get the link from the parent component
    span.text-capitalize {{label}}
</template>

<script lang="ts">
import { ContentsCollection, ContentsDocument } from '@platyplus/rxdb-hasura'
import { computed, defineComponent, PropType, toRefs } from 'vue'

import { useDocument, useDocumentLabel } from '../../composables'

export default defineComponent({
  name: 'DocumentCard',
  props: {
    collection: {
      type: Object as PropType<ContentsCollection | undefined>,
      default: undefined
    },
    id: {
      type: String as PropType<string | undefined>,
      default: undefined
    },
    document: {
      type: Object as PropType<ContentsDocument | undefined>,
      default: undefined
    },
    type: {
      type: String,
      default: 'label'
    },
    editing: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const { collection, id, document } = toRefs(props)
    const collectionDocument = useDocument(collection, id)
    const doc = computed(() => document.value || collectionDocument.value)
    const col = computed(() => doc.value?.collection)
    const properties = computed(() => col.value?.properties)

    const label = useDocumentLabel(document)
    return { doc, label, properties }
  }
})
</script>
