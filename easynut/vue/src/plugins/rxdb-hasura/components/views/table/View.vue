<template lang="pug">
table(border=1)
  tr
    th(v-for="property, name of properties") {{name}}
  item-table(v-for="document in documents" :key="document.id" :document="document")
</template>

<script lang="ts">
import { RxCollection, RxDocument } from 'rxdb'
import { defineComponent, PropType } from 'vue'

import { useProperties } from '../../../composables'

export default defineComponent({
  name: 'ViewTable',
  props: {
    documents: {
      type: Object as PropType<RxDocument[]>,
      default: []
    },
    collection: {
      type: Object as PropType<RxCollection>,
      default: null
    }
  },
  setup(props) {
    const properties = useProperties(props)
    return { properties }
  }
})
</script>
