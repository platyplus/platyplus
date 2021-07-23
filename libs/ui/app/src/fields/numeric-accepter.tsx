import { useState } from 'react'
import { InputNumber, InputNumberProps } from 'rsuite'

export const NullableNumericInput: React.FC<
  InputNumberProps & {
    integer?: boolean
  }
> = ({ value, onChange, integer = false, ...props }) => {
  const [state, setState] = useState(value)

  return (
    <InputNumber
      {...props}
      value={state}
      onChange={(newValue: string, event) => {
        if (newValue === '') {
          setState(null)
          onChange(null, event)
        } else {
          if (newValue.endsWith('.') && !integer) {
            setState(newValue)
          } else {
            let numberValue = +newValue
            if (!isNaN(numberValue)) {
              if (integer) numberValue = Math.floor(numberValue)
              setState(numberValue)
              onChange(numberValue, event)
            }
          }
        }
      }}
    />
  )
}
