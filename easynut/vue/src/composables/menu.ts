import { computed, ComputedRef, Ref, unref } from 'vue'
import { RouteLocation, RouteLocationRaw, useRouter } from 'vue-router'
export type MenuItem = {
  label: string
  icon: string
  to?: RouteLocationRaw
  items?: MenuItem[]
  command?: () => void
}

export const useFilteredMenu = (
  menu: Ref<MenuItem[]> | MenuItem[],
  filter: (
    item: MenuItem,
    route?: RouteLocation & {
      href: string
    }
  ) => boolean
): ComputedRef<MenuItem[]> => {
  const router = useRouter()

  const recursiveFilter = (items: MenuItem[]) =>
    items
      .filter(item => {
        const route =
          item.to === undefined ? undefined : router.resolve(item.to)
        return filter(item, route)
      })
      .map(item => {
        if (item.items) item.items = recursiveFilter(item.items)
        return item
      })

  return computed(() => recursiveFilter(unref(menu)))
}
