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
    description: [
      'Strands of cured bamboo are woven by hand over a turned hardwood frame — open enough to let the light breathe, tight enough to hold its shape for decades. Hung low, it lays a lattice of warm shadow across everything beneath it.',
      'The bamboo is finished in a natural matte oil, so it keeps the colour of the afternoon it was cut, and the pendant arrives voltage-matched with a warm filament bulb and an inline dimmer on a braided cord.',
    ],
    details: [
      ['Material', 'Woven bamboo, hardwood frame'],
      ['Height', '46 cm'],
      ['Diameter', '32 cm'],
      ['Bulb', 'E27 warm filament, included'],
      ['Cord', '1.8 m braided, inline dimmer'],
      ['Made in', 'Karachi, Pakistan'],
    ],
  }),
  makeProduct({
    id: 'dome-black-pendant',
    name: 'Dome Black Pendant',
    price: 121000,
    currency: 'PKR',
    category: 'Pendants',
    description: [
      'A single spun dome in matte black, lined with warm brass so the light it throws is never cold. It hangs close and low — the light lands on the table, not the ceiling, exactly where an evening wants it.',
      'Height-adjustable on a black fabric cord, with a voltage-matched E27 bulb in the box and every piece numbered and signed beneath the canopy.',
    ],
    details: [
      ['Material', 'Spun aluminium, matte black'],
      ['Interior', 'Warm brass'],
      ['Height', '24 cm'],
      ['Diameter', '38 cm'],
      ['Bulb', 'E27, included'],
      ['Cord', '2 m black fabric, adjustable'],
    ],
  }),
  makeProduct({
    id: 'illuminated-glass-table-lamp',
    name: 'Iridescent Glass Table Lamp',
    price: 87000,
    currency: 'PKR',
    category: 'Table Lamps',
    description: [
      'Hand-blown in a single sitting, so no two vessels share exactly the same swell. By day the iridescent skin catches the window like soap film; lit from within, it holds the low amber of embers an hour after the fire.',
      'The glass sits on a turned hardwood collar, weighted so it cannot tip, and is wired with a cloth cord and inline dimmer that takes it down to a nightlight.',
    ],
    details: [
      ['Material', 'Hand-blown iridescent glass, hardwood'],
      ['Height', '40 cm'],
      ['Diameter', '22 cm'],
      ['Bulb', 'E14 warm LED, included'],
      ['Cord', '1.5 m cloth, inline dimmer'],
      ['Made in', 'Karachi, Pakistan'],
    ],
  }),
  makeProduct({
    id: 'golden-crystal-chandelier',
    name: 'Golden Crystal Chandelier',
    price: 264000,
    currency: 'PKR',
    category: 'Chandeliers',
    description: [
      'Aged brass framing a fall of hand-cut crystal — each piece hung and balanced until the whole reads as one slow pour of light. Dimmed low it turns a dining room candlelit; raised full, it fills a stairwell.',
      'The chandelier arrives in a hand-packed crate with its own hanging kit, height-adjustable chain, and every crystal numbered to its position.',
    ],
    details: [
      ['Material', 'Aged brass, hand-cut crystal'],
      ['Height', '85 cm'],
      ['Diameter', '60 cm'],
      ['Bulbs', '8 × E14'],
      ['Chain', '1 m, adjustable'],
      ['Made in', 'Karachi, Pakistan'],
    ],
  }),
  makeProduct({
    id: 'intertwined-ring-chandelier',
    name: 'Intertwined Ring Chandelier',
    price: 232000,
    currency: 'PKR',
    category: 'Chandeliers',
    description: [
      'Two forged rings — one dark, one pale — are set into a single slow twist, held at the moment before they meet. Suspended over a stair or a long table, the geometry changes as you move around it.',
      'Each ring carries its own diffused light, dimmable together or apart, so the piece can favour one arm of the room. Balanced by hand until it hangs perfectly still.',
    ],
    details: [
      ['Material', 'Forged steel, two-tone finish'],
      ['Diameter', '70 cm'],
      ['Drop', '55 cm'],
      ['Light', 'Diffused LED, dimmable'],
      ['Canopy', 'Matching steel, signed'],
      ['Weight', '6.8 kg'],
    ],
  }),
  makeProduct({
    id: 'oval-glow-sconce',
    name: 'Oval Glow Sconce',
    price: 66000,
    currency: 'PKR',
    category: 'Sconces',
    description: [
      'One spun oval, mounted on a shadow gap so the light never touches the wall directly — it lands as a soft ring, wider than the fixture itself. Read beside the bed or lighting a corridor, it does one thing perfectly.',
      'The mount is brass over solid hardwood, and the whole piece fits with two screws and a push-in connector — no electrician needed for the wiring side.',
    ],
    details: [
      ['Material', 'Spun brass over hardwood'],
      ['Size', '30 × 18 cm'],
      ['Light', 'LED, 2700K warm'],
      ['Mount', 'Two screws, push-in connector'],
      ['Made in', 'Karachi, Pakistan'],
    ],
  }),
  makeProduct({
    id: 'warm-beige-wall-lamp',
    name: 'Warm Shade Wall Lamp',
    price: 73000,
    currency: 'PKR',
    category: 'Sconces',
    description: [
      'A soft linen shade over a solid oak backplate — wall light with the temperament of a table lamp, for the corner where floor space is precious. The light it gives is sideways and low, warm as the hour it is made for.',
      'Wired with a cloth cord and a rocker switch within reach, so it can be hung anywhere a socket lives.',
    ],
    details: [
      ['Material', 'Linen shade, oak backplate'],
      ['Size', '26 × 16 cm'],
      ['Bulb', 'E14 warm LED, included'],
      ['Switch', 'Rocker on cloth cord'],
      ['Made in', 'Karachi, Pakistan'],
    ],
  }),
  makeProduct({
    id: 'black-cylinder-floor-lamp',
    name: 'Black Cylinder Floor Lamp',
    price: 132000,
    currency: 'PKR',
    category: 'Floor Lamps',
    description: [
      'One cylinder of turned hardwood, stained to a deep charcoal and sanded until it reads like stone. By day it stands as sculpture; after dark the inner diffuser opens into a soft column of amber that climbs the wall behind it.',
      'A braided cord with an inline dimmer takes the glow down to a last ember. Each piece is numbered and signed beneath the base.',
    ],
    details: [
      ['Material', 'Turned hardwood, charcoal stain'],
      ['Height', '160 cm'],
      ['Base', '30 cm'],
      ['Bulb', 'E27 warm filament, included'],
      ['Cord', '2 m braided, inline dimmer'],
      ['Made in', 'Karachi, Pakistan'],
    ],
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

export const fetchMockProduct = async (productId, signal) => {
  await wait(650, signal)

  return (
    MOCK_PRODUCTS.find((product) => product.id === String(productId)) ?? null
  )
}
