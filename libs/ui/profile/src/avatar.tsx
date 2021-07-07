import { FunctionComponent } from 'react'
import { useProfile } from './hook'
import { Avatar as AvatarComponent, AvatarProps } from 'rsuite'

export const Avatar: FunctionComponent<Omit<AvatarProps, 'src' | 'alt'>> = (
  props
) => {
  const profile = useProfile()
  if (profile) {
    // * TODO create a helper
    const initials = profile.display_name
      .split(' ')
      .map((word: string) => word[0])
      .join('')
      .toUpperCase()
    if (profile.avatar_url)
      return (
        <AvatarComponent {...props} alt={initials} src={profile.avatar_url} />
      )
    else {
      return (
        <AvatarComponent {...props} alt={initials}>
          {initials}
        </AvatarComponent>
      )
    }
  } else return null
}

export default Avatar
