<template lang="pug">
component(:is="componentName" v-bind="props")
</template>

<script lang="ts">
import { GenericRxDocument, propertyType } from '@platyplus/rxdb-hasura'
import { computed, defineComponent, PropType, toRefs } from 'vue'

import { useProperty } from '../composables'

export default defineComponent({
  name: 'Field',
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
    const { document, name } = toRefs(props)
    const property = useProperty(document, name)
    const componentName = computed(
      () => 'field-' + propertyType(property.value)
    )
    return { componentName, props }
  }
})
</script>
