<template lang="pug">
div(class="card")
  DataTable(:value="documents" editMode="cell" class="editable-cells-table")
    Column(v-for="property, name of properties" :field="name" :header="name" :key="name")
      // ? show only when the column is editable?
      // ! each cell can have different rights
      template(#editor="slotProps" v-if="editing && canUpdate(name)")
        div.p-fluid
          field-edit-inline(:document="slotProps.data" :name="name")
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
import { GenericRxDocument } from '@platyplus/rxdb-hasura'
import { RxCollection } from 'rxdb'
import { defineComponent, PropType, toRefs } from 'vue'

import {
  useCollectionProperties,
  useNewDocumentFactory
} from '../../../composables'

export default defineComponent({
  name: 'CollectionTable',
  props: {
    documents: {
      type: Array as PropType<GenericRxDocument[]>,
      default: []
    },
    collection: {
      type: Object as PropType<RxCollection>,
      required: true
    },
    editing: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const { collection } = toRefs(props)
    const { newDoc, next } = useNewDocumentFactory(collection)
    const properties = useCollectionProperties(collection)

    // TODO make it work with relationships
    // TODO will require to check the hasura permission rule e.g. {field:{_eq: "blah"}}
    // TODO will also require to check the postgres CHECK constraint?
    const canUpdate = (propertyName: string): boolean =>
      !!collection.value.metadata.columns.find(
        col => col.column_name === propertyName
      )?.canUpdate.length

    return { properties, newDoc, canUpdate }
  }
})
</script>
