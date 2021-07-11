import { RxCollection } from 'rxdb'
import { useToggle } from 'react-use'
import { Icon, Input, InputGroup } from 'rsuite'
import { useClickAway } from 'react-use'
import { useCollectionMetadata } from '../hooks'
import { useConfigStore } from '../store'
import { useRef, useState, useEffect } from 'react'

/** Use the title of a property, in this order:
 * 1. title stored in the config store
 * 2. title stored in the metadata property configuration
 * 3. name of the property
 * The `setTitle` method will set a new title value to the config store
 * @return [title, setTitle]
 */
export const usePropertyTitle = (
  collection: RxCollection,
  property: string
): [string, (val: string) => void] => {
  const metadata = useCollectionMetadata(collection)
  const title = useConfigStore().getPropertyTitle(metadata, property)
  const setTitle = useConfigStore((state) => (newTitle: string) => {
    state.setPropertyTitle(metadata, property, newTitle)
  })
  return [title, setTitle]
}

export const PropertyTitle: React.FC<{
  collection: RxCollection
  property: string
}> = ({ collection, property }) => {
  const [title, setTitle] = usePropertyTitle(collection, property)

  // * Toggle title editing
  const [editing, toggle] = useToggle(false)

  // * Input value state
  const [inputValue, setInputValue] = useState('')
  useEffect(() => {
    setInputValue(title)
  }, [title])

  // * Cancel title editing
  const cancel = () => {
    toggle(false)
    setInputValue(title)
  }

  // * Set title into the config store
  const validate = () => {
    toggle(false)
    setTitle(inputValue)
  }

  // * If editing and clicking away, stop editing
  const ref = useRef(null)
  useClickAway(ref, cancel)

  // * Adjust Input width automatically
  const [width, setWidth] = useState(`${6 + title.length}em`)
  useEffect(() => setWidth(`${6 + inputValue.length}em`), [inputValue])

  return (
    <span>
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
        <span onClick={toggle}>{title}</span>
      )}
    </span>
  )
}
