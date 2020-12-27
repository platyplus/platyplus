<template lang="pug">
div {{formatedValue}}
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
