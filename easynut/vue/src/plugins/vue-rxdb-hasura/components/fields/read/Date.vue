<template lang="pug">
div {{formatedValue}}
</template>

<script lang="ts">
import { GenericRxDocument } from '@platyplus/rxdb-hasura'
import { useFieldValue } from '@platyplus/vue-rxdb-hasura'
import { computed, defineComponent, PropType, toRefs } from 'vue'

export default defineComponent({
  name: 'FieldReadDate',
  props: {
    document: {
      type: Object as PropType<GenericRxDocument>,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  },
  setup(props) {
    // TODO internationalize dateFormat, but preferably without using momentjs (too big)
    const { name, document } = toRefs(props)
    const value = useFieldValue<string>(document, name)

    const formatedValue = computed(
      () => new Date(value.value).toLocaleDateString() // TODO <-- here (and in the template as well)
    )
    return { formatedValue }
  }
})
</script>
