import { UI_TIME_FORMAT } from '../config'
import { DatePickerAccepter, FieldControl, FieldComponent } from './utils'

export const TimeField: FieldComponent = ({ document, name, edit, editable }) =>
  edit && editable ? (
    <FieldControl
      name={name}
      readOnly={!edit}
      cleanable={edit}
      format={UI_TIME_FORMAT}
      date={false}
      time={true}
      accepter={DatePickerAccepter}
    />
  ) : (
    document[name] || null
  )
