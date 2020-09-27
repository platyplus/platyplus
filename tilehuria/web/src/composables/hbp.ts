import {
  computed,
  inject,
  InjectionKey,
  provide,
  Ref,
  ref
} from '@vue/composition-api'
import nhost from 'nhost-js-sdk'
import Auth from 'nhost-js-sdk/dist/Auth'
import Storage from 'nhost-js-sdk/dist/Storage'
import { HBP_ENDPOINT } from 'src/config'

const config = {
  base_url: HBP_ENDPOINT
}

nhost.initializeApp(config)
let auth: Auth | undefined

const AuthSymbol: InjectionKey<Auth> = Symbol()
const StorageSymbol: InjectionKey<Storage> = Symbol()

export function provideAuth(): void {
  if (!auth) auth = nhost.auth()
  provide(AuthSymbol, auth)
}

export function provideStorage(): void {
  provide(StorageSymbol, nhost.storage())
}

export const useAuth = (): Auth | undefined => {
  return inject(AuthSymbol) || undefined
}

export const useStorage = (): Storage | undefined => {
  const storage = inject(StorageSymbol)
  return storage ? storage : undefined
}

export const useConnectionStatus = (): Readonly<Ref<boolean>> => {
  const auth = useAuth()
  const status = ref(!!auth?.isAuthenticated())
  auth?.onAuthStateChanged(() => {
    status.value = !!auth.isAuthenticated()
  })
  return computed(() => status.value)
}

// ! Only used with Vue router. When vue router is not called outside of
export const getAuth = (): Auth => {
  if (!auth) auth = nhost.auth()
  return auth
}
