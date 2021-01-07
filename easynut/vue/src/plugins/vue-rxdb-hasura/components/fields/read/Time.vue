<template lang="pug">
div {{formatedValue}}
</template>

<script lang="ts">
import { GenericRxDocument } from '@platyplus/rxdb-hasura'
import { useFieldValue } from '@platyplus/vue-rxdb-hasura'
import moment from 'moment'
import { computed, defineComponent, PropType, toRefs } from 'vue'
export default defineComponent({
  name: 'FieldReadTime',
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
    const { name, document } = toRefs(props)
    const value = useFieldValue<unknown>(document, name)
    // TODO get rid of moment
    const formatedValue = computed(() =>
      moment(value.value, 'HH:mm:ss.SSSSSSZZ').format('HH:mm:ss')
    )
    return { formatedValue }
  }
})
</script>
