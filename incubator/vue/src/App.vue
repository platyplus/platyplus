<template lang="pug">
.layout-wrapper.layout-static(:class="containerClass" @click="onWrapperClick")
  h-topbar(@menu-toggle="onMenuToggle")
  transition(name="layout-sidebar")
    .layout-sidebar.layout-sidebar-dark(v-show="menuActive" @click="onSidebarClick")  
      .layout-logo    
        router-link(:to="{name: 'home'}")
          img(alt="Logo" src="assets/layout/images/logo-white.svg")
      h-profile(v-if="status")
      h-menu(:model="menu" @menuitem-click="onMenuItemClick")
  .layout-main
    .p-grid
      .p-col-12
        p-confirm-dialog
        div(v-if="isAuthRoute")
          router-view(v-if="isReady")
          div(v-else) loading database...
        router-view(v-else)
        p-scroll-top
  h-footer
</template>

<script lang="ts">
import { useStatus } from '@platyplus/vue-hasura-backend-plus'
import {
  useFilteredMenu,
  useFullMenu,
  useIsReady
} from '@platyplus/vue-rxdb-hasura'
import { useWindowSize } from '@vueuse/core'
import { useToast } from 'primevue/usetoast'
import { computed, defineComponent, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  setup() {
    const toast = useToast()
    const staticMenuInactive = ref(false)
    const mobileMenuActive = ref(false)
    const menuClick = ref(false)
    const route = useRoute()
    const isAuthRoute = computed(() => !!route.meta.auth)
    const fullMenu = useFullMenu()
    const menu = useFilteredMenu(fullMenu, (item, r) => {
      if (r) {
        if (status.value) {
          return r.meta.auth !== false
        } else {
          return r.meta.auth !== true
        }
      } else return true
    })

    const status = useStatus()
    const isReady = useIsReady()

    watch(
      () => route.path,
      () => {
        menuActive.value = false
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ;(toast as any).removeAllGroups()
      }
    )

    const containerClass = computed(() => [
      {
        'layout-static-sidebar-inactive': staticMenuInactive.value,
        'layout-mobile-sidebar-active': mobileMenuActive.value
      }
    ])

    const { width } = useWindowSize()
    const isDesktop = computed(() => width.value > 1024)

    const onWrapperClick = () => {
      if (!menuClick.value) menuActive.value = false
      menuClick.value = false
    }

    const onMenuToggle = (event: Event) => {
      menuClick.value = true
      if (isDesktop.value) staticMenuInactive.value = !staticMenuInactive.value
      else mobileMenuActive.value = !mobileMenuActive.value
      event.preventDefault()
    }

    const onSidebarClick = () => {
      menuClick.value = true
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onMenuItemClick = (event: any) => {
      if (event.item && !event.item.items) {
        menuActive.value = false
      }
    }

    const menuActive = computed({
      get() {
        if (isDesktop.value) {
          return !staticMenuInactive.value
        } else {
          return true
        }
      },
      set(value: boolean) {
        mobileMenuActive.value = value
      }
    })

    return {
      isReady,
      isAuthRoute,
      containerClass,
      menu,
      menuActive,
      onMenuItemClick,
      onMenuToggle,
      onSidebarClick,
      onWrapperClick,
      status
    }
  }
})
</script>

<style lang="scss">
@import './App.scss';
</style>
