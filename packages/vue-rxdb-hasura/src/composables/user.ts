import { ContentsDocument } from '@platyplus/rxdb-hasura'
import { Ref, ref, watch } from 'vue'

// * Use either 'display_name' or the label, if the label is not the user id.
export const useDisplayName = (
  profile: Ref<ContentsDocument | undefined>
): Readonly<Ref<string | undefined>> => {
  const displayName = ref<string>()
  watch(
    () => profile.value,
    doc => {
      doc &&
        doc.$.subscribe(doc => {
          const label = doc?.label
          displayName.value =
            label === profile.value?.id ? profile.value?.display_name : label
        })
    }
  )
  return displayName
}
