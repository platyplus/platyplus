import { RXDB_HASURA_DATE_FNS_FORMAT } from '@platyplus/rxdb-hasura'
import { FormControl } from 'rsuite'

import { UI_DATE_FORMAT } from '../config'
import { DatePickerAccepter } from './date-picker-accepter'
import { FieldComponent } from './types'

export const DateField: FieldComponent = ({
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
        cleanable={edit}
        format={UI_DATE_FORMAT}
        transformFormat={RXDB_HASURA_DATE_FNS_FORMAT}
        accepter={DatePickerAccepter}
      />
    )
  else return document[field]
}
