import { Animation } from 'rsuite'
import { useParams } from 'react-router-dom'
import { Descendant } from 'slate'
import { useCallback, useRef, useState } from 'react'
import { useClickAway } from 'react-use'

import { HeaderTitleWrapper, RichText } from '@platyplus/layout'
import { useConfigEnabled, usePage } from '@platyplus/react-rxdb-hasura'
import { PrivateRoute } from '@platyplus/auth'

const Page: React.FC = () => {
  const { slug } = useParams()
  const { page, setPage } = usePage({ slug })
  const isConfigEnabled = useConfigEnabled()

  const setContents = useCallback(
    (contents: Descendant[]) => setPage({ ...page, contents }),
    [page, setPage]
  )
  const ref = useRef(null)
  useClickAway(ref, () => setEditing(false))
  const edit = () => isConfigEnabled && setEditing(true)
  const [editing, setEditing] = useState(false)

  return (
    <HeaderTitleWrapper title={page?.title}>
      <Animation.Fade in={!!page}>
        {(props) => (
          <div {...props} ref={ref} style={{ height: '100%' }} onClick={edit}>
            {page?.contents && (
              <RichText
                readOnly={!editing}
                value={page.contents}
                onChange={setContents}
              />
            )}
          </div>
        )}
      </Animation.Fade>
    </HeaderTitleWrapper>
  )
}

export const PagePage = () => (
  <PrivateRoute>
    <Page />
  </PrivateRoute>
)
