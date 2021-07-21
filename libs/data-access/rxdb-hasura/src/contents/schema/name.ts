import { DeepReadonlyObject } from 'rxdb'
import { CoreTableFragment, Metadata } from '../../types'
export const metadataName = (
  data: DeepReadonlyObject<Metadata> | Metadata | CoreTableFragment
): string =>
  data.table_schema === 'public'
    ? `${data.table_name}`
    : `${data.table_schema}_${data.table_name}`
