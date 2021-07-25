import { FieldComponent, NullableNumericInput, FieldControl } from './utils'

export const IntegerField: FieldComponent = ({
  document,
  field,
  edit,
  editable
}) => {
  if (editable || edit)
    return (
      <FieldControl
        name={field}
        readOnly={!edit}
        // TODO configure nullable
        integer={true}
        accepter={NullableNumericInput}
      />
    )
  else return document[field]
}
