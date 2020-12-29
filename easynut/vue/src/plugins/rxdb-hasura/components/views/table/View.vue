<template lang="pug">
div
  button(@click="save" v-if="editing") save
  button(v-else @click="edit") edit
  div {{editing}}
  div {{form}}
  table(border=1)
    tr
      th(v-for="property, name of properties") {{name}}
    item-table(v-for="document in documents" :key="document.id" :document="document" :editing="editing")
</template>

<script lang="ts">
import { useToggle } from '@vueuse/core'
import { RxCollection } from 'rxdb'
import { defineComponent, PropType, toRefs } from 'vue'

import { createForm, useCollectionProperties } from '../../../composables'
import { debug, error } from '../../../helpers'
import { GenericDocument, GenericRxDocument } from '../../../types'

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
    // const properties = useProperties(collection as Ref<RxCollection>)
    const [editing, edit] = useToggle()
    const save = async () => {
      // TODO
      debug('save', props.documents)
      for (const document of props.documents) {
        const updatedValues = form.value[document.primary]
        if (updatedValues) {
          try {
            await document.atomicPatch(updatedValues)
          } catch (err) {
            error(err)
          }
        }
      }
      debug('save: end')
      editing.value = false
    }
    let form = createForm<Record<string, GenericDocument>>()
    return { properties, editing, edit, save, form }
  }
})
</script>
