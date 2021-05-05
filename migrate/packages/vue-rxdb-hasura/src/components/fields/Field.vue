<template lang="pug">
h-field-edit(v-if="editing" v-bind="props")
h-field-read(v-else v-bind="props")
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Field',
  props: {
    editing: {
      type: Boolean,
      required: true
    }
  },
  setup(props) {
    return { props }
  }
})
</script>
