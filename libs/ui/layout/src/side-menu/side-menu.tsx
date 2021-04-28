import { useRouter } from 'next/router'
import { Menu, MenuItemProps } from 'antd'
import { FunctionComponent } from 'react'
import type { XOR } from '@platyplus/ts-types'

export type SideMenuItem = Pick<MenuItemProps, 'title' | 'icon'> &
  XOR<
    {
      children: SideMenuItem[]
    },
    {
      href: string
    }
  >

export const SideMenu: FunctionComponent<{ menu?: SideMenuItem[] }> = ({
  menu
}) => {
  const router = useRouter()
  const childMenu = (m: SideMenuItem[], path: string | number = '') =>
    m.map((item, key) => {
      if (item.children)
        return (
          <Menu.SubMenu key={key} title={item.title}>
            {childMenu(item.children, key)}
          </Menu.SubMenu>
        )
      else
        return (
          <Menu.Item key={item.href} {...item}>
            {item.title}
          </Menu.Item>
        )
    })
  return (
    <Menu
      theme="dark"
      mode="inline"
      siderCollapsed={true}
      defaultSelectedKeys={['1']}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onClick={({ item }: { item: any }) => {
        const href = item.props.href
        if (href) router.push(href)
      }}
      selectedKeys={[router.route]}
    >
      {childMenu(menu)}
    </Menu>
  )
}

export default SideMenu
