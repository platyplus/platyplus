import { FieldComponent, NullableNumericInput, FieldControl } from './utils'

export const NumberField: FieldComponent = ({
  document,
  name,
  edit,
  editable
}) => {
  if (editable || edit)
    return (
      <FieldControl
        name={name}
        readOnly={!edit}
        // TODO configure nullable
        accepter={NullableNumericInput}
      />
    )
  else return document[name] || null
}
