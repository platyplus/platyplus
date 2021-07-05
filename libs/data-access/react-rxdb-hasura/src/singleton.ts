import { useEffect, useState } from 'react'
import { useRxData } from 'rxdb-hooks'

import { ContentsDocument } from '@platyplus/rxdb-hasura'

export const useSingleton = (
  collectionName: string
): Readonly<ContentsDocument | undefined> => {
  const [document, setDocument] = useState<ContentsDocument | undefined>()
  const { result } = useRxData<ContentsDocument>(collectionName, (collection) =>
    collection.find().limit(1)
  )
  useEffect(() => {
    setDocument(result[0])
  }, [result])
  return document
}
