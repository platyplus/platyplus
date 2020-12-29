<template lang="pug">
div(v-if="!document") loading...
div(v-else) document
  ul
    li(v-for="property, name of properties")
      field(:document="document" :name="name")
</template>

<script lang="ts">
import { defineComponent, PropType, toRefs } from 'vue'

import { useDocumentProperties } from '../../../composables'
import { GenericRxDocument } from '../../../types'
export default defineComponent({
  name: 'ItemCard',
  props: {
    document: {
      type: Object as PropType<GenericRxDocument>,
      required: true
    }
  },
  setup(props) {
    const { document } = toRefs(props)
    const properties = useDocumentProperties(document)
    return { properties }
  }
})
</script>
