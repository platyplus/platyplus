import { useMemo } from 'react'
import { SelectPicker, Animation } from 'rsuite'
import { useRxQuery } from 'rxdb-hooks'

import {
  useDocument,
  useDocumentProperties
} from '@platyplus/react-rxdb-hasura'
import { Contents } from '@platyplus/rxdb-hasura'

import { DocumentFromParamsComponentWrapper } from '../../documents'
import { FieldComponent, FieldControl } from '../utils'
// TODO DRY from ../collection/wrapper
export const DocumentSelectField: FieldComponent = ({
  document,
  field,
  edit,
  editable
}) => {
  // TODO async - see https://rsuitejs.com/components/select-picker/#Async
  const [properties] = useDocumentProperties(document)
  const refCollectionName = properties.get(field).ref
  const refCollection = document.collection.database[refCollectionName]
  const rxQuery = useMemo(
    () => refCollection?.find().sort('label'),
    [refCollection]
  )
  const { isFetching, result } = useRxQuery<Contents>(rxQuery)
  const options = result.map((doc) => ({ label: doc.label, value: doc.id }))
  // TODO const clearable = computed(() => property.value.type?.includes('null'))
  const { isFetching: isFetchingDoc, document: data } = useDocument(
    refCollectionName,
    document[field]
  )

  return (
    <Animation.Fade in={!isFetching && !isFetchingDoc}>
      {(props, ref) => (
        <div {...props}>
          {edit ? (
            <FieldControl
              style={{ minWidth: 300 }}
              name={field}
              readOnly={!edit}
              data={options}
              cleanable={edit}
              accepter={SelectPicker}
            />
          ) : (
            <DocumentFromParamsComponentWrapper
              collectionName={refCollectionName}
              id={document[field]}
              componentName="label"
              edit={false}
            />
          )}
        </div>
      )}
    </Animation.Fade>
  )
}
