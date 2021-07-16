import { Icon, Input, InputGroup, Animation } from 'rsuite'
import { useClickAway, useToggle } from 'react-use'
import { useRef, useState, useEffect } from 'react'

export const InlineValue: React.FC<{
  value: string
  label?: string
  onChange: (value: string) => void
}> = ({ value, label, onChange }) => {
  // * Toggle title editing
  const [editing, toggle] = useToggle(false)

  // * Input value state
  const [inputValue, setInputValue] = useState('')
  useEffect(() => {
    setInputValue(value)
  }, [value])

  // * Cancel title editing
  const cancel = () => {
    toggle(false)
    setInputValue(value)
  }

  // * Set title into the config store
  const validate = () => {
    toggle(false)
    onChange(inputValue)
  }

  // * If editing and clicking away, stop editing
  const ref = useRef(null)
  // TODO does not work anymore
  useClickAway(ref, cancel)

  // * Adjust Input width automatically
  // TODO width does not scale correctly with value length
  const [width, setWidth] = useState(`${14 + value?.length}ch`)
  useEffect(() => setWidth(`${14 + inputValue?.length}ch`), [inputValue])

  return (
    <Animation.Fade in={!!value}>
      {(props, ref) => (
        <span {...props}>
          {editing ? (
            <div ref={ref} style={{ width }}>
              <InputGroup size="xs">
                <Input
                  size="xs"
                  value={inputValue}
                  onChange={setInputValue}
                  onKeyDown={({ key }) => key === 'Enter' && validate()}
                  autoFocus
                />
                <InputGroup.Button size="xs" onClick={cancel}>
                  <Icon icon="close" />
                </InputGroup.Button>
                <InputGroup.Button size="xs" onClick={validate}>
                  <Icon icon="check" />
                </InputGroup.Button>
              </InputGroup>
            </div>
          ) : (
            <span onClick={toggle}>{label ?? value}</span>
          )}
        </span>
      )}
    </Animation.Fade>
  )
}
