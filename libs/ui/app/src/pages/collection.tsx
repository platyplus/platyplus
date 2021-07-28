import React, { useCallback } from 'react'
import { useParams } from 'react-router'
import { useRxData } from 'rxdb-hooks'
import { Animation } from 'rsuite'

import { Contents, ContentsDocument } from '@platyplus/rxdb-hasura'
import {
  CollectionTitle,
  useCollectionTitle,
  useConfigEnabled,
  useContentsCollection
} from '@platyplus/react-rxdb-hasura'
import { HeaderTitleWrapper } from '@platyplus/layout'
import { useQuery } from '@platyplus/navigation'
import { CollectionComponentWrapper } from '../collections'
import { CollectionToolbar } from '../collections/toolbar'

export const CollectionPage: React.FC = () => {
  const { name } = useParams<{ name: string }>()
  const query = useQuery()
  const edit = query.has('edit')
  const enabledConfig = useConfigEnabled()
  const queryConstructor = useCallback(
    (collection) => collection?.find().sort('label'),
    []
  )

  const { isFetching, result } = useRxData<Contents>(name, queryConstructor)

  const collection = useContentsCollection(name)
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
