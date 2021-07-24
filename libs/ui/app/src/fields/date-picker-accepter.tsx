import { DatePicker, DatePickerProps } from 'rsuite'
import { FormControlAccepterProps } from 'rsuite/lib/FormControl'
import { parseISO, formatISO } from 'date-fns'
import { useCallback } from 'react'

export const DatePickerAccepter: React.ElementType<
  DatePickerProps &
    FormControlAccepterProps & { date?: boolean; time?: boolean }
> = ({
  value,
  defaultValue,
  onChange,
  date = true,
  time = false,
  ...props
}) => {
  const formatter = useCallback(
    (v) => {
      if (v == null) return null
      return formatISO(v, {
        representation: !time ? 'date' : !date ? 'time' : 'complete'
      })
    },
    [date, time]
  )
  const internalValue = value == null ? null : parseISO(value)

  return (
    <DatePicker
      oneTap
      value={internalValue}
      onChange={(dateValue, event) => onChange(formatter(dateValue), event)}
      {...props}
    />
  )
}
