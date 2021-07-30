import { InlineValue } from '@platyplus/layout'
import {
  ContentsCollection,
  Metadata,
  metadataName
} from '@platyplus/rxdb-hasura'
import { useMemo } from 'react'

import { useMetadataConfig } from '../config'
import { useCollectionMetadata } from './metadata'

// * Collection title e.g. 'Visit'. config.title="Visits" whereas config.document_title="Visite"
export const useCollectionTitle = (collection: ContentsCollection) => {
  const metadata = useCollectionMetadata(collection)
  return useMetadataTitle(metadata)
}

export const useMetadataTitle = (metadata?: Metadata) => {
  const id = useMemo(() => metadata?.id, [metadata])
  const fallback = useMemo(() => metadata && metadataName(metadata), [metadata])
  return useMetadataTitleById(id, fallback)
}

export const useMetadataTitleById = (tableId?: string, fallback?: string) => {
  return useMetadataConfig<string>(tableId, 'title', fallback)
}

export const CollectionTitle: React.FC<{
  metadata?: Metadata
  editable?: boolean
}> = ({ metadata, editable }) => {
  const [value, onChange] = useMetadataTitle(metadata)
  return <InlineValue editable={editable} value={value} onChange={onChange} />
}
