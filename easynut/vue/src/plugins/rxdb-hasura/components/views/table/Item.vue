<template lang="pug">
tr(v-if="!document") loading...
tr(v-else)
  td(v-for="property, name of properties" :key="name")
    field(:document="document" :name="name" :editing="editing" v-model="form[name]")
</template>

<script lang="ts">
import { computed, defineComponent, PropType, toRefs } from 'vue'

import {
  createForm,
  useDocumentProperties,
  useFormProperty
} from '../../../composables'
import { GenericRxDocument } from '../../../types'
export default defineComponent({
  name: 'ItemTable',
  props: {
    document: {
      type: Object as PropType<GenericRxDocument>,
      required: true
    },
    editing: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const { document } = toRefs(props)
    const properties = useDocumentProperties(document)
    const form = createForm()
    const id = computed(() => props.document.primary)
    useFormProperty(id, form)
    return { properties, form }
  }
})
</script>
