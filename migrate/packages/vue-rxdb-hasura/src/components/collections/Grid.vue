<template lang="pug">
h-collection-table(v-bind="props" grid)
</template>

<script lang="ts">
import { ContentsCollection } from '@platyplus/rxdb-hasura'
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'CollectionGrid',
  props: {
    collection: {
      type: Object as PropType<ContentsCollection>,
      required: true
    }
  },
  setup(props) {
    return { props }
  }
})
</script>
