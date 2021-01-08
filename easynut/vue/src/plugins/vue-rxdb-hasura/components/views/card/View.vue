<template lang="pug">
div
    h3 collection: {{collection.name}}
    ul
        li(v-for="document in documents" :key="document.id")
            item-card(:document="document")
</template>

<script lang="ts">
import { ContentsCollection, ContentsDocument } from '@platyplus/rxdb-hasura'
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'ViewCard',
  props: {
    collection: {
      type: Object as PropType<ContentsCollection>,
      default: null
    },
    documents: {
      type: Object as PropType<ContentsDocument[]>,
      default: []
    }
  }
})
</script>
