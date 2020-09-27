import { Ref } from '@vue/composition-api'
import { AxiosError } from 'axios'

type ErrorResponse = {
  message: string
  error: string
  statusCode: number
}
// TODO review and move to composables
export const handleAxiosRequest = async (
  request: () => Promise<unknown> | undefined,
  errorMessage: Ref<string>
): Promise<void> => {
  errorMessage.value = ''
  try {
    await request()
  } catch (err) {
    const error = err as AxiosError<ErrorResponse>
    if (error.response) {
      errorMessage.value = error.response.data.message
    } else if (error.request) {
      error.request
      errorMessage.value = error.request as string
    } else {
      errorMessage.value = error.message
    }
  }
}
