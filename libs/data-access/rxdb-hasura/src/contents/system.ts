import { paramCase } from 'param-case'

import { ContentsCollection, ContentsDocument } from '../types'

// * Custom config for system collections
export const systemCollectionComponent = ({
  metadata
}: ContentsCollection): string | undefined => {
  if (metadata.table_schema === 'metadata') {
    return 'metadata-' + paramCase(metadata.table_name)
  }
}

export const systemDocumentComponent = (
  document: ContentsDocument
): string | undefined => {
  const { metadata } = document.collection
  if (metadata.table_schema === 'metadata') {
    return 'metadata-' + paramCase(metadata.table_name)
  }
}
