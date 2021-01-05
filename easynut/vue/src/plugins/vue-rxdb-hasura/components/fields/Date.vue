<template lang="pug">
Calendar(v-if="editing" v-model="proxyDate" dateFormat="dd/mm/yyyy" appendTo="body")
div(v-else) {{formatedValue}}
</template>

<script lang="ts">
import { GenericRxDocument } from '@platyplus/rxdb-hasura'
import { computed, defineComponent, PropType, toRefs } from 'vue'

import { useFormProperty } from '../../composables'

// * Converts a JS date to a `yyyy-mm-dd` format. See https://stackoverflow.com/questions/23593052/format-javascript-date-as-yyyy-mm-dd
const dateToStringDateOnly = (value: Date): string =>
  new Date(value.getTime() - value.getTimezoneOffset() * 60 * 1000)
    .toISOString()
    .split('T')[0]
export default defineComponent({
  name: 'FieldDate',
  props: {
    document: {
      type: Object as PropType<GenericRxDocument>,
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
    const formatedValue = computed(
      () => new Date(model.value).toLocaleDateString() // TODO <-- here (and in the template as well)
    )
    const proxyDate = computed<Date>({
      get: () => new Date(model.value),
      set: (value: Date) => {
        model.value = dateToStringDateOnly(value)
      }
    })
    return { formatedValue, proxyDate }
  }
})
</script>
