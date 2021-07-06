import { FormControl } from 'rsuite'
import { FieldComponent } from './types'

export const StringField: FieldComponent = ({
  document,
  field,
  edit,
  editable
}) => {
  if (editable || edit) return <FormControl name={field} readOnly={!edit} />
  else return document[field]
}
