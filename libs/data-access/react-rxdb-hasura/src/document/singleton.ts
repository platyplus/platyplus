import { useEffect, useMemo, useState } from 'react'
import { RxQueryResultDoc, useRxData } from 'rxdb-hooks'

import { Contents, ContentsDocument } from '@platyplus/rxdb-hasura'

export const useSingleton = (
  collectionName: string
): Omit<RxQueryResultDoc<Contents>, 'result'> & {
  value: ContentsDocument
} => {
  const { result, isFetching, ...rest } = useRxData<Contents>(
    collectionName,
    (collection) => collection.find().limit(1)
  )
  const [fetching, setFetching] = useState(true)

  const document = useMemo(() => result[0] as ContentsDocument, [result])

  useEffect(() => {
    if (document) {
      setFetching(false)
    }
  }, [document])

  return { value: document, isFetching: fetching, ...rest }
}
