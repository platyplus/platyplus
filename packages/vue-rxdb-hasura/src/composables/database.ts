import { Database } from '@platyplus/rxdb-hasura'
import { toObserver, useSubscription } from '@vueuse/rxjs'
import { computed, ComputedRef, inject, Ref, ref, watch } from 'vue'

import { DefaultRxDBKey } from '../plugin'

export const useDB = (): ComputedRef<Database | undefined> => {
  const db = inject<Ref<Database | undefined>>(DefaultRxDBKey)
  return computed(() => db?.value)
}

export const useIsReady = (): Readonly<Ref<Readonly<boolean>>> => {
  const db = inject<Ref<Database | undefined>>(DefaultRxDBKey)
  const ready = ref(false)
  watch(
    () => db?.value,
    (database: Database | undefined) => {
      if (database) {
        ready.value = database.ready$.getValue()
        useSubscription(database?.ready$.subscribe(toObserver(ready)))
      }
    }
  )
  return ready
}
