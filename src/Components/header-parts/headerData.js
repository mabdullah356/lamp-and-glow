import {
  Flame,
  LampCeiling,
  LampDesk,
  LampFloor,
  Package,
  Sparkles,
  Sun,
  Truck,
} from 'lucide-react'

export const EASE = [0.22, 1, 0.36, 1]
export const ANNOUNCEMENT_KEY = 'lamp-and-glow:announcement-dismissed'

export const NAV_LINKS = [
  { label: 'Shop', path: '/collections', mega: true },
  { label: 'Collections', path: '/collections', search: 'view=collections' },
  { label: 'Signature', path: '/collections', search: 'view=signature' },
  { label: 'Contact', path: '/', hash: 'contact' },
]

export const SHOP_CATEGORIES = [
  {
    title: 'Table Lamps',
    blurb: 'Bedside and desk light, kept within arm’s reach.',
    to: '/collections?category=table-lamps',
    icon: LampDesk,
  },
  {
    title: 'Floor Lamps',
    blurb: 'Tall light for the corner a room is built around.',
    to: '/collections?category=floor-lamps',
    icon: LampFloor,
  },
  {
    title: 'Pendants',
    blurb: 'Hung low over the table, the island and the stair.',
    to: '/collections?category=pendants',
    icon: LampCeiling,
  },
  {
    title: 'Wall Lights',
    blurb: 'Light fixed to the wall, where floor space is precious.',
    to: '/collections?category=wall-lights',
    icon: Sun,
  },
  {
    title: 'Candle Holders',
    blurb: 'Candlesticks for the table, mantel and windowsill.',
    to: '/collections?category=candle-holders',
    icon: Flame,
  },
  {
    title: 'Entryway',
    blurb: 'The first light a guest sees at your door.',
    to: '/collections?category=entryway',
    icon: Sparkles,
  },
]

export const SHOP_QUICK_LINKS = [
  { label: 'All pieces', to: '/collections' },
  { label: 'New arrivals', to: '/collections?sort=new' },
  { label: 'Bestsellers', to: '/collections?sort=popular' },
  { label: 'Gift cards', to: '/collections?view=gift' },
]

export const POPULAR_SEARCHES = ['Table lamps', 'Floor lamps', 'Pendants', 'Gift sets']

export const ANNOUNCEMENTS = [
  {
    icon: Truck,
    text: 'Handcrafted in 2–4 days',
    note: 'Delivered across Pakistan in 3–5 business days',
  },
  {
    icon: Sparkles,
    text: 'Complimentary gift wrapping',
    note: 'On every handcrafted order',
  },
  {
    icon: Package,
    text: 'Lifetime structural warranty',
    note: 'On every solid-wood piece',
  },
]

export const headerLoad = {
  hidden: {},
  show: { transition: { staggerChildren: 0.055, delayChildren: 0.1 } },
}

export const headerItem = {
  hidden: { opacity: 0, y: -12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
}

export const panelMotion = {
  hidden: { opacity: 0, y: -12 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.28,
      ease: EASE,
      when: 'beforeChildren',
      staggerChildren: 0.035,
    },
  },
  exit: { opacity: 0, y: -8, transition: { duration: 0.18, ease: 'easeIn' } },
}

export const panelItem = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE } },
}

export const drawerNav = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05, delayChildren: 0.12 } },
}

export const drawerItem = {
  hidden: { opacity: 0, x: 24 },
  show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: EASE } },
}

export const iconButton =
  'relative grid h-10 w-10 place-items-center rounded-full text-espresso/70 transition-colors duration-300 hover:bg-espresso/[0.05] hover:text-espresso focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass/50'

export const hrefFor = (item) => {
  if (item.hash) return `${item.path}#${item.hash}`
  if (item.search) return `${item.path}?${item.search}`
  return item.path
}

export const isNavActive = (item, location) => {
  if (item.path !== location.pathname) return false
  if (item.hash) return location.hash === `#${item.hash}`
  if (item.search) return location.search.includes(item.search)
  return !location.search
}
