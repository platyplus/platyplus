import { FieldComponent } from './types'
import { FormControl, InputNumber } from 'rsuite'

export const NumberField: FieldComponent = ({
  document,
  field,
  edit,
  editable
}) => {
  if (editable || edit)
    return <FormControl name={field} readOnly={!edit} accepter={InputNumber} />
  else return document[field]
}
