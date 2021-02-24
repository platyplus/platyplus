<template lang="pug">
q-input(v-model='proxyDate' :label="title" stack-label)
  template(v-slot:prepend)
    q-icon.cursor-pointer(name='event')
      q-popup-proxy(transition-show='scale' transition-hide='scale')
        q-date(v-model='proxyDate' :mask='format')
          .row.items-center.justify-end
            q-btn(v-close-popup label='Close' color='primary' flat)
  template(v-slot:append)
    q-icon.cursor-pointer(name='access_time')
      q-popup-proxy(transition-show='scale' transition-hide='scale')
        q-time(v-model='proxyDate' :mask='format' format24h with-seconds)
          .row.items-center.justify-end
            q-btn(v-close-popup label='Close' color='primary' flat)
</template>

<script lang="ts">
import { ContentsDocument } from '@platyplus/rxdb-hasura'
import {
  unicodeDateTimeFormat,
  useFormattedDateTime
} from '@platyplus/vue-rxdb-hasura'
import { defineComponent, PropType, toRefs } from 'vue'

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
    const { model, title } = useFormProperty<string>(document, name)
    const { model: proxyDate, format } = useFormattedDateTime(
      model,
      unicodeDateTimeFormat
    )

    return { proxyDate, format, title }
  }
})
</script>
