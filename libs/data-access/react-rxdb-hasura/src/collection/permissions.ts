import { useEffect, useState } from 'react'

import { canCreate, TableInformation } from '@platyplus/rxdb-hasura'

export const useCollectionPermissions = (
  tableInfo: TableInformation,
  role: string
) => {
  const [create, setCreate] = useState(false)
  useEffect(() => {
    const go = async () => {
      setCreate(await canCreate(tableInfo, role))
    }
    go()
  }, [role, tableInfo])
  return { create }
}
