import React, { useMemo } from 'react'
import { useParams } from 'react-router'

import {
  Contents,
  ContentsDocument,
  TableInformation
} from '@platyplus/rxdb-hasura'
import {
  CollectionTitle,
  useCollectionTitle,
  useConfigEnabled,
  useTableInfo,
  useCollectionName
} from '@platyplus/react-rxdb-hasura'
import { HeaderTitleWrapper } from '@platyplus/layout'
import { Loading, useQuery } from '@platyplus/navigation'
import { CollectionComponentWrapper } from '../collections'
import { CollectionToolbar } from '../collections/toolbar'
import { useRxCollection, useRxQuery } from 'rxdb-hooks'
import { RxCollection } from 'rxdb'

const CollectionData: React.FC<{
  collection: RxCollection
  title: string
  tableinfo: TableInformation
  enabledConfig: boolean
  role: string
  edit: boolean
}> = ({ collection, title, tableinfo, enabledConfig, role, edit }) => {
  const q = useMemo(() => collection.find().sort('label'), [collection])
  const { isFetching, result } = useRxQuery<Contents>(q)
  return (
    <HeaderTitleWrapper
      title={title}
      component={
        <CollectionTitle editable={enabledConfig} tableinfo={tableinfo} />
      }
    >
      <CollectionToolbar tableinfo={tableinfo} role={role} />
      {isFetching ? (
        <Loading backdrop />
      ) : (
        <CollectionComponentWrapper
          config={enabledConfig}
          tableinfo={tableinfo}
          role={role}
          data={result as ContentsDocument[]} // TODO PR useRxQuery type in 'rxdb-hooks'to include Orm methods e.g. useRxQuery<T,U>
          edit={edit}
        />
      )}
    </HeaderTitleWrapper>
  )
}

export const CollectionPage: React.FC = () => {
  const { name, role } = useParams<{ name: string; role: string }>()
  const query = useQuery()
  const edit = useMemo(() => query.has('edit'), [query])
  const enabledConfig = useConfigEnabled()
  const tableinfo = useTableInfo(name)
  const collectionName = useCollectionName(tableinfo, role)
  const collection = useRxCollection(collectionName)
  const { title } = useCollectionTitle(tableinfo)
  if (!collection || !tableinfo || !title) return <div>PROBLEM</div>
  return (
    <CollectionData
      {...{ collection, title, tableinfo, enabledConfig, role, edit }}
    />
  )
}

export default CollectionPage
