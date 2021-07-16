import { DatePicker, DatePickerProps, FormControl } from 'rsuite'
import { FormControlAccepterProps } from 'rsuite/lib/FormControl'
import { parse, format } from 'date-fns'

import { FieldComponent } from './types'

// TODO
const DATE_FORMAT = 'yyyy-MM-dd'

const DatePickerAccepter: React.ElementType<
  DatePickerProps & FormControlAccepterProps
> = ({ value, defaultValue, onChange, ...props }) => (
  <DatePicker
    defaultValue={parse(defaultValue, DATE_FORMAT, new Date())}
    onChange={(dateValue, event) =>
      onChange(format(dateValue, DATE_FORMAT), event)
    }
    {...props}
  />
)

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
        accepter={(props) => (
          <DatePickerAccepter {...props} cleanable={false} />
        )}
      />
    )
  else return document[field]
}
