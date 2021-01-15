<template lang="pug">
Calendar(v-model="proxyDate" dateFormat="dd/mm/yy" appendTo="body")
</template>

<script lang="ts">
import { ContentsDocument } from '@platyplus/rxdb-hasura'
import { computed, defineComponent, PropType, toRefs } from 'vue'

import { useFormProperty } from '../../../composables'

// * Converts a JS date to a `yyyy-mm-dd` format. See https://stackoverflow.com/questions/23593052/format-javascript-date-as-yyyy-mm-dd
const dateToStringDateOnly = (value: Date): string =>
  new Date(value.getTime() - value.getTimezoneOffset() * 60 * 1000)
    .toISOString()
    .split('T')[0]
export default defineComponent({
  name: 'FieldEditDate',
  props: {
    document: {
      type: Object as PropType<ContentsDocument>,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    editing: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    // TODO internationalize dateFormat, but preferably without using momentjs (too big)
    const { name, document } = toRefs(props)
    const { model } = useFormProperty<string>(document, name)
    const proxyDate = computed<Date>({
      get: () => new Date(model.value || Date.now()),
      set: (value: Date) => {
        try {
          model.value = dateToStringDateOnly(value)
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
