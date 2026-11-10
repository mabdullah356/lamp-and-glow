// Mock catalog used while no real API is configured (see .env.example).
// The "dark" image of each pair is derived from the exact same photograph,
// so both states share one framing. Replace with real photographed pairs from
// the backend once available; the service layer stays unchanged.
//
// Photo sources (CC-licensed stand-ins, cropped to 1200x1200 squares):
// glass-orb-pendant, sculpted-paper-pendant, stained-glass-table-lamp,
// crystal-drop-chandelier, industrial-cage-pendant, gallery-wall-sconce,
// feather-arc-floor-lamp, stacked-disc-chandelier — via Openverse/Flickr.

const makeImage = (id, mode, alt) => ({
  url: `/products/${id}-${mode}.jpg`,
  width: 1200,
  height: 1200,
  alt,
})

const makeProduct = (product) => ({
  ...product,
  images: {
    light: makeImage(product.id, 'light', `${product.name}, switched off`),
    dark: makeImage(product.id, 'dark', `${product.name}, switched on`),
  },
})

const MOCK_PRODUCTS = [
  makeProduct({
    id: 'woven-bamboo-lantern',
    name: 'Woven Bamboo Lantern',
    price: 98000,
    currency: 'PKR',
    category: 'Pendants',
  }),
  makeProduct({
    id: 'dome-black-pendant',
    name: 'Dome Black Pendant',
    price: 121000,
    currency: 'PKR',
    category: 'Pendants',
  }),
  makeProduct({
    id: 'illuminated-glass-table-lamp',
    name: 'Iridescent Glass Table Lamp',
    price: 87000,
    currency: 'PKR',
    category: 'Table Lamps',
  }),
  makeProduct({
    id: 'golden-crystal-chandelier',
    name: 'Golden Crystal Chandelier',
    price: 264000,
    currency: 'PKR',
    category: 'Chandeliers',
  }),
  makeProduct({
    id: 'intertwined-ring-chandelier',
    name: 'Intertwined Ring Chandelier',
    price: 232000,
    currency: 'PKR',
    category: 'Chandeliers',
  }),
  makeProduct({
    id: 'oval-glow-sconce',
    name: 'Oval Glow Sconce',
    price: 66000,
    currency: 'PKR',
    category: 'Sconces',
  }),
  makeProduct({
    id: 'warm-beige-wall-lamp',
    name: 'Warm Shade Wall Lamp',
    price: 73000,
    currency: 'PKR',
    category: 'Sconces',
  }),
  makeProduct({
    id: 'black-cylinder-floor-lamp',
    name: 'Black Cylinder Floor Lamp',
    price: 132000,
    currency: 'PKR',
    category: 'Floor Lamps',
  }),
]

const createAbortError = () => {
  const error = new Error('Request canceled.')
  error.name = 'AbortError'
  error.isCanceled = true
  return error
}

const wait = (duration, signal) =>
  new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject(createAbortError())
      return
    }

    const timer = window.setTimeout(() => {
      signal?.removeEventListener('abort', onAbort)
      resolve()
    }, duration)

    const onAbort = () => {
      window.clearTimeout(timer)
      reject(createAbortError())
    }

    signal?.addEventListener('abort', onAbort, { once: true })
  })

export const fetchMockProducts = async (params = {}, signal) => {
  await wait(650, signal)

  const category = params.category?.toLowerCase()
  const filtered =
    !category || category === 'all' || category === 'lighting'
      ? MOCK_PRODUCTS
      : MOCK_PRODUCTS.filter(
          (product) => product.category.toLowerCase() === category,
        )

  return { data: filtered }
}
