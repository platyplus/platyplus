<template lang="pug">
component(:is="componentName" v-bind="props")
</template>

<script lang="ts">
import { ContentsDocument } from '@platyplus/rxdb-hasura'
import { computed, defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'FieldEdit',
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
      () => 'h-field-edit-' + props.document.editComponent(props.name)
    )
    return { componentName, props }
  }
})
</script>
