import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const waitFor = async <T = any, R = AxiosResponse<T>>(
  url: string,
  config?: AxiosRequestConfig & {
    poll?: number
    maxAttempts?: number
  }
): Promise<R> => {
  const maxAttempts = config?.maxAttempts || 0
  const poll = config?.poll || 1000
  return new Promise((resolve, reject) => {
    let attempts = 0
    const interval = setInterval(async () => {
      try {
        attempts++
        const result = await axios.get<T, R>(url, config)
        clearInterval(interval)
        return resolve(result)
      } catch {
        if (attempts == maxAttempts) reject()
      }
    }, poll)
  })
}
