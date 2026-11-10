import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  Sparkles,
  Truck,
} from 'lucide-react'
import heroImage from '../../assets/hero.png'
import {
  EASE,
  headerItem,
  headerLoad,
  hrefFor,
  isNavActive,
  NAV_LINKS,
  panelItem,
  panelMotion,
  SHOP_CATEGORIES,
  SHOP_QUICK_LINKS,
} from './headerData'

const DesktopNav = ({ shopOpen, onShopEnter, onShopClick, onNavigate }) => {
  const location = useLocation()

  return (
    <>
      <motion.nav
        variants={headerLoad}
        aria-label="Primary"
        className="flex items-center gap-6 xl:gap-8"
      >
        {NAV_LINKS.map((item) => {
          const active = isNavActive(item, location)

          return (
            <motion.div key={item.label} variants={headerItem}>
              {item.mega ? (
                <button
                  type="button"
                  onClick={onShopClick}
                  onMouseEnter={onShopEnter}
                  aria-haspopup="true"
                  aria-expanded={shopOpen}
                  aria-controls="mega-menu"
                  className={`group relative inline-flex items-center gap-1.5 py-2 text-[12px] font-semibold uppercase tracking-[0.18em] transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass/50 ${
                    shopOpen || active ? 'text-espresso' : 'text-stone hover:text-espresso'
                  }`}
                >
                  {item.label}
                  <ChevronDown
                    className={`h-3.5 w-3.5 transition-transform duration-300 ${
                      shopOpen ? 'rotate-180 text-brass' : ''
                    }`}
                    aria-hidden="true"
                  />
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-0 -bottom-0.5 h-px origin-left bg-brass transition-transform duration-300 ${
                      shopOpen || active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                  />
                </button>
              ) : (
                <Link
                  to={hrefFor(item)}
                  onClick={onNavigate}
                  aria-current={active ? 'page' : undefined}
                  className={`group relative inline-flex py-2 text-[12px] font-semibold uppercase tracking-[0.18em] transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass/50 ${
                    active ? 'text-espresso' : 'text-stone hover:text-espresso'
                  }`}
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-0 -bottom-0.5 h-px origin-left bg-brass transition-transform duration-300 ${
                      active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                  />
                </Link>
              )}
            </motion.div>
          )
        })}
      </motion.nav>

      <AnimatePresence>
        {shopOpen && (
          <motion.div
            id="mega-menu"
            key="mega-menu"
            role="region"
            aria-label="Shop by category"
            variants={panelMotion}
            initial="hidden"
            animate="show"
            exit="exit"
            className="absolute inset-x-0 top-full z-40 hidden overflow-hidden border-b border-espresso/10 bg-cream/95 shadow-[0_30px_60px_-32px_rgba(33,26,19,0.45)] backdrop-blur-xl lg:block"
          >
            <div className="mx-auto grid max-w-[1440px] gap-10 px-4 py-9 sm:px-8 lg:grid-cols-[1.35fr_1fr] lg:px-12 lg:py-11">
              <motion.div variants={panelItem}>
                <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-brass">
                  Shop by category
                </p>
                <motion.div
                  variants={{
                    hidden: {},
                    show: { transition: { staggerChildren: 0.045, delayChildren: 0.05 } },
                  }}
                  className="mt-5 grid gap-x-8 gap-y-1 sm:grid-cols-2"
                >
                  {SHOP_CATEGORIES.map((category) => {
                    const Icon = category.icon

                    return (
                      <motion.div key={category.title} variants={panelItem}>
                        <Link
                          to={category.to}
                          onClick={onNavigate}
                          className="group flex h-full items-start gap-3.5 rounded-2xl px-3 py-3 transition-colors duration-300 hover:bg-espresso/[0.045] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass/50"
                        >
                          <span className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-full border border-espresso/10 bg-cream text-brass transition-colors duration-300 group-hover:border-brass/40 group-hover:bg-brass/10">
                            <Icon
                              className="h-[18px] w-[18px]"
                              strokeWidth={1.5}
                              aria-hidden="true"
                            />
                          </span>
                          <span className="min-w-0">
                            <span className="flex items-center gap-2 font-display text-[19px] font-medium leading-tight text-espresso">
                              {category.title}
                              <ArrowRight
                                className="h-3.5 w-3.5 -translate-x-1 text-brass opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                                aria-hidden="true"
                              />
                            </span>
                            <span className="mt-1 block text-[11.5px] leading-relaxed text-stone">
                              {category.blurb}
                            </span>
                          </span>
                        </Link>
                      </motion.div>
                    )
                  })}
                </motion.div>
              </motion.div>

              <motion.div variants={panelItem}>
                <Link
                  to="/signature"
                  onClick={onNavigate}
                  className="group relative flex min-h-[280px] overflow-hidden rounded-3xl bg-espresso lg:min-h-[300px]"
                >
                  <img
                    src={heroImage}
                    alt="A sculptural Lamp and Glow lamp glowing in a warm interior"
                    className="absolute inset-0 h-full w-full object-cover opacity-85 transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/35 to-transparent" />
                  <div className="relative mt-auto w-full p-6">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-cream/20 bg-cream/10 px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.2em] text-brass-light backdrop-blur">
                      <Sparkles className="h-3 w-3" aria-hidden="true" />
                      Signature
                    </span>
                    <p className="mt-4 font-display text-[28px] leading-tight text-cream">
                      Light, shaped by hand.
                    </p>
                    <p className="mt-1 max-w-[34ch] text-xs leading-relaxed text-cream/65">
                      Sculptural pieces in solid wood, finished for the hour after sunset.
                    </p>
                    <span className="mt-5 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-cream/85 transition-colors group-hover:text-cream">
                      Explore the collection
                      <ArrowUpRight
                        className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                </Link>
              </motion.div>
            </div>

            <motion.div
              variants={panelItem}
              transition={{ duration: 0.4, ease: EASE }}
              className="border-t border-espresso/10"
            >
              <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-3 px-4 py-3.5 sm:px-8 lg:px-12">
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                  {SHOP_QUICK_LINKS.map((link) => (
                    <Link
                      key={link.label}
                      to={link.to}
                      onClick={onNavigate}
                      className="text-[10px] font-semibold uppercase tracking-[0.18em] text-stone transition-colors hover:text-espresso"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
                <p className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.14em] text-stone">
                  <Truck className="h-3.5 w-3.5 text-brass" aria-hidden="true" />
                  Complimentary delivery over Rs. 15,000
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default DesktopNav
