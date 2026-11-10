import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Search } from 'lucide-react'
import { panelMotion, POPULAR_SEARCHES } from './headerData'

const SearchPanel = ({ open, onClose }) => {
  const navigate = useNavigate()
  const inputRef = useRef(null)
  const [query, setQuery] = useState('')

  useEffect(() => {
    if (!open) return
    const id = window.setTimeout(() => inputRef.current?.focus(), 90)
    return () => window.clearTimeout(id)
  }, [open])

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

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="search-panel"
          id="search-panel"
          variants={panelMotion}
          initial="hidden"
          animate="show"
          exit="exit"
          className="absolute inset-x-0 top-full z-40 border-b border-espresso/10 bg-cream/95 shadow-[0_30px_60px_-32px_rgba(33,26,19,0.45)] backdrop-blur-xl"
        >
          <div className="mx-auto max-w-[1440px] px-4 py-6 sm:px-8 sm:py-8 lg:px-12">
            <form
              role="search"
              onSubmit={handleSubmit}
              className="flex items-center gap-3 border-b border-espresso/15 pb-4 sm:gap-4"
            >
              <Search className="h-5 w-5 shrink-0 text-brass" aria-hidden="true" />
              <label htmlFor="site-search" className="sr-only">
                Search the collection
              </label>
              <input
                ref={inputRef}
                id="site-search"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search lamps, collections, materials…"
                className="min-w-0 flex-1 bg-transparent font-display text-lg text-espresso placeholder:text-stone/60 focus:outline-none sm:text-2xl"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="hidden text-[10px] font-semibold uppercase tracking-[0.16em] text-stone transition-colors hover:text-espresso sm:block"
                >
                  Clear
                </button>
              )}
              <button
                type="submit"
                className="inline-flex shrink-0 items-center gap-2 rounded-full bg-espresso px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-cream transition-colors hover:bg-espresso-light sm:px-5 sm:text-[11px]"
              >
                Search
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            </form>

            <div className="mt-5 flex flex-wrap items-center gap-2">
              <span className="mr-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-stone">
                Popular
              </span>
              {POPULAR_SEARCHES.map((term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => runSearch(term)}
                  className="rounded-full border border-espresso/15 px-3 py-1.5 text-[11px] font-medium text-espresso/70 transition-colors hover:border-brass/50 hover:bg-brass/10 hover:text-espresso"
                >
                  {term}
                </button>
              ))}
            </div>

            <p className="mt-4 hidden items-center gap-1.5 text-[10px] uppercase tracking-[0.14em] text-stone/70 sm:flex">
              Press
              <kbd className="rounded border border-espresso/15 px-1.5 py-0.5 font-sans text-[9px] text-espresso/70">
                Esc
              </kbd>
              to close
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default SearchPanel
