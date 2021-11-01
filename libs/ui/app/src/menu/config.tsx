import { Divider } from 'rsuite'
import { MenuItem } from '@platyplus/layout'

export const ConfigMenu: React.FC = () => {
  return (
    <>
      <Divider />
      <MenuItem href="/config" title="Configuration" icon="wrench" />
      <MenuItem href="/config/collections" title="Collections" level={1} />
      <MenuItem href="/config/pages" title="Pages" level={1} />
      <MenuItem href="/config/menu" title="Menu" level={1} />
    </>
  )
}
