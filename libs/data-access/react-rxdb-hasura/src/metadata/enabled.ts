import { useLocation } from 'react-use'

export const useConfigEnabled = () => {
  // TODO ping localhost:9693
  const location = useLocation()
  return location.hostname === 'localhost'
}
