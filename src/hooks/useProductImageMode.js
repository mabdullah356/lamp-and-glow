import { useCallback, useSyncExternalStore } from 'react'

export const PRODUCT_IMAGE_MODE_KEY = 'product-image-mode'

const LIGHT = 'light'
const DARK = 'dark'

const listeners = new Set()
let storageListenerBound = false

const readMode = () => {
  if (typeof document === 'undefined') return LIGHT
  return document.documentElement.dataset.productMode === DARK ? DARK : LIGHT
}

const emit = () => {
  listeners.forEach((listener) => listener())
}

const applyMode = (mode) => {
  if (typeof document !== 'undefined') {
    document.documentElement.dataset.productMode = mode
  }
}

const handleStorage = (event) => {
  if (event.key !== PRODUCT_IMAGE_MODE_KEY) return
  applyMode(event.newValue === DARK ? DARK : LIGHT)
  emit()
}

const subscribe = (listener) => {
  listeners.add(listener)

  if (!storageListenerBound && typeof window !== 'undefined') {
    window.addEventListener('storage', handleStorage)
    storageListenerBound = true
  }

  return () => {
    listeners.delete(listener)
  }
}

export const setProductImageMode = (next) => {
  const mode = next === DARK ? DARK : LIGHT
  applyMode(mode)

  try {
    window.localStorage.setItem(PRODUCT_IMAGE_MODE_KEY, mode)
  } catch {
    // Storage can be unavailable in private or restricted contexts.
  }

  emit()
}

export const useProductImageMode = () => {
  const mode = useSyncExternalStore(subscribe, readMode, () => LIGHT)

  const setMode = useCallback((next) => setProductImageMode(next), [])

  const toggle = useCallback(
    () => setProductImageMode(readMode() === DARK ? LIGHT : DARK),
    [],
  )

  return { mode, setMode, toggle }
}
