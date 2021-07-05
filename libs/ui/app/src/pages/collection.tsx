import { useMemo } from 'react'
import { List } from 'rsuite'
import { useParams } from 'react-router'
import { useRxQuery } from 'rxdb-hooks'
import { Link } from 'react-router-dom'

import { ContentsDocument } from '@platyplus/rxdb-hasura'
import { useContentsCollection } from '@platyplus/react-rxdb-hasura'
import { usePageTitle } from '@platyplus/layout'
import { Loading, useQuery } from '@platyplus/navigation'

export const CollectionPage: React.FC = () => {
  const { name } = useParams<{ name: string }>()
  const query = useQuery()
  const edit = query.has('edit')

  const collection = useContentsCollection(name)
  const rxQuery = useMemo(() => collection?.find(), [collection])
  const { isFetching, result } = useRxQuery<ContentsDocument>(rxQuery)
  usePageTitle(collection?.title())
  if (isFetching) return <Loading />
  else
    return (
      <List>
        {result.map((item, index) => (
          <List.Item key={index} index={index}>
            <Link to={`/collection/${name}/${item.id}`}>{item.label}</Link>
          </List.Item>
        ))}
      </List>
    )
}

export default CollectionPage
