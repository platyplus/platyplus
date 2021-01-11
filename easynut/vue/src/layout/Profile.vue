<template lang="pug">
.layout-profile
  div
    img(src='assets/layout/images/profile.png' alt='')
  button.p-link.layout-profile-link(@click='toggle()')
    span.username Claire Williams
    i.pi.pi-fw.pi-cog
  transition(name='layout-submenu-wrapper')
    ul(v-show='expanded')
      li
        button.p-link
          i.pi.pi-fw.pi-user
          span Account
      li
        button.p-link
          i.pi.pi-fw.pi-inbox
          span Notifications
          span.menuitem-badge 2
      li
        button.p-link(@click="logout")
          i.pi.pi-fw.pi-power-off
          span Logout
</template>

<script lang="ts">
import { useLogout } from '@platyplus/vue-hasura-backend-plus'
import { useToggle } from '@vueuse/core'
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const [expanded, toggle] = useToggle(false)
    const router = useRouter()
    const hbpLogout = useLogout()
    const logout = async () => {
      await hbpLogout()
      // TODO destroy RXDB databases as well => in vue-rxdb plugin
      router.push('/')
    }
    return { expanded, toggle, logout }
  }
})
</script>

<style scoped></style>
