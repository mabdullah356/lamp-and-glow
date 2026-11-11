import { apiClient } from './apiClient'
import { adaptProduct, adaptProducts } from './productAdapter'
import { fetchMockProduct, fetchMockProducts } from './productMock'

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

export const getProduct = async (productId, signal) => {
  if (!hasConfiguredApi) {
    const raw = await fetchMockProduct(productId, signal)
    return raw ? adaptProduct(raw) : null
  }

  const response = await apiClient.get(
    `/products/${encodeURIComponent(productId)}`,
    { signal },
  )
  return adaptProduct(response.data)
}
