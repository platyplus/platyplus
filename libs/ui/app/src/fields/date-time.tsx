import { FormControl } from 'rsuite'

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
        date={true}
        time={true}
        accepter={DatePickerAccepter}
      />
    )
  else return document[field]
}
