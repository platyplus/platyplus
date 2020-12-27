<template lang="pug">
div(v-if="!document") loading...
div(v-else) document
  ul
    li(v-for="property, name of properties")
      field(:document="document" :name="name")
</template>

<script lang="ts">
import { RxDocument } from 'rxdb'
import { defineComponent, PropType } from 'vue'

import { useProperties } from '../../../composables'
export default defineComponent({
  name: 'ItemCard',
  props: {
    document: {
      type: Object as PropType<RxDocument<Record<string, unknown>>>,
      required: true
    }
  },
  setup(props) {
    const properties = useProperties(props.document)
    return { properties }
  }
})
</script>
