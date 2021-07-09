import { Loading } from '@platyplus/navigation'
import {
  useDocument,
  useDocumentProperties
} from '@platyplus/react-rxdb-hasura'
import { Contents } from '@platyplus/rxdb-hasura'
import { useMemo } from 'react'
import { FormControl, SelectPicker } from 'rsuite'
import { useRxQuery } from 'rxdb-hooks'
import { DocumentFromParamsComponentWrapper } from '../../documents'
import { FieldComponent } from '../types'
// TODO DRY from ../collection/wrapper
export const DocumentSelectField: FieldComponent = ({
  document,
  field,
  edit,
  editable
}) => {
  // TODO async - see https://rsuitejs.com/components/select-picker/#Async
  const properties = useDocumentProperties(document)
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
  if (isFetching) return <Loading />
  if (edit)
    return (
      <FormControl
        name={field}
        readOnly={!edit}
        accepter={(props) => (
          <SelectPicker data={options} cleanable={edit} {...props} />
        )}
      />
    )
  else if (isFetchingDoc) return <Loading />
  else
    return (
      <DocumentFromParamsComponentWrapper
        collectionName={refCollectionName}
        id={document[field]}
        componentName="label"
        edit={false}
      />
    )
}
