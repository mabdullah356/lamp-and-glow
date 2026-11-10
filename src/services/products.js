import { apiClient } from './apiClient'
import { adaptProducts } from './productAdapter'
import { fetchMockProducts } from './productMock'

const hasConfiguredApi = Boolean(import.meta.env.VITE_API_URL)

export const usingMockProducts = !hasConfiguredApi

export const getProducts = async (params = {}, signal) => {
  if (!hasConfiguredApi) {
    const payload = await fetchMockProducts(params, signal)
    return adaptProducts(payload)
  }

  const response = await apiClient.get('/products', { params, signal })
  return adaptProducts(response.data)
}
