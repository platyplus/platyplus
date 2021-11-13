import { useNavigate } from 'react-router-dom'
import { Animation, ButtonGroup } from 'rsuite'

import { TableInformation } from '@platyplus/rxdb-hasura'
import { useCollectionPermissions } from '@platyplus/react-rxdb-hasura'
import { IconButtonWithHelper } from '@platyplus/layout'

export const CollectionToolbar: React.FC<{
  tableinfo?: TableInformation
  role: string
  edit?: boolean
}> = ({ tableinfo, role }) => {
  const navigate = useNavigate()
  const create = () => navigate(`/collections/${role}/${tableinfo.id}/new`)

  const can = useCollectionPermissions(tableinfo, role)

  return (
    <Animation.Fade in={!!tableinfo}>
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
