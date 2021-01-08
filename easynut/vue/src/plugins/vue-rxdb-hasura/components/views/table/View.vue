<template lang="pug">
div(class="card")
  DataTable(:value="documents" editMode="cell" class="editable-cells-table")
    Column(v-for="property, name of properties" :field="name" :header="name" :key="name")
      // ? show only when the column is editable?
      // ! each cell can have different rights
      template(#editor="slotProps")
        div.p-fluid
          field-edit-inline(v-if="editing && canEditDocument(slotProps.data) && canEditField(name)" :document="slotProps.data" :name="name")
          field-read(v-else :document="slotProps.data" :name="name")
      template(#body="slotProps")
        div.p-fluid
          field-read(:document="slotProps.data" :name="name")
      
       
  //- table(border=1)
  //-   tr
  //-     th(v-for="property, name of properties") {{name}}
  //-   item-table(v-for="document in documents" :key="document.id" :document="document" :editing="editing")
  //-   item-table(v-if="editing" :document="newDoc" :editing="true")
    
</template>

<script lang="ts">
import { ContentsCollection, ContentsDocument } from '@platyplus/rxdb-hasura'
import { defineComponent, PropType, toRefs } from 'vue'

import {
  useCollectionProperties,
  useNewDocumentFactory
} from '../../../composables'

export default defineComponent({
  name: 'CollectionTable',
  props: {
    documents: {
      type: Array as PropType<ContentsDocument[]>,
      default: []
    },
    collection: {
      type: Object as PropType<ContentsCollection>,
      required: true
    },
    editing: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const { collection } = toRefs(props)
    const { newDoc } = useNewDocumentFactory(collection)
    const properties = useCollectionProperties(collection)

    // TODO make it work with relationships
    // TODO will require to check the hasura permission rule e.g. {field:{_eq: "blah"}}
    // TODO will also require to check the postgres CHECK constraint?
    const canEditField = (propertyName: string): boolean =>
      !!collection.value.metadata.columns.find(
        col => col.column_name === propertyName
      )?.canUpdate.length
    const canEditDocument = (doc: ContentsDocument): boolean => doc.canEdit()
    // TODO canEditCollection
    return { properties, newDoc, canEditField, canEditDocument }
  }
})
</script>
