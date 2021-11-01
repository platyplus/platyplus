import { MenuItem } from '@platyplus/layout'

export const HomeItem: React.FC<{ title?: string; enabled?: boolean }> = ({
  enabled,
  title
}) => enabled && <MenuItem icon="home" title={title} href="/" />
