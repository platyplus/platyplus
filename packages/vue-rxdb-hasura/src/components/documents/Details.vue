<template lang="pug">
div
  template(v-for='[name, property] of properties' :key="name")
    //- q-icon(v-if="document.collection.icon(name)" :name="document.collection.icon(name)")
    h-field-edit(v-if="editing && document.canEdit(name)"
      :document="document"
      :name="name"
      :label="document.collection.title(name)")
    q-field(v-else
      :label="document.collection.title(name)"
      stack-label)
      template(#control)
        div.self-center.full-width.no-outline
          h-field-read( :document="document" :name="name")
</template>

<script lang="ts">
import { ContentsCollection, ContentsDocument } from '@platyplus/rxdb-hasura'
import { computed, defineComponent, PropType, toRefs } from 'vue'

import { useDocument, useDocumentLabel } from '../../composables'

export default defineComponent({
  name: 'DocumentDetails',
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
