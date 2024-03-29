import { CheckPicker } from 'rsuite'
import { CollectionFieldComponent } from './types'

import { CollectionField } from './wrapper'

// TODO code CheckPickerAccepter in the same spirit as TagPickerAccepter
export const CollectionSelectField: CollectionFieldComponent = ({
  ...props
}) => <CollectionField accepter={CheckPicker} component="label" {...props} />
