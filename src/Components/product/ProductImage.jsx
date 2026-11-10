import { useEffect, useState } from 'react'
import { useProductImageMode } from '../../hooks/useProductImageMode'
import './productImage.css'

const scheduleIdle = (callback) => {
  if (typeof window === 'undefined') return () => {}

  if ('requestIdleCallback' in window) {
    const id = window.requestIdleCallback(callback, { timeout: 2000 })
    return () => window.cancelIdleCallback?.(id)
  }

  const id = window.setTimeout(callback, 1200)
  return () => window.clearTimeout(id)
}

const ProductImage = ({ images, priority = false }) => {
  const { mode } = useProductImageMode()
  const [lightLoaded, setLightLoaded] = useState(false)

  const light = images.light
  const dark = images.dark ?? light
  const isDark = mode === 'dark'

  useEffect(() => {
    if (!lightLoaded || dark.url === light.url) return undefined

    return scheduleIdle(() => {
      const preloaded = new Image()
      preloaded.src = dark.url
    })
  }, [dark.url, light.url, lightLoaded])

  return (
    <div
      className="product-image"
      style={{ aspectRatio: `${light.width} / ${light.height}` }}
    >
      <img
        className="product-image__img product-image__img--light"
        src={light.url}
        alt={light.alt}
        width={light.width}
        height={light.height}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
        aria-hidden={isDark}
        onLoad={() => setLightLoaded(true)}
      />
      <img
        className="product-image__img product-image__img--dark"
        src={dark.url}
        alt={dark.alt}
        width={light.width}
        height={light.height}
        loading="lazy"
        decoding="async"
        aria-hidden={!isDark}
      />
    </div>
  )
}

export default ProductImage
