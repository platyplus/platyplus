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
        router-link(:to="{ name: 'document', params: { collection: 'users_me', id: profile.id }}")
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
import { useDB, useSingleton } from '@platyplus/vue-rxdb-hasura'
import { useToggle } from '@vueuse/core'
import { computed, defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const db = useDB()
    const [expanded, toggle] = useToggle(false)
    const router = useRouter()
    const hbpLogout = useLogout()
    const profile = useSingleton('users_me')
    const logout = async () => {
      await hbpLogout()
      // * destroy RXDB databases as well
      // ? => in vue-rxdb plugin ?
      // TODO not sure it's working
      await db.value?.remove()
      router.push('/')
    }
    const displayName = computed<string | undefined>(() => {
      // * Use either 'display_name' or the label, if the label is not the user id.
      const label = profile.value?.label
      return label === profile.value?.id ? profile.value?.display_name : label
    })
    const initial = computed(() => displayName.value?.charAt(0).toUpperCase())
    return { expanded, toggle, logout, profile, displayName, initial }
  }
})
</script>

<style>
.p-avatar-image img {
  border-radius: 50%;
}
</style>
