import { Input, InputProps } from 'rsuite'
import { FieldControl, FieldComponent } from './utils'

const NullableInputString: React.ComponentType<
  InputProps & { nullable: boolean }
> = ({ nullable, value, onChange, ...props }) => {
  const internalValue = value == null ? '' : value
  return (
    <Input
      {...props}
      value={internalValue}
      onChange={(value, event) => {
        onChange(value === '' ? null : value, event)
      }}
    />
  )
}
export const StringField: FieldComponent = ({
  document,
  field,
  edit,
  editable
}) => {
  if (editable || edit)
    return (
      <FieldControl
        // TODO configure nullable
        nullable={true}
        name={field}
        readOnly={!edit}
        accepter={NullableInputString}
      />
    )
  else return document[field]
}
