import { useLogout as useHbpLogout } from '@platyplus/hbp'
import { useNavigate } from 'react-router-dom'
import { useResetConfig } from './config'
import { useDB } from './database'

export const useLogout = () => {
  const navigate = useNavigate()
  const logout = useHbpLogout()
  const db = useDB()
  const resetConfig = useResetConfig()

  return async () => {
    await logout()
    await db.stop()
    resetConfig()
    navigate('/')
  }
}
