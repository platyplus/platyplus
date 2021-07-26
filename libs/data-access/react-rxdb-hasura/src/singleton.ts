import { useEffect, useMemo, useState } from 'react'
import { RxQueryResultDoc, useRxData } from 'rxdb-hooks'

import { Contents, ContentsDocument } from '@platyplus/rxdb-hasura'

export const useSingleton = (
  collectionName: string
): Omit<RxQueryResultDoc<Contents>, 'result'> & {
  value?: Contents
  document: ContentsDocument
} => {
  // TODO subscribe to changes
  const { result, isFetching, ...rest } = useRxData<Contents>(
    collectionName,
    (collection) => collection.find().limit(1)
  )
  const [fetching, setFetching] = useState(true)

  const document = useMemo(() => result[0] as ContentsDocument, [result])
  const [value, setValue] = useState<Contents>()
  useEffect(() => {
    if (document) {
      setFetching(false)
      const subscription = document.$.subscribe((newValue) =>
        setValue(newValue)
      )
      return () => subscription.unsubscribe()
    }
  }, [document])

  return { value, document, isFetching: fetching, ...rest }
}
