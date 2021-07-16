import { useLocation } from 'react-use'

export const useConfigEnabled = () => {
  const location = useLocation()
  return location.hostname === 'localhost'
}
