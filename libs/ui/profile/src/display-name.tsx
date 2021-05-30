import { ContentsDocument } from '@platyplus/rxdb-hasura'
import { FunctionComponent } from 'react'
import { useProfile } from './hook'

export const DisplayName: FunctionComponent<{ profile?: ContentsDocument }> = ({
  profile
}) => {
  const loadProfile = useProfile()
  const profileDoc = profile || loadProfile
  if (profileDoc) return <span>{profileDoc.display_name}</span>
  else return null
}

export default DisplayName
