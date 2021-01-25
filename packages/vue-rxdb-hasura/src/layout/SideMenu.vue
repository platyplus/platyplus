<template lang="pug">
transition(name="layout-sidebar")
    .layout-sidebar(v-show="menuActive"
        :class="sidebarClass"
        @click="onSidebarClick")  
        div {{modelValue}}
        .layout-logo    
            router-link(:to="{name: 'home'}")
                img(alt="Logo" :src="logo")
        h-profile(v-if="status")
        h-menu(:model="menu" @item-click="onItemClick")
</template>

<script lang="ts">
import { useStatus } from '@platyplus/vue-hasura-backend-plus'
import { useFilteredMenu, useFullMenu } from '@platyplus/vue-rxdb-hasura'
import { useToast } from 'primevue/usetoast'
import { computed, defineComponent, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
export default defineComponent({
  name: 'SideMenu',
  props: {
    modelValue: Boolean
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    onMounted(() => {
      // TODO not sure it's usefull
      if (mobileMenuActive.value)
        addClass(document.body, 'body-overflow-hidden')
      else removeClass(document.body, 'body-overflow-hidden')
    })

    watch(
      () => props.modelValue,
      val => {
        console.log('CHange model value', val)
      },
      { immediate: true }
    )
    const toast = useToast()
    const layoutColorMode = ref('dark')
    const staticMenuInactive = ref(false)
    const overlayMenuActive = ref(false)
    const mobileMenuActive = ref(false)
    const route = useRoute()
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
    watch(
      () => route.path,
      () => {
        menuActive.value = false
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ;(toast as any).removeAllGroups()
      }
    )

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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onItemClick = (event: any) => {
      console.log('onItemClick')
      if (event.item && !event.item.items) {
        menuActive.value = false
      }
    }

    const menuActive = computed({
      get() {
        if (isDesktop.value) {
          return props.modelValue
        } else {
          return true
        }
      },
      set(value: boolean) {
        console.log('set menuActive')
        emit('update:modelValue', value)
      }
    })
    const isPanelOpen = ref(true)
    return {
      isPanelOpen,
      menuActive,
      sidebarClass,
      logo,
      menu,
      status,
      onItemClick
    }
  }
})
</script>
