import { Contents, ContentsDocument } from '@platyplus/rxdb-hasura'
import { useEffect, useState } from 'react'
import { useContentsCollection } from './collection'
import { useFormGet, useFormSet } from './form'
import { useSingleton } from './singleton'

export const useAppConfig = (): [
  Contents,
  (val: Partial<Contents>) => void
] => {
  const { isFetching, document } = useSingleton('me_metadata_app_config')
  const collection = useContentsCollection('me_metadata_app_config')
  const [configDocument, setConfigDocument] = useState<ContentsDocument>()
  const config = useFormGet(configDocument)
  const setConfig = useFormSet(configDocument)
  useEffect(
    () =>
      setConfigDocument(
        document || (collection?.newDocument() as ContentsDocument)
      ),
    [isFetching, document, collection]
  )
  return [config, setConfig]
}
