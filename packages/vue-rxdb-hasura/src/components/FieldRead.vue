<template lang="pug">
component(:is="componentName" v-bind="props")
</template>

<script lang="ts">
import { ContentsDocument } from '@platyplus/rxdb-hasura'
import { computed, defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'FieldRead',
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
    const componentName = computed(
      () => 'field-read-' + props.document.propertyType(props.name)
    )
    return { componentName, props }
  }
})
</script>
