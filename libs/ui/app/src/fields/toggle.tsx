import { FormControl, Toggle } from 'rsuite'
import { FormControlAccepterProps } from 'rsuite/lib/FormControl'

import { FieldComponent } from './types'

const ToggleAccepter: React.ElementType<FormControlAccepterProps> = ({
  value,
  defaultValue,
  onChange
}) => (
  <Toggle checked={value} defaultChecked={defaultValue} onChange={onChange} />
)

export const ToggleField: FieldComponent = ({
  document,
  field,
  edit,
  editable
}) => {
  if (editable || edit) {
    return (
      <FormControl name={field} readOnly={!edit} accepter={ToggleAccepter} />
    )
  } else return <Toggle checked={document[field]} disabled />
}
