import React, { useMemo } from 'react'
import { useParams } from 'react-router'
import { useRxQuery } from 'rxdb-hooks'

import { Contents } from '@platyplus/rxdb-hasura'
import { useContentsCollection } from '@platyplus/react-rxdb-hasura'
import { usePageTitle } from '@platyplus/layout'
import { Loading, useQuery } from '@platyplus/navigation'
import { CollectionComponentWrapper } from '../collections'

export const CollectionPage: React.FC = () => {
  const { name } = useParams<{ name: string }>()
  const query = useQuery()
  const edit = query.has('edit')

  const collection = useContentsCollection(name)
  const rxQuery = useMemo(() => collection?.find(), [collection])
  const { isFetching, result } = useRxQuery<Contents>(rxQuery)
  usePageTitle(collection?.title())
  if (isFetching) return <Loading />
  else
    return (
      <CollectionComponentWrapper
        collection={collection}
        data={result}
        edit={edit}
      />
    )
}

export default CollectionPage
