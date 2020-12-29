import { RxDocument } from 'rxdb/dist/types'

export type GenericDocument = Record<string, unknown>
export type GenericRxDocument = RxDocument<GenericDocument>
