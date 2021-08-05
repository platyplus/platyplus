import { Tag, TagPicker, TagPickerProps } from 'rsuite'
import { CollectionFieldComponent, CollectionFieldProps } from './types'
import { Option, useCollectionFieldAccepter } from './utils'
import { CollectionField } from './wrapper'

const TagPickerAccepter: React.FC<CollectionFieldProps & TagPickerProps> = (
  props
) => {
  const { overriddenProps, isRemovable } = useCollectionFieldAccepter(props)

  return (
    <TagPicker
      {...props}
      {...overriddenProps}
      renderValue={(_, items: Array<Option | undefined>, selectedElement) =>
        items
          .filter((e) => e)
          .map((val, key) => (
            <Tag
              key={key}
              closable={isRemovable(val)}
              onClose={selectedElement[key].props.onClose}
            >
              {val.label}
            </Tag>
          ))
      }
    />
  )
}

export const CollectionTagField: CollectionFieldComponent = ({ ...props }) => (
  <CollectionField accepter={TagPickerAccepter} component="tag" {...props} />
)
