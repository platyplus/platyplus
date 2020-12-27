<template lang="pug">
tr(v-if="!document") loading...
tr(v-else)
  td(v-for="property, name of properties" :key="name")
    field(:document="document" :name="name")
</template>

<script lang="ts">
import { RxDocument } from 'rxdb'
import { defineComponent, PropType } from 'vue'

import { useProperties } from '../../../composables'
export default defineComponent({
  name: 'ItemTable',
  props: {
    document: {
      type: Object as PropType<RxDocument<Record<string, unknown>>>,
      required: true
    }
  },
  setup(props) {
    const properties = useProperties(props)
    return { properties }
  }
})
</script>
