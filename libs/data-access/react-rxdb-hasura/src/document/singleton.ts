import { useEffect, useMemo, useState } from 'react'
import { RxQueryResultDoc, useRxData } from 'rxdb-hooks'

import { Contents } from '@platyplus/rxdb-hasura'
// import { useWatchDocumentValue } from './hooks'

export const useSingleton = (
  collectionName: string
): Omit<RxQueryResultDoc<Contents>, 'result'> & {
  value: Contents
} => {
  // TODO subscribe to changes
  const { result, isFetching, ...rest } = useRxData<Contents>(
    collectionName,
    (collection) => collection.find().limit(1)
  )
  const [fetching, setFetching] = useState(true)

  const document = useMemo(() => result[0] as Contents, [result])
  // const value = useWatchDocumentValue(document)

  useEffect(() => {
    if (document) {
      setFetching(false)
    }
  }, [document])

  return { value: document, isFetching: fetching, ...rest }
}
