import { PrimaryProperty, TopLevelProperty } from 'rxdb/dist/types/types'

import { ContentsCollection, Metadata } from '../../types'

export const computedFieldsProperties = (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  table: Metadata
): Record<string, TopLevelProperty | PrimaryProperty> => ({
  label: {
    type: ['string', 'null']
  }
})

/**
 * List of the computed fields of the collection
 * @param collection
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const computedFields = (collection: ContentsCollection): string[] => [
  'label'
]
