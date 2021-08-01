import React, { useMemo } from 'react'
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
  useMetadataTitle,
  useConfigEnabled,
  usePopulatedCollection,
  useCollectionMetadata,
  useMetadata,
  useCollectionName
} from '@platyplus/react-rxdb-hasura'
import { HeaderTitleWrapper } from '@platyplus/layout'
import { useQuery } from '@platyplus/navigation'
import { CollectionComponentWrapper } from '../collections'
import { CollectionToolbar } from '../collections/toolbar'

export const CollectionPage: React.FC = () => {
  const { name, role } = useParams<{ name: string; role: string }>()
  const query = useQuery()
  const edit = useMemo(() => query.has('edit'), [query])
  const enabledConfig = useConfigEnabled()

  const metadata = useMetadata(name)
  const collectionName = useCollectionName(metadata, role)
  const { isFetching, result } = usePopulatedCollection(collectionName)
  // TODO review useContentsCollections - it triggers too many rerenders
  // TODO understand why rxdb-hooks trigger so many re-renders

  const [title] = useMetadataTitle(metadata)

  if (!metadata) return null
  return (
    <HeaderTitleWrapper
      title={title}
      component={
        <CollectionTitle editable={enabledConfig} metadata={metadata} />
      }
    >
      <Animation.Fade in={!isFetching}>
        {(props, ref) => (
          <div {...props}>
            <CollectionToolbar metadata={metadata} role={role} />
            <CollectionComponentWrapper
              config={enabledConfig}
              metadata={metadata}
              role={role}
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
