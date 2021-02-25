<template lang="pug">
div TODO table document
  q-field(label="Table schema" stack-label)
    template(#control)
      h-field-read(:document="document" name="table_schema")
  q-field(label="Table name" stack-label)
    template(#control)
      h-field-read(:document="document" name="table_name")
  //- div {{config}}
  div {{form}}
  div {{document}}
 
</template>

<script lang="ts">
import { ContentsCollection, ContentsDocument } from '@platyplus/rxdb-hasura'
import { computed, defineComponent, PropType, toRefs } from 'vue'
import { useStore } from 'vuex'

import {
  useDocument,
  useDocumentLabel,
  useFormProperty,
  usePropertyValue
} from '../../composables'
export default defineComponent({
  name: 'DocumentMetadataTable',
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
    const store = useStore()
    const form = computed(() => store.getters['rxdb/form'])
    const config = useFormProperty(document, 'config')
    return { doc, label, properties, form }
  }
})
</script>

<style></style>
