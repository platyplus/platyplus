<template lang="pug">
Calendar(v-if="editing" v-model="model" :showTime="true" :showSeconds="true" appendTo="body")
div(v-else) {{formatedValue}}
</template>

<script lang="ts">
import { GenericRxDocument } from '@platyplus/rxdb-hasura'
import { useFormProperty } from '@platyplus/vue-rxdb-hasura'
import { computed, defineComponent, PropType, toRefs } from 'vue'

export default defineComponent({
  name: 'FieldDateTime',
  props: {
    document: {
      type: Object as PropType<GenericRxDocument>,
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
    // TODO internationalize preferably without using momentjs (too big)
    const { name, document } = toRefs(props)
    const { model } = useFormProperty<string>(document, name)
    const formatedValue = computed(() => new Date(model.value).toLocaleString())
    return { formatedValue, model }
  }
})
</script>
