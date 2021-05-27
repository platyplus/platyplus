import { useRouter } from 'next/router'
import React, { FunctionComponent } from 'react'
import { usePageTitle } from '@platyplus/layout'
import { useDocument } from '@platyplus/react-rxdb-hasura'

const DocumentPage: FunctionComponent = () => {
  const router = useRouter()
  const name = router.query.name as string
  const id = router.query.id as string
  const edit = 'edit' in router.query
  const { document, isFetching } = useDocument(name, id)
  usePageTitle(document?.label)
  // TODO loading
  if (isFetching) return <div>loading.....</div>
  else return <div>{document.test}</div>
}

export default DocumentPage
