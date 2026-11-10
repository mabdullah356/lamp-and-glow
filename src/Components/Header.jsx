import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useMotionValueEvent, useReducedMotion, useScroll, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, Heart, Menu, Search, ShoppingBag, User, X } from 'lucide-react'
import AnnouncementBar from './header-parts/AnnouncementBar'
import DesktopNav from './header-parts/DesktopNav'
import MobileMenu from './header-parts/MobileMenu'
import SearchPanel from './header-parts/SearchPanel'
import Wordmark from './header-parts/Wordmark'
import { headerItem, headerLoad, iconButton } from './header-parts/headerData'

const Header = () => {
  const reduceMotion = useReducedMotion()
  const { scrollY } = useScroll()

  const [scrolled, setScrolled] = useState(false)
  const [shopOpen, setShopOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const menuButtonRef = useRef(null)
  const wasMobileOpen = useRef(false)

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 16)
  })

  const closeMobile = useCallback(() => setMobileOpen(false), [])
  const openMobile = useCallback(() => setMobileOpen(true), [])
  const closeSearch = useCallback(() => setSearchOpen(false), [])

  const openShop = useCallback(() => {
    setSearchOpen(false)
    setShopOpen(true)
  }, [])

  const toggleSearch = useCallback(() => {
    setShopOpen(false)
    setSearchOpen((open) => !open)
  }, [])

  const closeAll = useCallback(() => {
    setShopOpen(false)
    setSearchOpen(false)
    setMobileOpen(false)
  }, [])

  useEffect(() => {
    window.addEventListener('popstate', closeAll)
    return () => window.removeEventListener('popstate', closeAll)
  }, [closeAll])

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setShopOpen(false)
        setSearchOpen(false)
        setMobileOpen(false)
      }
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setShopOpen(false)
        setMobileOpen(false)
        setSearchOpen((open) => !open)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  useEffect(() => {
    if (wasMobileOpen.current && !mobileOpen) menuButtonRef.current?.focus()
    wasMobileOpen.current = mobileOpen
  }, [mobileOpen])

  return (
    <header className="relative z-50 font-sans">
      <AnnouncementBar />

      <AnimatePresence>
        {searchOpen && (
          <motion.button
            key="search-backdrop"
            type="button"
            aria-label="Close search"
            onClick={closeSearch}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-30 cursor-default bg-espresso/20 backdrop-blur-[2px]"
          />
        )}
      </AnimatePresence>

      <motion.div
        variants={headerLoad}
        initial={reduceMotion ? false : 'hidden'}
        animate="show"
        onMouseLeave={() => setShopOpen(false)}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) setShopOpen(false)
        }}
        className={`sticky top-0 z-40 border-b backdrop-blur-xl transition-[height,background-color,border-color,box-shadow] duration-500 ${
          scrolled
            ? 'h-16 border-espresso/10 bg-cream/95 shadow-[0_18px_40px_-30px_rgba(33,26,19,0.45)] lg:h-20'
            : 'h-[72px] border-transparent bg-cream/85 lg:h-[88px]'
        }`}
      >
        <div className="relative mx-auto flex h-full max-w-[1440px] items-center justify-between gap-4 px-4 sm:px-8 lg:px-12">
          <motion.div variants={headerItem}>
            <Wordmark onClick={closeAll} />
          </motion.div>

          <div className="hidden flex-1 items-center justify-center lg:flex">
            <DesktopNav
              shopOpen={shopOpen}
              onShopEnter={openShop}
              onShopClick={openShop}
              onNavigate={closeAll}
            />
          </div>

          <SearchPanel open={searchOpen} onClose={closeSearch} />

          <motion.div
            variants={headerLoad}
            className="flex shrink-0 items-center gap-0.5 sm:gap-1"
          >
            <motion.div variants={headerItem}>
              <button
                type="button"
                onClick={toggleSearch}
                aria-label={searchOpen ? 'Close search' : 'Open search'}
                aria-expanded={searchOpen}
                aria-controls="search-panel"
                className={iconButton}
              >
                {searchOpen ? (
                  <X className="h-[18px] w-[18px]" aria-hidden="true" />
                ) : (
                  <Search className="h-[18px] w-[18px]" aria-hidden="true" />
                )}
              </button>
            </motion.div>

            <motion.div variants={headerItem} className="hidden sm:block">
              <Link
                to="/collections?view=wishlist"
                onClick={closeAll}
                aria-label="Wishlist"
                className={iconButton}
              >
                <Heart className="h-[18px] w-[18px]" aria-hidden="true" />
              </Link>
            </motion.div>

            <motion.div variants={headerItem} className="hidden sm:block">
              <Link to="/collections?view=account" onClick={closeAll} aria-label="Account" className={iconButton}>
                <User className="h-[18px] w-[18px]" aria-hidden="true" />
              </Link>
            </motion.div>

            <motion.div variants={headerItem}>
              <Link
                to="/collections?view=cart"
                onClick={closeAll}
                aria-label="Cart, 0 items"
                className={iconButton}
              >
                <ShoppingBag className="h-[18px] w-[18px]" aria-hidden="true" />
                <span className="absolute right-1.5 top-1.5 grid h-4 min-w-4 place-items-center rounded-full bg-brass px-1 text-[9px] font-bold leading-none text-espresso">
                  0
                </span>
              </Link>
            </motion.div>

            <motion.div variants={headerItem} className="ml-2 hidden xl:block">
              <Link
                to="/collections"
                onClick={closeAll}
                className="group inline-flex items-center gap-2 rounded-full bg-espresso px-5 py-2.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-cream transition-colors duration-300 hover:bg-espresso-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass/60"
              >
                Shop the collection
                <ArrowUpRight
                  className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
            </motion.div>

            <motion.div variants={headerItem} className="lg:hidden">
              <button
                ref={menuButtonRef}
                type="button"
                onClick={openMobile}
                aria-label="Open menu"
                aria-expanded={mobileOpen}
                aria-controls="mobile-menu"
                className={iconButton}
              >
                <Menu className="h-5 w-5" aria-hidden="true" />
              </button>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      <MobileMenu open={mobileOpen} onClose={closeMobile} />
    </header>
  )
}

export default Header
