import { IconProps } from 'rsuite'
import { MenuItem } from '@platyplus/layout'
import { usePage } from '@platyplus/react-rxdb-hasura'
import { PropType } from '@platyplus/ts-types'

export const PageMenuItem: React.FC<{
  id: string
  role: string
  name?: string
  icon?: PropType<IconProps, 'icon'>
}> = ({ id, name, icon }) => {
  const { state: page } = usePage({ slug: id })
  if (page?.id)
    return (
      <MenuItem
        href={`/pages/${id}`}
        title={name || page.title}
        icon={(icon || page.icon) as PropType<IconProps, 'icon'>}
      />
    )
  else return null
}
