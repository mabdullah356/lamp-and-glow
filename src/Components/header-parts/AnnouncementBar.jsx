import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Globe, X } from 'lucide-react'
import { ANNOUNCEMENTS, ANNOUNCEMENT_KEY, EASE } from './headerData'

const AnnouncementBar = () => {
  const reduceMotion = useReducedMotion()
  const [open, setOpen] = useState(() => {
    if (typeof window === 'undefined') return true
    try {
      return window.localStorage.getItem(ANNOUNCEMENT_KEY) !== 'dismissed'
    } catch {
      return true
    }
  })
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (!open || reduceMotion) return
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % ANNOUNCEMENTS.length)
    }, 5200)
    return () => window.clearInterval(id)
  }, [open, reduceMotion])

  const dismiss = () => {
    setOpen(false)
    try {
      window.localStorage.setItem(ANNOUNCEMENT_KEY, 'dismissed')
    } catch {
      return
    }
  }

  const message = ANNOUNCEMENTS[index % ANNOUNCEMENTS.length]
  const MessageIcon = message.icon

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.35, ease: EASE }}
          className="overflow-hidden bg-espresso text-cream"
        >
          <div className="mx-auto grid h-9 max-w-[1440px] grid-cols-[1fr_auto_1fr] items-center px-4 sm:px-8 lg:px-12">
            <div className="flex items-center gap-5">
              <span className="hidden items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.18em] text-cream/60 md:inline-flex">
                <Globe className="h-3 w-3" aria-hidden="true" />
                Pakistan · PKR
              </span>
              <Link
                to="/collections?view=collections"
                className="hidden text-[10px] font-medium uppercase tracking-[0.18em] text-cream/60 transition-colors hover:text-cream sm:inline"
              >
                Track order
              </Link>
            </div>

            <div className="flex min-w-0 items-center justify-center">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: reduceMotion ? 0 : 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: reduceMotion ? 0 : -8 }}
                  transition={{ duration: reduceMotion ? 0 : 0.32, ease: EASE }}
                  className="flex items-center gap-2 whitespace-nowrap text-[10px] font-medium uppercase tracking-[0.16em] text-cream/85 sm:text-[11px]"
                >
                  <MessageIcon
                    className="h-3.5 w-3.5 shrink-0 text-brass-light"
                    aria-hidden="true"
                  />
                  <span className="truncate">{message.text}</span>
                  <span className="hidden items-center gap-2 text-cream/45 lg:inline-flex">
                    <span className="h-1 w-1 rounded-full bg-cream/30" />
                    {message.note}
                  </span>
                </motion.span>
              </AnimatePresence>
            </div>

            <div className="flex items-center justify-end">
              <button
                type="button"
                onClick={dismiss}
                aria-label="Dismiss announcement"
                className="grid h-6 w-6 place-items-center rounded-full text-cream/45 transition-colors hover:bg-cream/10 hover:text-cream focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brass-light"
              >
                <X className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default AnnouncementBar
