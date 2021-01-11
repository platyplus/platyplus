<template lang="pug">
Checkbox(v-model="model" :binary="true")
</template>

<script lang="ts">
import { ContentsDocument } from '@platyplus/rxdb-hasura'
import { computed, defineComponent, PropType, toRefs } from 'vue'

import { useFieldValue } from '../../../composables'

export default defineComponent({
  name: 'FieldReadBoolean',
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
    const { name, document } = toRefs(props)
    const value = useFieldValue<boolean>(document, name)
    const model = computed({
      get() {
        return value.value
      },
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      set() {}
    })
    return { model }
  }
})
</script>
