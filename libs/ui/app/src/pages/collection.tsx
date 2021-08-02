import React, { useMemo } from 'react'
import { useParams } from 'react-router'

import { Contents, ContentsDocument, Metadata } from '@platyplus/rxdb-hasura'
import {
  CollectionTitle,
  useMetadataTitle,
  useConfigEnabled,
  useMetadata,
  useCollectionName
} from '@platyplus/react-rxdb-hasura'
import { HeaderTitleWrapper } from '@platyplus/layout'
import { Loading, useQuery } from '@platyplus/navigation'
import { CollectionComponentWrapper } from '../collections'
import { CollectionToolbar } from '../collections/toolbar'
import { useRxCollection, useRxQuery } from 'rxdb-hooks'
import { RxCollection } from 'rxdb'

const CollectionData: React.FC<{
  collection: RxCollection
  title: string
  metadata: Metadata
  enabledConfig: boolean
  role: string
  edit: boolean
}> = ({ collection, title, metadata, enabledConfig, role, edit }) => {
  const q = useMemo(() => collection.find().sort('label'), [collection])
  const { isFetching, result } = useRxQuery<Contents>(q)
  return (
    <HeaderTitleWrapper
      title={title}
      component={
        <CollectionTitle editable={enabledConfig} metadata={metadata} />
      }
    >
      <CollectionToolbar metadata={metadata} role={role} />
      {isFetching ? (
        <Loading backdrop />
      ) : (
        <CollectionComponentWrapper
          config={enabledConfig}
          metadata={metadata}
          role={role}
          data={result as ContentsDocument[]} // TODO PR useRxQuery type in 'rxdb-hooks'to include Orm methods e.g. useRxQuery<T,U>
          edit={edit}
        />
      )}
    </HeaderTitleWrapper>
  )
}

export const CollectionPage: React.FC = () => {
  const { name, role } = useParams<{ name: string; role: string }>()
  const query = useQuery()
  const edit = useMemo(() => query.has('edit'), [query])
  const enabledConfig = useConfigEnabled()
  const metadata = useMetadata(name)
  const collectionName = useCollectionName(metadata, role)
  const collection = useRxCollection(collectionName)
  const [title] = useMetadataTitle(metadata)
  if (!collection) return null
  return (
    <CollectionData
      {...{ collection, title, metadata, enabledConfig, role, edit }}
    />
  )
}

export default CollectionPage
