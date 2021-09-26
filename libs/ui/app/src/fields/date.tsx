import { format, parseISO } from 'date-fns'
import { UI_DATE_FORMAT, UI_DATE_FORMAT_FNS } from '../config'
import { DatePickerAccepter, FieldControl, FieldComponent } from './utils'

export const DateField: FieldComponent = ({ document, name, edit, editable }) =>
  edit && editable ? (
    <FieldControl
      name={name}
      readOnly={!edit}
      cleanable={edit}
      format={UI_DATE_FORMAT}
      date={true}
      time={false}
      accepter={DatePickerAccepter}
    />
  ) : document[name] ? (
    <span>{format(parseISO(document[name]), UI_DATE_FORMAT_FNS)}</span>
  ) : null
