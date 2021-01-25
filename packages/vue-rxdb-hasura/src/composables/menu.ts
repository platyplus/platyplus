import { computed, ComputedRef, Ref, unref } from 'vue'
import { RouteLocation, RouteLocationRaw, useRouter } from 'vue-router'

import { useCollections } from './collection'

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
): Readonly<Ref<MenuItem[]>> => {
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

export const useRoleMenu = (
  role: string | string[] | Ref<string | string[]> = 'user'
): ComputedRef<MenuItem[]> => {
  const collections = useCollections()
  return computed<MenuItem[]>(() => {
    const unwrappedRole = unref(role)
    const roles = Array.isArray(unwrappedRole) ? unwrappedRole : [unwrappedRole]
    return Object.values(collections.value)
      .filter(collection => roles.includes(collection.role)) // * Show only collections from the given user role
      .map(collection => {
        return {
          label: collection.title(),
          icon: `pi pi-fw ${collection.icon() || 'pi-table'}`,
          to: {
            name: 'collection',
            params: {
              name: collection.name
            }
          }
        }
      })
  })
}

export const useFullMenu = (
  role: string | string[] | Ref<string | string[]> = 'user'
): ComputedRef<MenuItem[]> => {
  const roleMenu = useRoleMenu(role)
  return computed<MenuItem[]>(() => {
    return [
      { label: 'Home', icon: 'pi pi-fw pi-home', to: { name: 'root' } },
      { label: 'Home', icon: 'pi pi-fw pi-home', to: { name: 'home' } },
      { label: 'Login', icon: 'pi pi-fw pi-sign-in', to: { name: 'login' } },
      {
        label: 'Register',
        icon: 'pi pi-fw pi-user-plus',
        to: { name: 'register' }
      },
      ...roleMenu.value
    ]
  })
}
