<template lang="pug">
field-object(v-for="obj, id in value" :value="obj" :name="name")
</template>

<script lang="ts">
import { RxDocument } from 'rxdb'
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'FieldArray',
  props: {
    document: {
      type: Object as PropType<RxDocument<Record<string, unknown>>>,
      required: true
    },
    value: {
      type: Object as PropType<
        Record<string, RxDocument<Record<string, unknown>>>
      >,
      default: {}
    },
    name: {
      type: String,
      required: true
    }
  }
})
</script>
