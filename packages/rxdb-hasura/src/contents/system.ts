import { ContentsCollection, ContentsDocument } from '../types'

// * Custom config for system collections
export const systemCollectionComponent = ({
  metadata
}: ContentsCollection): string | undefined => {
  if (metadata.table_schema === 'metadata') {
    if (metadata.table_name === 'table_config') {
      return 'table-config'
    }
  }
}

export const systemDocumentComponent = (
  document: ContentsDocument
): string | undefined => {
  const { metadata } = document.collection as ContentsCollection
  if (metadata.table_schema === 'metadata') {
    if (metadata.table_name === 'table_config') {
      return 'table-config'
    }
  }
}
