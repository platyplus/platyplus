import { FieldComponent, NullableNumericInput, FieldControl } from './utils'

export const NumberField: FieldComponent = ({
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
        accepter={NullableNumericInput}
      />
    )
  else return document[field]
}
