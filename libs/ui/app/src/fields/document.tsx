import { Loading } from '@platyplus/navigation'
import { Contents } from '@platyplus/rxdb-hasura'
import { useMemo } from 'react'
import { FormControl, SelectPicker } from 'rsuite'
import { useRxQuery } from 'rxdb-hooks'
import { FieldComponent } from './types'

export const DocumentField: FieldComponent = ({
  document,
  field,
  edit,
  editable
}) => {
  const refCollection =
    document.collection.database[document.collection.properties.get(field).ref]
  const rxQuery = useMemo(() => refCollection?.find(), [refCollection])
  const { isFetching, result } = useRxQuery<Contents>(rxQuery)
  const options = result.map((doc) => ({ label: doc.label, value: doc.id }))
  if (isFetching) return <Loading />
  if (editable || edit)
    return (
      <FormControl
        name={field}
        readOnly={!edit}
        accepter={(props) => <SelectPicker data={options} {...props} />}
      />
    )
  else return document[field]
}
