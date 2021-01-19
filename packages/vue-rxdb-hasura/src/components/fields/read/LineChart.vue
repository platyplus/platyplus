<template lang="pug">
Chart(type="line" :data="data" :options="options")
</template>

<script lang="ts">
import { ContentsDocument } from '@platyplus/rxdb-hasura'
import { computed, defineComponent, PropType, toRefs } from 'vue'

import { useFieldValue } from '../../../composables'
export default defineComponent({
  name: 'FieldReadLineChart',
  props: {
    document: {
      type: Object as PropType<ContentsDocument>,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    options: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const { name, document } = toRefs(props)
    const value = useFieldValue<unknown>(document, name)
    const data = computed(() => {
      return {
        datasets: [
          {
            label: document.value.label,
            backgroundColor: '#42A5F5',
            data: value.value
          }
        ]
      }
    })
    return { value, data }
  }
})
</script>
