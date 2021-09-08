import { useEffect, useMemo, useState } from 'react'
import { RxQueryResultDoc, useRxData } from 'rxdb-hooks'

import { RxDocument } from 'rxdb'
import { Contents } from '@platyplus/rxdb-hasura'

export const useSingleton = <T = Contents, U = RxDocument<T, unknown>>(
  collectionName: string
): Omit<RxQueryResultDoc<T>, 'result'> & {
  value: RxDocument<T, U>
} => {
  const { result, isFetching, ...rest } = useRxData<T>(
    collectionName,
    (collection) => collection.find().limit(1)
  )
  const [fetching, setFetching] = useState(true)

  const document = useMemo(() => result[0] as RxDocument<T, U>, [result])

  useEffect(() => {
    if (document) {
      setFetching(false)
    }
  }, [document])

  return { value: document, isFetching: fetching, ...rest }
}
