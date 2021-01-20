import { useCollections } from '@platyplus/vue-rxdb-hasura'
import { computed, ComputedRef } from 'vue'

import { MenuItem } from './composables/menu'

export const useMenu = (): ComputedRef<MenuItem[]> => {
  const collections = useCollections()
  return computed<MenuItem[]>(() => [
    { label: 'Home', icon: 'pi pi-fw pi-home', to: '/' },
    { label: 'Home', icon: 'pi pi-fw pi-home', to: '/home' },
    { label: 'Login', icon: 'pi pi-fw pi-sign-in', to: '/login' },
    { label: 'Register', icon: 'pi pi-fw pi-user-plus', to: '/register' },
    ...Object.values(collections.value)
      .filter(collection => !collection.role) // * Show only collections from the default role
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
  ])
}
