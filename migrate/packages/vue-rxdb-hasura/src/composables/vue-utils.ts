import { paramCase } from 'param-case'
import { computed, ComputedRef, getCurrentInstance, Ref, unref } from 'vue'

export const useComponentsList = (
  prefix: string | Ref<string> = ''
): ComputedRef<string[]> => {
  const instance = getCurrentInstance()
  return computed(() =>
    instance
      ? Object.keys(instance.appContext.components)
          .map(name => paramCase(name))
          .filter(name => name.startsWith(unref(prefix)))
          .map(name => name.slice(unref(prefix).length))
      : []
  )
}
