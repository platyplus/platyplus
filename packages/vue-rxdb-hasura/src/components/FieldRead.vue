<template lang="pug">
component(:is="componentName" v-bind="props" :options="options")
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
      () => 'h-field-read-' + props.document.readComponent(props.name)
    )
    const options = computed(() =>
      props.document.readComponentOptions(props.name)
    )
    return { componentName, props, options }
  }
})
</script>
