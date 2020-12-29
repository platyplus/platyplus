<template lang="pug">
tr(v-if="!document") loading...
tr(v-else)
  td(v-for="property, name of properties" :key="name")
    field(:document="document" :name="name" :editing="editing")
</template>

<script lang="ts">
import { defineComponent, PropType, toRefs } from 'vue'

import { useDocumentProperties } from '../../../composables'
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
    return { properties }
  }
})
</script>
