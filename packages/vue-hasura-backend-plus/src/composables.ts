import { LoginData } from 'nhost-js-sdk/dist/types'
import { computed, ComputedRef, inject, Ref, ref } from 'vue-demi'

import { DefaultHasuraBackendPlusKey } from './inject-key'
import { Instance } from './instance'
import { HasuraClaims } from './types'

const injectInstance = () => {
  const instance = inject<Instance>(DefaultHasuraBackendPlusKey)
  if (!instance) throw Error('No HBP instance')
  return instance
}

export const useStatus = (): Readonly<Ref<boolean>> =>
  injectInstance().authenticated

export const useLogin = (
  email: Ref<string>,
  password: Ref<string>
): {
  login: () => Promise<void>
  data: Readonly<Ref<LoginData | undefined>>
  error: Readonly<Ref<string | undefined>>
} => {
  const { auth } = injectInstance()
  const error = ref()
  const data = ref()
  return {
    login: async (): Promise<void> => {
      try {
        error.value = undefined
        data.value = await auth.login(email.value, password.value)
      } catch (err) {
        error.value = err
      }
    },
    data,
    error
  }
}

export const useLogout = (allDevices?: Ref<boolean>): (() => Promise<void>) => {
  const { auth } = injectInstance()
  return () => auth.logout(allDevices?.value)
}

export const useRegister = (
  email: Ref<string>,
  password: Ref<string>
): {
  register: () => Promise<void>
  error: Readonly<Ref<string | undefined>>
} => {
  const { auth } = injectInstance()
  const error = ref()
  return {
    register: async (): Promise<void> => {
      try {
        error.value = undefined
        await auth.register(email.value, password.value)
        // TODO handle account activation
        await auth.login(email.value, password.value)
      } catch (err) {
        error.value = err
      }
    },
    error
  }
}

export const useHasuraClaims = (): Readonly<Ref<HasuraClaims | undefined>> =>
  injectInstance().claims

export const useJWT = (): ComputedRef<string | undefined> => {
  const instance = injectInstance()
  return computed(() => instance.token.value)
}

export const useAllowedRoles = (): Readonly<Ref<string[]>> => {
  const instance = injectInstance()
  return computed(() => instance.claims.value?.['x-hasura-allowed-roles'] || [])
}

export const useDefaultRole = (): Readonly<Ref<string | undefined>> => {
  const instance = injectInstance()
  return computed(() => instance.claims.value?.['x-hasura-default-role'])
}
