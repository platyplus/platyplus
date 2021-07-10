import { RxCollection } from 'rxdb'
import { useToggle } from 'react-use'
import { Icon, Input, InputGroup } from 'rsuite'
import { useClickAway } from 'react-use'
import { useCollectionMetadata } from '../hooks'
import { useConfigStore } from '../store'
import { useCollectionPropertyConfig } from './hooks'
import { useRef } from 'react'

export const usePropertyTitle = (
  collection: RxCollection,
  property: string
) => {
  const metadata = useCollectionMetadata(collection)
  const formTitle = useConfigStore(
    (state) =>
      metadata &&
      state.forms[metadata.id]?.propertiesConfig?.find(
        ({ property_name }) => property_name === property
      )?.title
  )
  const config = useCollectionPropertyConfig(collection, property)
  const title = formTitle || config?.title || property
  const setTitle = useConfigStore(
    (state) => (newTitle) =>
      state.setPropertyTitle(metadata, property, newTitle)
  )
  return [title, setTitle]
}

export const PropertyTitle: React.FC<{
  collection: RxCollection
  property: string
}> = ({ collection, property }) => {
  const [title, setTitle] = usePropertyTitle(collection, property)
  const [editing, edit] = useToggle(false)
  const ref = useRef(null)
  useClickAway(ref, () => {
    edit(false)
  })

  return (
    <span>
      {editing ? (
        <div
          ref={ref}
          style={
            {
              // minWidth: 100
            }
          }
        >
          <InputGroup size="xs">
            <Input
              size="xs"
              onChange={(value) => {
                console.log(value)
              }}
            />
            <InputGroup.Button
              size="xs"
              onClick={(value) => {
                console.log(value)
              }}
            >
              <Icon icon="close" />
            </InputGroup.Button>
            <InputGroup.Button
              size="xs"
              onClick={(value) => {
                console.log(value)
              }}
            >
              <Icon icon="check" />
            </InputGroup.Button>
          </InputGroup>
        </div>
      ) : (
        <span onClick={edit}>{title}</span>
      )}
    </span>
  )
}
