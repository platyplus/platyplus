import { useEffect, useState } from 'react'
import { Loader, LoaderProps } from 'rsuite'

export const Loading: React.FC<LoaderProps & { delay?: number }> = ({
  delay = 250,
  ...props
}) => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShow(true)
    }, delay)
    return () => {
      clearTimeout(timeout)
    }
  }, [delay])

  return show ? <Loader {...props} /> : null
}

export default Loading
