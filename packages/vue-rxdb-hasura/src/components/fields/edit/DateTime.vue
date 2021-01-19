<template lang="pug">
Calendar(v-model="proxyDate" :showTime="true" :showSeconds="true" appendTo="body" dateFormat="dd/mm/yyyy")
</template>

<script lang="ts">
import { ContentsDocument } from '@platyplus/rxdb-hasura'
import { computed, defineComponent, PropType, toRefs } from 'vue'

import { useFormProperty } from '../../../composables'

export default defineComponent({
  name: 'FieldEditDateTime',
  props: {
    document: {
      type: Object as PropType<ContentsDocument>,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  },
  setup(props) {
    // TODO internationalize preferably without using momentjs (too big)
    const { name, document } = toRefs(props)
    const { model } = useFormProperty<string>(document, name)
    const proxyDate = computed<Date>({
      get: () => new Date(model.value || Date.now()),
      set: (value: Date) => {
        try {
          model.value = value.toISOString()
        } catch {
          // TODO
          console.log('invalid date - do nothing')
        }
      }
    })
    return { proxyDate }
  }
})
</script>
