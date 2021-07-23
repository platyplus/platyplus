import { DatePicker, DatePickerProps } from 'rsuite'
import { FormControlAccepterProps } from 'rsuite/lib/FormControl'
import { parse, format } from 'date-fns'

export const DatePickerAccepter: React.ElementType<
  DatePickerProps & FormControlAccepterProps & { transformFormat: string }
> = ({ value, defaultValue, onChange, transformFormat, ...props }) => {
  const internalValue =
    value == null ? null : parse(value, transformFormat, new Date())

  return (
    <DatePicker
      oneTap
      value={internalValue}
      onChange={(dateValue, event) =>
        onChange(dateValue ? format(dateValue, transformFormat) : null, event)
      }
      {...props}
    />
  )
}
