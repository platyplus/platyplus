<template lang="pug">
input(v-if="editing" type="date" :placeholder="name" v-model="model")
div(v-else) {{formatedValue}}
</template>

<script lang="ts">
import { computed, defineComponent, toRefs } from 'vue'

import { useFormProperty } from '../../composables'

export default defineComponent({
  name: 'FieldDate',
  props: {
    value: {
      type: String,
      default: null
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
    const { name, value } = toRefs(props)
    const model = useFormProperty(name, value)
    const formatedValue = computed(() =>
      new Date(props.value).toLocaleDateString()
    )
    return { formatedValue, model }
  }
})
</script>
