import { RxCollection } from 'rxdb'
import { Replicator } from '../../../types'

export type ReplicatedCollection<T> = RxCollection<
  T,
  Record<string, unknown>,
  { replicator: Replicator<T> }
>
