import { FieldComponent, NullableNumericInput, FieldControl } from './utils'

export const NumberField: FieldComponent = ({
  document,
  name,
  edit,
  editable
}) =>
  edit && editable ? (
    <FieldControl
      name={name}
      readOnly={!edit}
      // TODO configure nullable
      accepter={NullableNumericInput}
    />
  ) : (
    document[name] || null
  )
