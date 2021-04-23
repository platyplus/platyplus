import { computed, ComputedRef, Ref } from 'vue'

export const useInitial = (
  input: Ref<string | undefined>
): ComputedRef<string | undefined> =>
  computed(() => input.value?.charAt(0).toUpperCase())
