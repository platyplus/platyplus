<template lang="pug">
  q-page.row.items-center.justify-evenly
    p-register
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import PRegister from 'components/Register.vue'
export default defineComponent({
  name: 'PageRegistration',
  components: { PRegister },
  setup() {
    return {}
  }
})
</script>
