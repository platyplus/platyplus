import { createClient } from 'nhost-js-sdk'
const { auth, storage } = createClient({
  baseURL: process.env.NEXT_PUBLIC_HBP_ENDPOINT
})

export { auth, storage }
