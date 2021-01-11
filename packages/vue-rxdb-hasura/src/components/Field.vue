<template lang="pug">
component(v-if="editing" is="field-read" v-bind="props")
component(v-else="editing" is="field-edit" v-bind="props")
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
