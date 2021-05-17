import { ContentsDocument } from '@platyplus/rxdb-hasura'

import { usePropertyValue } from './property'

// * Use either 'display_name' or the label, if the label is not the user id.
export const useDisplayName = (
  doc?: ContentsDocument
): Readonly<string | undefined> => {
  const displayName = usePropertyValue<string>(doc, 'display_name')
  const label = usePropertyValue<string>(doc, 'label')
  return doc?.id ? displayName : label
}
