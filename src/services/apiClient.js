import axios from 'axios'

const MAX_RETRIES = 2
const RETRY_BASE_DELAY = 300

const isCanceledRequest = (error) =>
  axios.isCancel(error) || error.code === 'ERR_CANCELED'

const normalizeError = (error) => {
  if (isCanceledRequest(error)) {
    return {
      message: 'Request canceled.',
      status: null,
      isNetworkError: false,
      isCanceled: true,
    }
  }

  const status = error.response?.status ?? null
  const isNetworkError = !error.response
  const serverMessage = error.response?.data?.message

  return {
    message:
      serverMessage ||
      (isNetworkError
        ? 'Unable to reach the server. Please check your connection and try again.'
        : error.message || 'Something went wrong while loading products.'),
    status,
    isNetworkError,
    isCanceled: false,
  }
}

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '',
  timeout: 10000,
  headers: { Accept: 'application/json' },
})

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error.config
    if (!config || isCanceledRequest(error)) {
      return Promise.reject(normalizeError(error))
    }

    const status = error.response?.status
    const isNetworkError = !error.response
    const retryCount = config.__retryCount ?? 0
    const shouldRetry =
      (isNetworkError || (status >= 500 && status < 600)) &&
      retryCount < MAX_RETRIES

    if (shouldRetry) {
      config.__retryCount = retryCount + 1
      const delay = RETRY_BASE_DELAY * 2 ** retryCount
      await new Promise((resolve) => window.setTimeout(resolve, delay))

      if (config.signal?.aborted) {
        return Promise.reject(normalizeError(error))
      }

      return apiClient(config)
    }

    return Promise.reject(normalizeError(error))
  },
)
