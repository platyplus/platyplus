<template lang="pug">
div(v-if="!document") loading...
div(v-else) document
  ul
    li(v-for="property, name of properties")
      field(:document="document" :name="name")
</template>

<script lang="ts">
import { ContentsDocument } from '@platyplus/rxdb-hasura'
import { defineComponent, PropType, toRefs } from 'vue'

import { useDocumentProperties } from '../../../composables'
export default defineComponent({
  name: 'ItemCard',
  props: {
    document: {
      type: Object as PropType<ContentsDocument>,
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
