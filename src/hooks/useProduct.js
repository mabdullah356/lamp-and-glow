import { useCallback, useEffect, useState } from 'react'
import { getProduct } from '../services/products'

export const useProduct = (productId) => {
  const [attempt, setAttempt] = useState(0)
  const requestKey = `${String(productId)}|${attempt}`
  const [state, setState] = useState({
    requestKey: null,
    status: 'loading',
    product: null,
    error: null,
  })

  useEffect(() => {
    const controller = new AbortController()
    let ignore = false

    getProduct(productId, controller.signal)
      .then((product) => {
        if (ignore) return
        setState({
          requestKey,
          status: product ? 'success' : 'empty',
          product,
          error: null,
        })
      })
      .catch((error) => {
        if (ignore || error?.isCanceled || error?.name === 'AbortError') return
        setState({ requestKey, status: 'error', product: null, error })
      })

    return () => {
      ignore = true
      controller.abort()
    }
  }, [productId, requestKey])

  const retry = useCallback(() => setAttempt((value) => value + 1), [])

  const isLoading = state.requestKey !== requestKey

  return {
    status: isLoading ? 'loading' : state.status,
    product: isLoading ? null : state.product,
    error: isLoading ? null : state.error,
    retry,
  }
}
