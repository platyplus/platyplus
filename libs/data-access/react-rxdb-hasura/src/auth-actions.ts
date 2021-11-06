import { useHbp } from '@platyplus/hbp'
import { useHistory } from 'react-router-dom'
import { useResetConfig } from './config'
import { useDB } from './database'
export const useLogout = () => {
  const router = useHistory()
  const { auth } = useHbp()
  const db = useDB()
  const resetConfig = useResetConfig()

  return async () => {
    await auth.logout()
    await db.stop()
    resetConfig()
    router.push('/')
  }
}
