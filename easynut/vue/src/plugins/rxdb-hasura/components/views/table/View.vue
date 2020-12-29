<template lang="pug">
div
  button(v-if="!editing" @click="edit") edit
  button(v-if="editing" @click="save") save 
  button(v-if="editing" @click="reset") reset 
  table(border=1)
    tr
      th(v-for="property, name of properties") {{name}}
    item-table(v-for="document in documents" :key="document.id" :document="document" :editing="editing")
</template>

<script lang="ts">
import { useToggle } from '@vueuse/core'
import { RxCollection } from 'rxdb'
import { defineComponent, PropType, toRefs } from 'vue'
import { useStore } from 'vuex'

import { useCollectionProperties } from '../../../composables'
import { GenericRxDocument } from '../../../types'

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
    const properties = useCollectionProperties(collection)
    const [editing, edit] = useToggle()
    const store = useStore()
    const save = async () => {
      await store.dispatch('rxdb/save')
      editing.value = false
    }
    const reset = () => {
      store.commit('rxdb/reset')
    }
    return { properties, editing, edit, save, reset }
  }
})
</script>
