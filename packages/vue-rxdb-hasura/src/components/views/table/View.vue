<template lang="pug">
DataTable(:value="documents" editMode="cell" class="editable-cells-table p-datatable-gridlines")
  Column(v-for="[name, property] of properties" :field="name" :header="collection.title(name)" :key="name")
    template(#editor="slotProps" v-if="editing")
      div.p-fluid
        field-edit-inline(v-if="slotProps.data.canEdit(name)" :document="slotProps.data" :name="name" :inTable="true")
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
import { computed, defineComponent, PropType, toRefs } from 'vue'

import { useNewDocumentFactory } from '../../../composables'

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
    const properties = computed(() => collection.value.properties)

    // TODO canEditCollection
    return { properties, newDoc }
  }
})
</script>
