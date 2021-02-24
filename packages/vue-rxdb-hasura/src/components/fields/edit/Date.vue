<template lang="pug">
q-input(v-model="proxyDate" :label="title" stack-label mask="##/##/####")
  template(#append)
    q-icon.cursor-pointer(name="event")
      q-popup-proxy(ref="qDateProxy" transition-show="scale" transition-hide="scale")
        q-date(v-model="proxyDate" :mask='format')
          div.row.items-center.justify-end
            q-btn(v-close-popup label="Close" color="primary" flat)    
</template>

<script lang="ts">
import { ContentsDocument } from '@platyplus/rxdb-hasura'
import { defineComponent, PropType, toRefs } from 'vue'

import {
  unicodeDateFormat,
  useFormattedDateTime,
  useFormProperty
} from '../../../composables'

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
    const { model, title } = useFormProperty<string>(document, name)
    const { model: proxyDate, format } = useFormattedDateTime(
      model,
      unicodeDateFormat
    )
    return { proxyDate, format, title }
  }
})
</script>
