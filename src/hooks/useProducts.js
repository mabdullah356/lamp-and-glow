import { useCallback, useEffect, useState } from 'react'
import { getProducts } from '../services/products'

export const useProducts = (params) => {
  const paramsKey = JSON.stringify(params ?? {})
  const [attempt, setAttempt] = useState(0)
  const requestKey = `${paramsKey}|${attempt}`
  const [state, setState] = useState({
    requestKey: null,
    status: 'loading',
    products: [],
    error: null,
  })

  useEffect(() => {
    const controller = new AbortController()
    let ignore = false

    getProducts(JSON.parse(paramsKey), controller.signal)
      .then((products) => {
        if (ignore) return
        setState({
          requestKey,
          status: products.length ? 'success' : 'empty',
          products,
          error: null,
        })
      })
      .catch((error) => {
        if (ignore || error?.isCanceled || error?.name === 'AbortError') return
        setState({ requestKey, status: 'error', products: [], error })
      })

    return () => {
      ignore = true
      controller.abort()
    }
  }, [paramsKey, requestKey])

  const retry = useCallback(() => setAttempt((value) => value + 1), [])

  const isLoading = state.requestKey !== requestKey

  return {
    status: isLoading ? 'loading' : state.status,
    products: isLoading ? [] : state.products,
    error: isLoading ? null : state.error,
    retry,
  }
}
