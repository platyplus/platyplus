import { useMemo } from 'react'

import { isRequiredProperty, Metadata } from '@platyplus/rxdb-hasura'

export const useIsRequiredProperty = (table: Metadata, name: string) =>
  useMemo(() => table && isRequiredProperty(table, name), [table, name])
