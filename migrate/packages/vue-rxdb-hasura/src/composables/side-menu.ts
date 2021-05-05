import { useWindowSize } from '@vueuse/core'
import { useToast } from 'primevue/usetoast'
import { computed, Ref, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

export const useSideMenu = (): {
  containerClass: Readonly<Ref<Record<string, string | boolean>[]>>
  menuActive: Readonly<Ref<boolean>>
  // onItemClick: (event: Event) => void
  onMenuToggle: (event: Event) => void
  onSidebarClick: () => void
  onWrapperClick: () => void
} => {
  const toast = useToast()
  const staticMenuInactive = ref(false)
  const mobileMenuActive = ref(false)
  const menuClick = ref(false)
  const route = useRoute()

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
  // const onItemClick = (event: any) => {
  //   console.log('item click')
  //   if (event.item && !event.item.items) {
  //     menuActive.value = false
  //   }
  // }

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
    containerClass,
    menuActive,
    // onItemClick,
    onMenuToggle,
    onSidebarClick,
    onWrapperClick
  }
}
