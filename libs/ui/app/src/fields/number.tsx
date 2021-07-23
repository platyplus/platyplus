import { FieldComponent } from './types'
import { FormControl, InputNumber, InputNumberProps } from 'rsuite'
// TODO difference between integer and number

const NullableInputNumber: React.FC<InputNumberProps & { nullable: boolean }> =
  ({ nullable, value, onChange, ...props }) => {
    const internalValue = value == null ? '' : +value
    return (
      <InputNumber
        {...props}
        value={internalValue}
        onChange={(value, event) => {
          onChange(value === '' ? null : +value, event)
        }}
      />
    )
  }

export const NumberField: FieldComponent = ({
  document,
  field,
  edit,
  editable
}) => {
  if (editable || edit)
    return (
      <FormControl
        name={field}
        readOnly={!edit}
        // TODO configure nullable
        nullable={true}
        accepter={NullableInputNumber}
      />
    )
  else return document[field]
}
