<template lang="pug">
template(v-if="doc")
  span(v-if="layout==='label'") {{label}}
  Card.p-m-1.p-p-2(v-else-if="layout==='card'" style="border: 1px solid #dee2e6;")
    template(#title)
      // TODO get the link from the parent component
      span {{label}}
  div.p-fluid(v-else-if="layout==='details'")
    div.p-field( v-for='property, name of properties' :key="name")
      label(:for="name") {{name}}
      field-edit(v-if="editing && document.canEdit(name)" :document="document" :name="name" :label="true")
      div(v-else).p-component.p-inputtext
        field-read(:document="document" :name="name")
  div(v-else-if="layout==='chip'").p-chip.p-component.p-mr-2.p-mb-1
    .p-chip-text {{label}}
  span(v-else) TODO other layout for {{doc.primary}}
span(v-else) loading...
</template>

<script lang="ts">
import { ContentsCollection, ContentsDocument } from '@platyplus/rxdb-hasura'
import { computed, defineComponent, PropType, toRefs } from 'vue'

import {
  useCollectionProperties,
  useDocument,
  useDocumentLabel
} from '../composables'

export default defineComponent({
  name: 'HDocument',
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
    layout: {
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
    const properties = useCollectionProperties(col)

    const label = useDocumentLabel(document)
    return { doc, label, properties }
  }
})
</script>
