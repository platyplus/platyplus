import { ContentsDocument } from '@platyplus/rxdb-hasura'
import { useContentsCollection } from '../../../lib/collection'
import { useRouter } from 'next/router'
import React, { FunctionComponent, useMemo } from 'react'
import { useRxQuery } from 'rxdb-hooks'

const CollectionPage: FunctionComponent = () => {
  const router = useRouter()
  const name = router.query.name as string
  console.log(router.query)
  const collection = useContentsCollection(name)
  const query = useMemo(() => collection?.find(), [collection])
  const { isFetching, result } = useRxQuery<ContentsDocument>(query)
  if (isFetching) return <div>fetching</div>
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

export default CollectionPage
