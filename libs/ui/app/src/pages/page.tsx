import { Animation } from 'rsuite'
import { useParams } from 'react-router-dom'
import { Descendant } from 'slate'
import { useRef, useState } from 'react'
import { useClickAway } from 'react-use'

import { HeaderTitleWrapper, InlineValue, RichText } from '@platyplus/layout'
import {
  useConfigEnabled,
  usePage,
  usePageTitle
} from '@platyplus/react-rxdb-hasura'
import { PrivateRoute } from '@platyplus/auth'

const Page: React.FC = () => {
  const { slug } = useParams()
  const { state: contents, setState: setContents } = usePage<Descendant[]>({
    slug,
    path: 'contents'
  })
  const isConfigEnabled = useConfigEnabled()
  const { state: title, setState: setTitle } = usePageTitle({ slug })
  const ref = useRef(null)
  useClickAway(ref, () => setEditing(false))
  const edit = () => isConfigEnabled && setEditing(true)
  const [editing, setEditing] = useState(false)

  return (
    <HeaderTitleWrapper
      title={title}
      component={
        <InlineValue
          editable={isConfigEnabled}
          value={title}
          onChange={setTitle}
        />
      }
    >
      <Animation.Fade in={!!contents}>
        {(props) => (
          <div {...props} ref={ref} style={{ height: '100%' }} onClick={edit}>
            {contents && (
              <RichText
                readOnly={!editing}
                value={contents}
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
