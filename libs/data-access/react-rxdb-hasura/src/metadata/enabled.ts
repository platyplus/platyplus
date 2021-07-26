import { useLocation } from 'react-use'

export const useConfigEnabled = () => {
  // TODO config is enabled if user has an admin role
  // TODO ping localhost:9693
  const location = useLocation()
  return location.hostname === 'localhost'
}
