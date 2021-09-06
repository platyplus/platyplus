import { useHistory } from 'react-router-dom'
import { Animation, ButtonGroup } from 'rsuite'

import { TableInformation } from '@platyplus/rxdb-hasura'
import { useCollectionPermissions } from '@platyplus/react-rxdb-hasura'
import { IconButtonWithHelper } from '@platyplus/layout'

export const CollectionToolbar: React.FC<{
  tableInfo?: TableInformation
  role: string
  edit?: boolean
}> = ({ tableInfo, role }) => {
  const history = useHistory()
  const create = () => {
    history.push(`/collection/${role}/${tableInfo.id}/new`)
  }
  const can = useCollectionPermissions(tableInfo, role)

  return (
    <Animation.Fade in={!!tableInfo}>
      {(props, ref) => (
        <div {...props}>
          <ButtonGroup style={{ paddingBottom: '10px' }}>
            {can.create && (
              <IconButtonWithHelper
                icon="plus"
                helper="Create"
                onClick={create}
                size="sm"
              >
                New
              </IconButtonWithHelper>
            )}
          </ButtonGroup>
        </div>
      )}
    </Animation.Fade>
  )
}
