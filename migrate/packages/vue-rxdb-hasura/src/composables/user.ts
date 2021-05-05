import { ContentsDocument } from '@platyplus/rxdb-hasura'
import { computed, Ref } from 'vue'

import { usePropertyValue } from './property'

// * Use either 'display_name' or the label, if the label is not the user id.
export const useDisplayName = (
  doc: Ref<ContentsDocument | undefined>
): Readonly<Ref<string | undefined>> => {
  const displayName = usePropertyValue<string>(doc, 'display_name')
  const label = usePropertyValue<string>(doc, 'label')
  return computed(() => (doc.value?.id ? displayName.value : label.value))
}
