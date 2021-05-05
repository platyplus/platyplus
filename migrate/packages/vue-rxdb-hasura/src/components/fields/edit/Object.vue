<template lang="pug">
q-field(stack-label) TODO editing
</template>

<script lang="ts">
import { ContentsDocument } from '@platyplus/rxdb-hasura'
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'FieldEditObject',
  props: {
    document: {
      type: Object as PropType<ContentsDocument | null>,
      default: null
    },
    name: {
      type: String,
      required: true
    }
  }
})
</script>
