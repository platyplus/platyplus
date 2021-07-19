import { FieldComponentsConfig } from '../types'

import { ToggleField } from './toggle'
import { DateField } from './date'
import { DateTimeField } from './date-time'
import { IntegerField } from './integer'
import { NumberField } from './number'
import { StringField } from './string'
import { TimeField } from './time'
import { defaultFieldDocumentComponents } from './document'
import { defaultFieldCollectionComponents } from './collection'

export const defaultFieldComponents: FieldComponentsConfig = {
  integer: {
    default: IntegerField
  },
  document: defaultFieldDocumentComponents,
  string: { default: StringField },
  'date-time': { default: DateTimeField },
  boolean: { default: ToggleField, checkbox: ToggleField },
  date: { default: DateField },
  time: { default: TimeField },
  number: { default: NumberField },
  collection: defaultFieldCollectionComponents,
  object: { default: () => <div>TODO object</div> },
  email: { default: () => <div>TODO email</div> },
  array: { default: () => <div>TODO array</div> },
  hostname: { default: () => <div>TODO hostname</div> },
  ipv4: { default: () => <div>TODO ipv4</div> },
  ipv6: { default: () => <div>TODO ipv6</div> },
  uri: { default: () => <div>TODO uri</div> },
  null: { default: () => null }
}
