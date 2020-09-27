<template lang="pug">
q-btn(@click='logout', round, flat, icon='exit_to_app')
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'

import { useAuth } from '../composables'
import { handleAxiosRequest } from '../utils'

export default defineComponent({
  name: 'Logout',

  setup(_, { root: { $router } }) {
    const auth = useAuth()
    const error = ref('')
    const logout = async () => {
      if (auth) {
        await handleAxiosRequest(() => auth.logout(true), error)
        if (!error.value) {
          try {
            await $router.push('/')
            // eslint-disable-next-line no-empty
          } catch (err) {}
        }
      }
    }
    return { logout, error }
  }
})
</script>
