import { Loading } from '@platyplus/navigation'
import { useDocuments } from '@platyplus/react-rxdb-hasura'
import { Contents } from '@platyplus/rxdb-hasura'
import { useMemo } from 'react'
import { FormControl, CheckPicker } from 'rsuite'
import { useRxQuery } from 'rxdb-hooks'
import { CollectionFromParamsComponentWrapper } from '../collections'
import { FieldComponent } from './types'

export const DocumentSelectMultipleField: FieldComponent = ({
  document,
  field,
  edit,
  editable
}) => {
  // TODO async - see https://rsuitejs.com/components/check-picker/#Async
  const refCollectionName = document.collection.properties.get(field).ref
  const refCollection = document.collection.database[refCollectionName]
  const rxQuery = useMemo(() => refCollection?.find(), [refCollection])
  const { isFetching, result } = useRxQuery<Contents>(rxQuery)
  const options = result.map((doc) => ({ label: doc.label, value: doc.id }))
  const { isFetching: isFetchingDocs, result: documents } = useDocuments(
    refCollectionName,
    document[field]
  )
  if (isFetching) return <Loading />
  // TODO bug - when picking one checkbox
  if (editable || edit)
    return (
      <FormControl
        name={field}
        readOnly={!edit}
        accepter={(props) => (
          <CheckPicker data={options} cleanable={edit} {...props} />
        )}
      />
    )
  else if (isFetchingDocs) return <Loading />
  else
    return (
      <CollectionFromParamsComponentWrapper
        collectionName={refCollectionName}
        ids={document[field]}
        componentName="label"
        edit={false}
      />
    )
}
