import { UI_TIME_FORMAT } from '../config'
import { DatePickerAccepter, FieldControl, FieldComponent } from './utils'

export const TimeField: FieldComponent = ({
  document,
  field,
  edit,
  editable
}) => {
  if (editable || edit)
    return (
      <FieldControl
        name={field}
        readOnly={!edit}
        cleanable={edit}
        format={UI_TIME_FORMAT}
        date={false}
        time={true}
        accepter={DatePickerAccepter}
      />
    )
  else return document[field]
}
