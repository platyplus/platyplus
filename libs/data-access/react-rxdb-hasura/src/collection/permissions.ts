import { useEffect, useState } from 'react'

import { canCreate, TableInformation } from '@platyplus/rxdb-hasura'

export const useCollectionPermissions = (
  tableInfo: TableInformation,
  role: string
) => {
  const [create, setCreate] = useState(false)
  useEffect(() => {
    setCreate(canCreate(tableInfo, role))
  }, [role, tableInfo])
  return { create }
}
