<template lang="pug">
.layout-wrapper(:class="containerClass" @click="onWrapperClick")
  TopBar(@menu-toggle="onMenuToggle")
  transition(name="layout-sidebar")
    .layout-sidebar(v-show="menuActive"
      :class="sidebarClass"
      @click="onSidebarClick")  
      .layout-logo    
        router-link(to="/")
          img(alt="Logo" :src="logo")
      Profile(v-if="status")
      Menu(:model="menu" @menuitem-click="onMenuItemClick")
  .layout-main
    .p-grid
      .p-col-12
        ConfirmDialog
        div(v-if="isAuthRoute")
          router-view(v-if="isReady")
          div(v-else) loading database...
        router-view(v-else)
        ScrollTop
  Footer
</template>

<script lang="ts">
import { useStatus } from '@platyplus/vue-hasura-backend-plus'
import { useIsReady } from '@platyplus/vue-rxdb-hasura'
import { useToast } from 'primevue/components/toast/useToast'
import { computed, defineComponent, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

import { useFilteredMenu } from './composables'
import Footer from './layout/Footer.vue'
import Menu from './layout/Menu.vue'
import Profile from './layout/Profile.vue'
import TopBar from './layout/Topbar.vue'
import { useMenu } from './menu'

export default defineComponent({
  components: {
    TopBar,
    Profile,
    Menu,
    Footer
  },
  setup() {
    onMounted(() => {
      // TODO not sure it's usefull
      if (mobileMenuActive.value)
        addClass(document.body, 'body-overflow-hidden')
      else removeClass(document.body, 'body-overflow-hidden')
    })

    const toast = useToast()
    const layoutColorMode = ref('dark')
    const layoutMode = ref('static')
    const staticMenuInactive = ref(false)
    const overlayMenuActive = ref(false)
    const mobileMenuActive = ref(false)
    const menuClick = ref(false)
    const route = useRoute()
    const isAuthRoute = computed(() => !!route.meta.auth)
    const fullMenu = useMenu()
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
        'layout-overlay': layoutMode.value === 'overlay',
        'layout-static': layoutMode.value === 'static',
        'layout-static-sidebar-inactive':
          staticMenuInactive.value && layoutMode.value === 'static',
        'layout-overlay-sidebar-active':
          overlayMenuActive.value && layoutMode.value === 'overlay',
        'layout-mobile-sidebar-active': mobileMenuActive.value
        // TODO
        // 'p-input-filled': this.$appState.inputStyle === 'filled',
        // 'p-ripple-disabled': this.$primevue.ripple === false
      }
    ])
    const sidebarClass = computed(() => [
      layoutColorMode.value === 'dark'
        ? 'layout-sidebar-dark'
        : 'layout-sidebar-light'
    ])

    const logo = computed(() => 'assets/layout/images/logo-white.svg')

    const addClass = (element: Element, className: string) => {
      if (element.classList) element.classList.add(className)
      else element.className += ' ' + className
    }
    const removeClass = (element: Element, className: string) => {
      if (element.classList) element.classList.remove(className)
      else
        element.className = element.className.replace(
          new RegExp(
            '(^|\\b)' + className.split(' ').join('|') + '(\\b|$)',
            'gi'
          ),
          ' '
        )
    }

    const isDesktop = computed(() => window.innerWidth > 1024)

    const onWrapperClick = () => {
      if (!menuClick.value) {
        menuActive.value = false
      }
      menuClick.value = false
    }
    const onMenuToggle = (event: Event) => {
      menuClick.value = true
      // TODO messy
      if (isDesktop.value) {
        if (layoutMode.value === 'overlay') {
          if (mobileMenuActive.value === true) {
            overlayMenuActive.value = true
          }
          overlayMenuActive.value = !overlayMenuActive.value
          mobileMenuActive.value = false
        } else if (layoutMode.value === 'static') {
          staticMenuInactive.value = !staticMenuInactive.value
        }
      } else {
        mobileMenuActive.value = !mobileMenuActive.value
      }
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
          if (layoutMode.value === 'static') return !staticMenuInactive.value
          else if (layoutMode.value === 'overlay')
            return overlayMenuActive.value
          else return true
        } else {
          return true
        }
      },
      set(value: boolean) {
        overlayMenuActive.value = value
        mobileMenuActive.value = value
      }
    })

    return {
      isReady,
      isAuthRoute,
      containerClass,
      logo,
      menu,
      menuActive,
      onMenuItemClick,
      onMenuToggle,
      onSidebarClick,
      onWrapperClick,
      sidebarClass,
      status
    }
  }
})
</script>

<style lang="scss">
@import './App.scss';
</style>
