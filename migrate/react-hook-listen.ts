import { useRef } from 'react'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function print(value: any) {
  if (typeof value === 'object') {
    return JSON.stringify(value)
  } else {
    return value.toString()
  }
}

// * usage: useLogIfChanged('log-name', hookName)
export function useLogIfChanged<T>(name: string, value: T) {
  const previous = useRef(value)
  if (!Object.is(previous.current, value)) {
    console.log(
      `${name} changed. Old: ${print(previous.current)}, New: ${print(value)} `
    )
    previous.current = value
  }
}
