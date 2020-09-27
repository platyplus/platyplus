<template lang="pug">
q-layout(view='lHh Lpr lFf')
  q-header(elevated)
    q-toolbar
      q-btn(
        v-if='connected',
        flat,
        dense,
        round,
        icon='menu',
        aria-label='Menu',
        @click='leftDrawerOpen = !leftDrawerOpen'
      )
      q-toolbar-title TileHuria
      p-logout(v-if='connected')
      q-btn(v-else, to='/login', round, flat, icon='login')
  q-drawer(
    v-if='connected',
    v-model='leftDrawerOpen',
    show-if-above,
    bordered,
    content-class='bg-grey-1'
  )
    q-list
      q-item-label.text-grey-8(header) Menu
      p-link(v-for='link in links', :key='link.title', v-bind='link')
  q-page-container
    router-view
</template>

<script>
import { defineComponent, ref } from '@vue/composition-api'
import PLink from 'components/Link.vue'
import PLogout from 'components/Logout.vue'
import { useConnectionStatus } from 'src/composables'

const links = [
  {
    title: 'Areas of interest',
    caption: 'List the areas of interest',
    icon: 'layers',
    to: '/areas-of-interest'
  },
  {
    title: 'Tile providers',
    // caption: 'List the areas of interest',
    icon: 'widgets',
    to: '/tile-providers'
  }
]

export default defineComponent({
  name: 'MainLayout',
  components: { PLogout, PLink },
  setup() {
    const leftDrawerOpen = ref(false)
    const connected = useConnectionStatus()
    return { leftDrawerOpen, connected, links }
  }
})
</script>
