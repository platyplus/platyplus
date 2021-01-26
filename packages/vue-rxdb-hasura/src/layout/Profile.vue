<template lang="pug">
.layout-profile(v-if="profile")
  div
    p-avatar(v-if="profile.avatar_url" :image="profile.avatar_url" size="xlarge" label="")
    p-avatar.p-mb-1(v-else :label="initial" shape="circle" size="xlarge" style="background-color:#2196F3; color: #ffffff")
  button.p-link.layout-profile-link(@click='toggle()')
    span.username {{displayName}}
    i.pi.pi-fw.pi-cog
  transition(name='layout-submenu-wrapper')
    ul(v-show='expanded')
      li
        router-link(:to="{ name: 'profile' }")
          button.p-link
            i.pi.pi-fw.pi-user
            span Profile
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

import { useDB, useDisplayName, useInitial, useProfile } from '../composables'

export default defineComponent({
  name: 'Profile',
  setup() {
    const db = useDB()
    const [expanded, toggle] = useToggle(false)
    const router = useRouter()
    const hbpLogout = useLogout()
    const profile = useProfile()
    const logout = async () => {
      await hbpLogout()
      // * destroy RXDB databases as well
      // ? => in vue-rxdb plugin ?
      // TODO not sure it's working
      await db.value?.remove()
      router.push({ name: 'root' })
    }
    const displayName = useDisplayName(profile)
    const initial = useInitial(displayName)
    return { expanded, toggle, logout, profile, displayName, initial }
  }
})
</script>

<style>
.p-avatar-image img {
  border-radius: 50%;
}
</style>
