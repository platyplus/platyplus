<template lang="pug">
div
  button(v-if="!editing" @click="edit") edit
  button(v-if="editing" @click="save") save 
  button(v-if="editing" @click="reset") reset 
  button(v-if="editing" @click="cancel") cancel 
  table(border=1)
    tr
      th(v-for="property, name of properties") {{name}}
    item-table(v-for="document in documents" :key="document.id" :document="document" :editing="editing")
    item-table(v-if="editing" :document="newDoc" :editing="true")
    
</template>

<script lang="ts">
import { GenericRxDocument } from '@platyplus/rxdb-hasura'
import { useToggle } from '@vueuse/core'
import { RxCollection } from 'rxdb'
import { defineComponent, PropType, toRefs } from 'vue'
import { useStore } from 'vuex'

import {
  useCollectionProperties,
  useNewDocumentFactory
} from '../../../composables'

export default defineComponent({
  name: 'ViewTable',
  props: {
    documents: {
      type: Array as PropType<GenericRxDocument[]>,
      default: []
    },
    collection: {
      type: Object as PropType<RxCollection>,
      required: true
    }
  },
  setup(props) {
    const { collection } = toRefs(props)
    const { newDoc, next } = useNewDocumentFactory(collection)
    const properties = useCollectionProperties(collection)
    const [editing, edit] = useToggle()
    const store = useStore()
    const save = async () => {
      await store.dispatch('rxdb/save')
      editing.value = false
      await next()
    }
    const reset = () => {
      store.commit('rxdb/reset')
    }
    const cancel = () => {
      reset()
      editing.value = false
    }
    return { properties, editing, edit, save, reset, cancel, newDoc }
  }
})
</script>
