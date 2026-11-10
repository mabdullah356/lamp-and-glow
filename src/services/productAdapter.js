const DEFAULT_DIMENSION = 1200

const toImage = (image, fallbackAlt) => {
  if (!image || typeof image.url !== 'string' || !image.url.trim()) return null

  return {
    url: image.url,
    width: Number(image.width) || DEFAULT_DIMENSION,
    height: Number(image.height) || DEFAULT_DIMENSION,
    alt: image.alt || fallbackAlt,
  }
}

export const adaptProduct = (raw) => {
  if (!raw || raw.id === undefined || raw.id === null) return null

  const name = raw.name || 'Untitled piece'
  const light = toImage(raw.images?.light, `${name}, switched off`)
  if (!light) return null

  let dark = toImage(raw.images?.dark, `${name}, switched on`)

  if (!dark) {
    if (import.meta.env.DEV) {
      console.warn(
        `[products] Missing dark image for "${raw.id}". Falling back to the light image.`,
      )
    }
    dark = light
  }

  return {
    id: String(raw.id),
    name,
    price: Number(raw.price) || 0,
    currency: raw.currency || 'USD',
    category: raw.category || 'Lighting',
    images: { light, dark },
  }
}

export const adaptProducts = (payload) => {
  const items = Array.isArray(payload) ? payload : payload?.data
  if (!Array.isArray(items)) return []

  return items.map(adaptProduct).filter(Boolean)
}
