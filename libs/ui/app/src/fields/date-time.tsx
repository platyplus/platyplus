import { FormControl } from 'rsuite'

import { RXDB_HASURA_DATE_TIME_FNS_FORMAT } from '@platyplus/rxdb-hasura'

import { UI_DATE_TIME_FORMAT } from '../config'

import { DatePickerAccepter } from './date-picker-accepter'
import { FieldComponent } from './types'

export const DateTimeField: FieldComponent = ({
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
        format={UI_DATE_TIME_FORMAT}
        transformFormat={RXDB_HASURA_DATE_TIME_FNS_FORMAT}
        accepter={DatePickerAccepter}
      />
    )
  else return document[field]
}
