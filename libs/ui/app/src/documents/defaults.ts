import { DocumentComponentsConfig } from '../types'
import { DocumentDetails } from './details'
import { DocumentLabel } from './label'
import { DocumentTag } from './tag'

export const defaultDocumentComponents: DocumentComponentsConfig = {
  default: DocumentDetails,
  label: DocumentLabel,
  details: DocumentDetails,
  tag: DocumentTag
}
