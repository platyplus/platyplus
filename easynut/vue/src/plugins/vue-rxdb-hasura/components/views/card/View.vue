<template lang="pug">
div
    h3 collection: {{collection.name}}
    ul
        li(v-for="document in documents" :key="document.id")
            item-card(:document="document")
</template>

<script lang="ts">
import { RxCollection, RxDocument } from 'rxdb'
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'ViewCard',
  props: {
    collection: {
      type: Object as PropType<RxCollection>,
      default: null
    },
    documents: {
      type: Object as PropType<RxDocument[]>,
      default: []
    }
  }
})
</script>
