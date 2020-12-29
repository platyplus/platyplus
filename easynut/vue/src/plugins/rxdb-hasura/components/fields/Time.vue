<template lang="pug">
div(v-if="editing") editing
div(v-else) {{formatedValue}}
</template>

<script lang="ts">
import moment from 'moment'
import { computed, defineComponent } from 'vue'
export default defineComponent({
  name: 'FieldTime',
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
    const formatedValue = computed(() =>
      moment(props.value, 'HH:mm:ss.SSSSSSZZ').format('HH:mm:ss')
    )
    return { formatedValue }
  }
})
</script>
