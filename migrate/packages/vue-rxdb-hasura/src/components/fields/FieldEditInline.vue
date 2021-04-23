<template lang="pug">
component(:is="componentName" v-bind="props" :label="undefined" borderless)
</template>

<script lang="ts">
import { ContentsDocument } from '@platyplus/rxdb-hasura'
import { computed, defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'FieldEditInline',
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
      // TODO change 'field-edit-' to 'field-edit-inline-' and define field-edit-inline-* components
      () => 'h-field-edit-' + props.document.editComponent(props.name)
    )
    return { componentName, props }
  }
})
</script>
