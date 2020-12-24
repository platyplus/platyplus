import { Context } from '@nuxt/types'
import {
  computed,
  ComputedRef,
  Ref,
  ref,
  useContext
} from '@nuxtjs/composition-api'
import { LoginData } from 'nhost-js-sdk/dist/types'

import { HasuraClaims } from './types'

export const useLogin = (
  email: Ref<string>,
  password: Ref<string>
): {
  login: () => Promise<void>
  data: Readonly<Ref<LoginData | undefined>>
  error: Readonly<Ref<string | undefined>>
} => {
  const context = useContext()
  const error = ref()
  const data = ref()
  return {
    login: async (): Promise<void> => {
      try {
        error.value = undefined
        data.value = await context.$auth.login(email.value, password.value)
      } catch (err) {
        error.value = err
      }
    },
    data,
    error
  }
}

export const useLogout = (allDevices?: Ref<boolean>): (() => Promise<void>) => {
  const context = useContext()
  return () => context.$auth.logout(allDevices?.value)
}

export const useRegister = (
  email: Ref<string>,
  password: Ref<string>
): {
  register: () => Promise<void>
  error: Readonly<Ref<string | undefined>>
} => {
  const context = useContext()
  const error = ref()
  return {
    register: async (): Promise<void> => {
      try {
        error.value = undefined
        context.$auth.register(email.value, password.value)
      } catch (err) {
        error.value = err
      }
    },
    error
  }
}

export const useStatus = (context: Context): ComputedRef<boolean> => {
  return computed(() => !!context.$auth.getJWTToken())
}

export const useHasuraClaims = (
  context: Context
): ComputedRef<HasuraClaims | undefined> =>
  computed(() => context.$hasuraClaims)

export const useJWT = (context: Context): ComputedRef<string> =>
  computed(() => context.$auth.getJWTToken())
