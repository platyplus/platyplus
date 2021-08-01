import { FieldComponent, NullableNumericInput, FieldControl } from './utils'

export const IntegerField: FieldComponent = ({
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
        integer={true}
        accepter={NullableNumericInput}
      />
    )
  else return document[name] || null
}
