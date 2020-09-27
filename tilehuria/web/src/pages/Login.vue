<template lang="pug">
  q-page.row.items-center.justify-evenly
    p-login.col-12.q-pa-xl
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import PLogin from 'components/Login.vue'
export default defineComponent({
  name: 'PageLogin',
  components: { PLogin },
  setup() {
    return {}
  }
})
</script>
