import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import {
  ArrowUpRight,
  ChevronDown,
  Globe,
  Heart,
  Mail,
  Search,
  ShoppingBag,
  X,
} from 'lucide-react'
import Wordmark from './Wordmark'
import {
  drawerItem,
  drawerNav,
  EASE,
  hrefFor,
  iconButton,
  NAV_LINKS,
  SHOP_CATEGORIES,
} from './headerData'

const MobileMenu = ({ open, onClose }) => {
  const navigate = useNavigate()
  const reduceMotion = useReducedMotion()
  const closeButtonRef = useRef(null)
  const [shopExpanded, setShopExpanded] = useState(false)
  const [query, setQuery] = useState('')

  useEffect(() => {
    if (!open) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const id = window.setTimeout(() => closeButtonRef.current?.focus(), 90)
    return () => window.clearTimeout(id)
  }, [open])

  useEffect(() => {
    const media = window.matchMedia('(min-width: 1024px)')
    const onChange = (event) => {
      if (event.matches) onClose()
    }
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [onClose])

  const runSearch = (value) => {
    const term = value.trim()
    if (!term) return
    navigate(`/collections?q=${encodeURIComponent(term)}`)
    setQuery('')
    onClose()
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    runSearch(query)
  }

  const trapFocus = (event) => {
    if (event.key !== 'Tab') return
    const focusable = Array.from(
      event.currentTarget.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])',
      ),
    ).filter((element) => element instanceof HTMLElement && element.offsetParent !== null)
    if (focusable.length === 0) return
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            key="mobile-backdrop"
            type="button"
            aria-label="Close menu"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] cursor-default bg-espresso/45 backdrop-blur-sm lg:hidden"
          />

          <motion.aside
            key="mobile-menu"
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={{ x: reduceMotion ? 0 : '100%' }}
            animate={{ x: 0 }}
            exit={{ x: reduceMotion ? 0 : '100%' }}
            transition={
              reduceMotion ? { duration: 0 } : { type: 'spring', damping: 30, stiffness: 300 }
            }
            onKeyDown={trapFocus}
            className="fixed inset-y-0 right-0 z-[70] flex w-[min(90vw,420px)] flex-col bg-cream shadow-[-24px_0_60px_-30px_rgba(33,26,19,0.5)] lg:hidden"
          >
            <div className="flex items-center justify-between border-b border-espresso/10 px-5 py-4">
              <Wordmark compact onClick={onClose} />
              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className={iconButton}
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto overscroll-contain px-5 pb-8 pt-5">
              <form role="search" onSubmit={handleSubmit} className="relative">
                <Search
                  className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-brass"
                  aria-hidden="true"
                />
                <label htmlFor="mobile-search" className="sr-only">
                  Search the collection
                </label>
                <input
                  id="mobile-search"
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search the collection…"
                  className="w-full rounded-full border border-espresso/15 bg-cream-deep/60 py-3 pl-11 pr-4 text-sm text-espresso placeholder:text-stone/60 focus:border-brass/50 focus:outline-none focus:ring-2 focus:ring-brass/20"
                />
              </form>

              <motion.nav
                variants={drawerNav}
                initial="hidden"
                animate="show"
                aria-label="Mobile"
                className="mt-6 flex flex-col"
              >
                {NAV_LINKS.map((item) => (
                  <motion.div key={item.label} variants={drawerItem}>
                    {item.mega ? (
                      <div>
                        <button
                          type="button"
                          onClick={() => setShopExpanded((value) => !value)}
                          aria-expanded={shopExpanded}
                          className="flex w-full items-center justify-between border-b border-espresso/10 py-3.5 text-left"
                        >
                          <span className="font-display text-[26px] leading-none text-espresso">
                            {item.label}
                          </span>
                          <ChevronDown
                            className={`h-4 w-4 text-stone transition-transform duration-300 ${
                              shopExpanded ? 'rotate-180 text-brass' : ''
                            }`}
                            aria-hidden="true"
                          />
                        </button>
                        <AnimatePresence initial={false}>
                          {shopExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: reduceMotion ? 0 : 0.28, ease: EASE }}
                              className="overflow-hidden"
                            >
                              <div className="grid grid-cols-2 gap-2 py-3">
                                {SHOP_CATEGORIES.map((category) => (
                                  <Link
                                    key={category.title}
                                    to={category.to}
                                    onClick={onClose}
                                    className="rounded-xl bg-espresso/[0.035] px-3 py-2.5 text-[12px] font-medium text-espresso/80 transition-colors hover:bg-brass/10 hover:text-espresso"
                                  >
                                    {category.title}
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        to={hrefFor(item)}
                        onClick={onClose}
                        className="flex items-center justify-between border-b border-espresso/10 py-3.5"
                      >
                        <span className="font-display text-[26px] leading-none text-espresso">
                          {item.label}
                        </span>
                        <ArrowUpRight className="h-4 w-4 text-stone" aria-hidden="true" />
                      </Link>
                    )}
                  </motion.div>
                ))}
              </motion.nav>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: reduceMotion ? 0 : 0.32, duration: 0.4, ease: EASE }}
                className="mt-8 rounded-2xl bg-espresso p-5 text-cream"
              >
                <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-brass-light">
                  The atelier
                </p>
                <p className="mt-2 font-display text-xl leading-tight">
                  Light that lives with you.
                </p>
                <div className="mt-4 space-y-2.5 text-[11px] text-cream/70">
                  <a
                    href="mailto:support@lampandglow.com"
                    className="flex items-center gap-2 transition-colors hover:text-cream"
                  >
                    <Mail className="h-3.5 w-3.5 text-brass-light" aria-hidden="true" />
                    support@lampandglow.com
                  </a>
                  <p className="flex items-center gap-2">
                    <Globe className="h-3.5 w-3.5 text-brass-light" aria-hidden="true" />
                    Handcrafted in Pakistan
                  </p>
                </div>
              </motion.div>
            </div>

            <div className="border-t border-espresso/10 px-5 py-4">
              <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.16em] text-stone">
                <span className="inline-flex items-center gap-1.5">
                  <Globe className="h-3.5 w-3.5" aria-hidden="true" />
                  Pakistan · PKR
                </span>
                <div className="flex items-center gap-4">
                  <Link
                    to="/collections?view=wishlist"
                    onClick={onClose}
                    className="inline-flex items-center gap-1.5 transition-colors hover:text-espresso"
                  >
                    <Heart className="h-3.5 w-3.5" aria-hidden="true" />
                    Wishlist
                  </Link>
                  <Link
                    to="/collections?view=cart"
                    onClick={onClose}
                    className="inline-flex items-center gap-1.5 transition-colors hover:text-espresso"
                  >
                    <ShoppingBag className="h-3.5 w-3.5" aria-hidden="true" />
                    Cart
                  </Link>
                </div>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}

export default MobileMenu
