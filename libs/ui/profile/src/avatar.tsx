import { Avatar as AvatarComponent, AvatarProps } from 'rsuite'
import { FunctionComponent } from 'react'
import { initials } from '@platyplus/data'

import { useProfile } from './hook'

export const Avatar: FunctionComponent<Omit<AvatarProps, 'src' | 'alt'>> = (
  props
) => {
  const { value: profile } = useProfile()
  if (profile) {
    const ini = initials(profile.display_name)

    if (profile.avatar_url)
      return <AvatarComponent {...props} alt={ini} src={profile.avatar_url} />
    else {
      return (
        <AvatarComponent {...props} alt={ini}>
          {ini}
        </AvatarComponent>
      )
    }
  } else return null
}

export default Avatar
