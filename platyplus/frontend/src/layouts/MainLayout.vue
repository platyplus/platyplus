<template lang="pug">
q-layout(view="lHh Lpr lFf")
  q-header(elevated)
    q-toolbar
      q-btn(flat
        dense
        round
        icon="menu"
        aria-label="Menu"
        @click="toggleLeftDrawer")
      q-toolbar-title Platyplus
      div Quasar v{{ $q.version }}
      div.q-gutter-sm.row.items-center.no-wrap(v-if="profile")
        q-btn(round flat :to="{name: 'profile'}")
          q-avatar(size='26px')
            img(v-if="avatar" :src='avatar')
            div(v-else) {{initial}}
          q-tooltip Profile

  q-drawer(v-model="leftDrawerOpen" show-if-above bordered class="bg-grey-1")
    q-list
      template(v-for="group in menu")
        q-item-label.text-grey-8(header) {{group.label}}
        q-item(v-for="item in group.items" :key="item.label" clickable :to="item.to")
          q-item-section(v-if="item.icon" avatar)
            q-icon(:name="item.icon")
          q-item-section
            q-item-label {{item.label}}
            q-item-label(caption) {{item.caption}}
     
  q-page-container
    router-view
</template>

<script lang="ts">
import { useAllowedRoles, useStatus } from '@platyplus/vue-hasura-backend-plus'
import {
  useDisplayName,
  useFilteredMenu,
  useInitial,
  useProfile,
  usePropertyValue,
  useRoleMenu
} from '@platyplus/vue-rxdb-hasura'
import { computed, defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'MainLayout',
  setup() {
    const leftDrawerOpen = ref(false)
    const status = useStatus()
    const profile = useProfile()
    const displayName = useDisplayName(profile)
    const initial = useInitial(displayName)
    const avatar = usePropertyValue<string>(profile, 'avatar_url')
    const roles = useAllowedRoles('me')
    const rolesMenu = useRoleMenu(roles)
    const mainMenu = useFilteredMenu(
      [
        { label: 'Home', icon: 'fas fa-home', to: { name: 'root' } },
        { label: 'Home', icon: 'fas fa-home', to: { name: 'home' } },
        { label: 'Login', icon: 'fas fa-sign-in-alt', to: { name: 'login' } },
        {
          label: 'Register',
          icon: 'fas fa-user-plus',
          to: { name: 'register' }
        },
        { label: 'Debug', icon: 'fas fa-cogs', to: { name: 'debug' } }
      ],
      (_, route) => {
        if (route) {
          if (status.value) {
            return route.meta.auth !== false
          } else {
            return route.meta.auth !== true
          }
        } else return true
      }
    )

    const menu = computed(() => [
      { label: 'Main', items: mainMenu.value },
      ...rolesMenu.value
    ])
    return {
      menu,
      status,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      profile,
      avatar,
      initial
    }
  }
})
</script>
