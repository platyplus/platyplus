import { FieldComponent, NullableNumericInput, FieldControl } from './utils'

export const IntegerField: FieldComponent = ({
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
      integer={true}
      accepter={NullableNumericInput}
    />
  ) : (
    document[name] || null
  )
