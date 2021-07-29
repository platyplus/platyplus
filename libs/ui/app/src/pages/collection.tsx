import React, { useCallback, useMemo } from 'react'
import { useParams } from 'react-router'
import { useRxCollection, useRxData } from 'rxdb-hooks'
import { Animation } from 'rsuite'

import {
  Contents,
  ContentsCollection,
  ContentsDocument
} from '@platyplus/rxdb-hasura'
import {
  CollectionTitle,
  useCollectionTitle,
  useConfigEnabled
} from '@platyplus/react-rxdb-hasura'
import { HeaderTitleWrapper } from '@platyplus/layout'
import { useQuery } from '@platyplus/navigation'
import { CollectionComponentWrapper } from '../collections'
import { CollectionToolbar } from '../collections/toolbar'

export const CollectionPage: React.FC = () => {
  const { name } = useParams<{ name: string }>()
  const query = useQuery()
  const edit = useMemo(() => query.has('edit'), [query])
  const enabledConfig = useConfigEnabled()
  const queryConstructor = useCallback(
    (collection) => collection?.find().sort('label'),
    []
  )

  const { isFetching, result } = useRxData<Contents>(name, queryConstructor)
  // TODO review useContentsCollections - it triggers too many rerenders
  const collection = useRxCollection(name) as ContentsCollection
  const [title] = useCollectionTitle(collection)

  return (
    <HeaderTitleWrapper
      title={title}
      component={
        <CollectionTitle editable={enabledConfig} collection={collection} />
      }
    >
      <Animation.Fade in={!isFetching}>
        {(props, ref) => (
          <div {...props}>
            <CollectionToolbar collection={collection} />
            <CollectionComponentWrapper
              config={enabledConfig}
              collection={collection}
              data={result as ContentsDocument[]} // TODO PR useRxQuery type in 'rxdb-hooks'to include Orm methods e.g. useRxQuery<T,U>
              edit={edit}
            />
          </div>
        )}
      </Animation.Fade>
    </HeaderTitleWrapper>
  )
}

export default CollectionPage
