<template lang="pug">
.layout-wrapper.layout-static(:class="containerClass" @click="onWrapperClick")
  h-topbar(@menu-toggle="onMenuToggle")
  transition(name="layout-sidebar")
    .layout-sidebar.layout-sidebar-dark(v-show="menuActive" @click="onSidebarClick")  
      slot(name="menu")
  slot(name="body")
    .layout-main
      .p-grid
        .p-col-12
          p-confirm-dialog
          div(v-if="isAuthRoute")
            router-view
          router-view(v-else)
        p-scroll-top
  slot(name="footer")
    h-footer
</template>

<script lang="ts">
import { useStatus } from '@platyplus/vue-hasura-backend-plus'
import { useToast } from 'primevue/usetoast'
import { computed, defineComponent, watch } from 'vue'
import { useRoute } from 'vue-router'

import { useSideMenu } from '../composables'

export default defineComponent({
  name: 'AppWrapper',
  setup() {
    const toast = useToast()
    const route = useRoute()
    const isAuthRoute = computed(() => !!route.meta.auth)
    watch(
      () => route.path,
      () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ;(toast as any).removeAllGroups()
      }
    )

    const status = useStatus()

    return {
      ...useSideMenu(),
      isAuthRoute,
      status
    }
  }
})
</script>

<style lang="scss">
@import './App.scss';
</style>
