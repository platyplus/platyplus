import { useCollections } from './collection'

export type MenuItem = {
  label: string
  icon?: string
  to?: any
  items?: MenuItem[]
  command?: () => void
}

/*
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

    return roles.map(role => ({
      label: role,
      items: Object.values(collections.value)
        .filter(collection => collection.role === role)
        // * Always hide unecessary system collections
        .filter(
          collection =>
            !(
              collection.metadata.table_schema === 'metadata' &&
              ['property_config', 'table_config'].includes(
                collection.metadata.table_name as string
              )
            )
        )
        .map(collection => {
          return {
            label: collection.title(),
            icon: collection.icon() || 'fas fa-table',
            to: {
              name: 'collection',
              params: {
                name: collection.name
              }
            }
          }
        })
    }))
  })
}
*/
