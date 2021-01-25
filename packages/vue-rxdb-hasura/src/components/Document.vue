<template lang="pug">
template(v-if="doc")
  span(v-if="layout==='label'") {{label}}
  p-card.p-m-1.p-p-2(v-else-if="layout==='card'" style="border: 1px solid #dee2e6;")
    template(#title)
      // TODO get the link from the parent component
      span.p-text-capitalize {{label}}
  div.p-fluid(v-else-if="layout==='details'")
    div.p-field(v-for='[name, property] of properties' :key="name")
      i.pi.p-mx-2(v-if="document.collection.icon(name)" :class="document.collection.icon(name)")
      label.p-text-capitalize(:for="name") {{document.collection.title(name)}}
      h-field-edit(v-if="editing && document.canEdit(name)" :document="document" :name="name" :label="true")
      div(v-else).p-component.p-inputtext
        h-field-read(:document="document" :name="name")
  div(v-else-if="layout==='chip'").p-chip.p-component.p-mr-2.p-mb-1
    .p-chip-text {{label}}
  span(v-else) TODO other layout for {{doc.primary}}
span(v-else) loading...
</template>

<script lang="ts">
import { ContentsCollection, ContentsDocument } from '@platyplus/rxdb-hasura'
import { computed, defineComponent, PropType, toRefs } from 'vue'

import { useDocument, useDocumentLabel } from '../composables'

export default defineComponent({
  name: 'Document',
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
    const properties = computed(() => col.value.properties)

    const label = useDocumentLabel(document)
    return { doc, label, properties }
  }
})
</script>
