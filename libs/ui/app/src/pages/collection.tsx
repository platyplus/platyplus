import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { RxCollection } from 'rxdb'
import { useRxData, useRxQuery } from 'rxdb-hooks'

import {
  Contents,
  ContentsDocument,
  LABEL_COLUMN,
  TableInformation
} from '@platyplus/rxdb-hasura'
import {
  CollectionTitle,
  useCollectionTitle,
  useConfigEnabled,
  useTableInfo,
  useContentsCollection
} from '@platyplus/react-rxdb-hasura'
import { PrivateRoute } from '@platyplus/auth'
import { HeaderTitleWrapper } from '@platyplus/layout'
import { Loading, useQuery } from '@platyplus/navigation'

import { CollectionComponentWrapper } from '../collections'
import { CollectionToolbar } from '../collections/toolbar'

const CollectionData: React.FC<{
  collection: RxCollection
  title: string
  tableinfo: TableInformation
  enabledConfig: boolean
  role: string
  edit: boolean
}> = ({ collection, title, tableinfo, enabledConfig, role, edit }) => {
  const queryConstructor = useCallback(
    (collection) => collection.find().sort(LABEL_COLUMN),
    []
  )
  const { result, isFetching } = useRxData<Contents>(
    collection?.name,
    queryConstructor
  )
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
          data={result}
          edit={edit}
        />
      )}
    </HeaderTitleWrapper>
  )
}

const Page: React.FC = () => {
  const { name, role } = useParams()
  const query = useQuery()
  const edit = useMemo(() => query.has('edit'), [query])
  const enabledConfig = useConfigEnabled()
  const tableinfo = useTableInfo(name)
  const collection = useContentsCollection(tableinfo, role)
  const { title } = useCollectionTitle(tableinfo)
  if (!collection || !tableinfo || !title) return null
  return (
    <CollectionData
      {...{ collection, title, tableinfo, enabledConfig, role, edit }}
    />
  )
}
export const CollectionPage = () => (
  <PrivateRoute>
    <Page />
  </PrivateRoute>
)
export default CollectionPage
