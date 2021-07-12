// TODO move to another package

import { useToggle } from 'react-use'
import { Icon, Input, InputGroup, Animation } from 'rsuite'
import { useClickAway } from 'react-use'
import { useRef, useState, useEffect } from 'react'

// TODO rename this component
export const InlineEditableValue: React.FC<{
  state: [string, (value: string) => void]
}> = ({ state }) => {
  const [value, setValue] = state

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
    setValue(inputValue)
  }

  // * If editing and clicking away, stop editing
  const ref = useRef(null)
  // TODO does not work anymore
  useClickAway(ref, cancel)

  // * Adjust Input width automatically
  // TODO width does not scale with value length
  const [width, setWidth] = useState(`${6 + value?.length}em`)
  useEffect(() => setWidth(`${6 + inputValue?.length}em`), [inputValue])

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
            <span onClick={toggle}>{value}</span>
          )}
        </span>
      )}
    </Animation.Fade>
  )
}
