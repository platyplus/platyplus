<template lang="pug">
q-page.row.items-center.justify-evenly
  div(v-if='connected') Connected. Show home
  template(v-else)
    q-btn(to='/login') Sign in
    q-btn(to='/register') Sign up
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import PLogout from 'components/Logout.vue'
import { useConnectionStatus } from 'src/composables'
export default defineComponent({
  name: 'PageIndex',
  components: { PLogout },
  setup() {
    const connected = useConnectionStatus()
    return { connected }
  }
})
</script>
