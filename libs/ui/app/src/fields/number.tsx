import { FormControl } from 'rsuite'

import { FieldComponent } from './types'
import { NullableNumericInput } from './numeric-accepter'

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
        accepter={NullableNumericInput}
      />
    )
  else return document[field]
}
