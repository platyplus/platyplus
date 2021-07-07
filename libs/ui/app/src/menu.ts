import { useContentsCollections } from '@platyplus/react-rxdb-hasura'
import { Icon, MenuItem } from '@platyplus/layout'
import { useEffect, useState } from 'react'

/*
export const useFilteredMenu = (
  menu: MenuItem[],
  filter: (
    item: MenuItem,
    route?: RouteLocation & {
      href: string
    }
  ) => boolean
): Readonly<MenuItem[]> => {
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
*/

export const useRoleMenu = (role: string | string[] = 'user'): MenuItem[] => {
  const collections = useContentsCollections()
  const [menu, setMenu] = useState<MenuItem[]>([])
  useEffect(() => {
    const roles = Array.isArray(role) ? role : [role]
    setMenu(
      roles.map((role) => ({
        title: role,
        icon: 'database',
        children: Object.values(collections)
          .filter((collection) => collection.role === role)
          // * Always hide unecessary system collections
          .filter(
            (collection) =>
              !(
                collection.metadata.table_schema === 'metadata' &&
                ['property_config', 'table_config'].includes(
                  collection.metadata.table_name as string
                )
              )
          )
          .map((collection) => {
            return {
              title: collection.title(),
              icon: (collection.icon() as Icon) || 'table',
              href: `/collection/${collection.name}`
              // children: []
              // to: {
              //   name: 'collection',
              //   params: {
              //     name: collection.name
              //   }
              // }
            }
          })
      }))
    )
  }, [role, collections])
  return menu
}
