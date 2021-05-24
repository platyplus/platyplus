import { ContentsCollection, ContentsDocument } from '@platyplus/rxdb-hasura'
import { useContentsCollection } from '../../../lib/collection'
import { useRouter } from 'next/router'
import React, { FunctionComponent, useMemo } from 'react'
import { useRxQuery } from 'rxdb-hooks'

const CollectionComponent: FunctionComponent<{
  collection: ContentsCollection
}> = ({ collection }) => {
  const query = useMemo(() => collection.find(), [collection])
  const { isFetching, result } = useRxQuery<ContentsDocument>(query)
  if (isFetching) return <div>loading contents...</div>
  else
    return (
      <div>
        <div>Collection</div>
        {result.map((item, index) => (
          <div key={index}>{item.test} </div>
        ))}
      </div>
    )
}

const CollectionPage: FunctionComponent = () => {
  const router = useRouter()
  const name = router.query.name as string
  const collection = useContentsCollection(name)
  if (collection) return <CollectionComponent collection={collection} />
  else return <div>looking for collection...</div>
}

export default CollectionPage
