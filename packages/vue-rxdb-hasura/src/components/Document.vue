<template lang="pug">
div document
</template>

<script lang="ts">
import { ContentsDocument } from '@platyplus/rxdb-hasura'
import { defineComponent, PropType } from 'vue'
export default defineComponent({
  name: 'Document',
  props: {
    document: {
      type: Object as PropType<ContentsDocument>,
      required: true
    }
  }
})
</script>
