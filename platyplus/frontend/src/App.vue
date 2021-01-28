<template lang="pug">
h-app-wrapper
 template(#menu)
    .layout-logo
      router-link(:to="{name: 'root'}")
        img(alt="Logo" src="assets/layout/images/logo-white.svg")
    h-profile(v-if="status")
    h-menu(:model="menu")
</template>

<script lang="ts">
import { useAllowedRoles, useStatus } from '@platyplus/vue-hasura-backend-plus'
import { useFilteredMenu, useFullMenu } from '@platyplus/vue-rxdb-hasura'
import { computed, defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const status = useStatus()
    const roles = useAllowedRoles('me')
    const fullMenu = useFullMenu(roles)
    const fullAppMenu = computed(() => [
      ...fullMenu.value,
      { label: 'Debug', icon: 'pi pi-fw pi-cog', to: { name: 'debug' } }
    ])
    const menu = useFilteredMenu(fullAppMenu, (_, route) => {
      if (route) {
        if (status.value) {
          return route.meta.auth !== false
        } else {
          return route.meta.auth !== true
        }
      } else return true
    })

    return {
      menu,
      status
    }
  }
})
</script>
