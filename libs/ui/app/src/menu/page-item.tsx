import { IconProps } from 'rsuite'
import { MenuItem } from '@platyplus/layout'
import { usePage } from '@platyplus/react-rxdb-hasura'
import { PropType } from '@platyplus/ts-types'

export const PageMenuItem: React.FC<{
  slug: string
  role: string
  name?: string
  icon?: PropType<IconProps, 'icon'>
}> = ({ slug, name, icon }) => {
  const { state: page } = usePage({ slug })
  if (page?.id)
    return (
      <MenuItem
        href={`/pages/${slug}`}
        title={name || page.title}
        icon={(icon || page.icon) as PropType<IconProps, 'icon'>}
      />
    )
  else return null
}
