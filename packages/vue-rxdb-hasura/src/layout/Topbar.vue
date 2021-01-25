<template lang="pug">
.layout-topbar
  button.p-link.layout-menu-button(@click='onMenuToggle')
    span.pi.pi-bars
  .layout-topbar-icons
    span.layout-topbar-search
      p-input-text(type='text' placeholder='Search')
        span.layout-topbar-search-icon.pi.pi-search
    button.p-link
      span.layout-topbar-item-text Events
      span.layout-topbar-icon.pi.pi-calendar
      span.layout-topbar-badge 5
    button.p-link(v-if="false")
      span.layout-topbar-item-text Settings
      span.layout-topbar-icon.pi.pi-cog
    router-link(v-if="connected" :to="{ name: 'profile' }")
      button.p-link
        span.layout-topbar-item-text User
        span.layout-topbar-icon.pi.pi-user

</template>
<script lang="ts">
import { useStatus } from '@platyplus/vue-hasura-backend-plus'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Topbar',
  emits: ['menu-toggle'],
  setup(_, { emit }) {
    const onMenuToggle = (event: Event) => {
      emit('menu-toggle', event)
    }
    const connected = useStatus()
    return { onMenuToggle, connected }
  }
})
</script>
