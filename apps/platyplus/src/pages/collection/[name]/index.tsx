import { ContentsDocument } from '@platyplus/rxdb-hasura'
import { useContentsCollection, useRxQuery } from '@platyplus/react-rxdb-hasura'
import React, { useMemo } from 'react'
import { List } from 'rsuite'
import { usePageTitle } from '@platyplus/layout'
import { useHistory } from 'react-router'

const CollectionPage: React.FC = () => {
  const router = useHistory()
  const name = router.query.name as string
  const edit = 'edit' in router.query
  const collection = useContentsCollection(name)
  const query = useMemo(() => collection?.find(), [collection])
  const { isFetching, result } = useRxQuery<ContentsDocument>(query)
  usePageTitle(collection?.title())
  // TODO loading
  if (isFetching) return null
  else
    return (
      <List>
        {result.map((item, index) => (
          <List.Item key={index} index={index}>
            <Link href={`/collection/${name}/${item.id}`}>{item.label}</Link>
          </List.Item>
        ))}
      </List>
    )
}

export default CollectionPage
