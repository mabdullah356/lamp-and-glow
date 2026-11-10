import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { AlertCircle, Plus, RotateCcw } from 'lucide-react'
import ProductCard from '../product/ProductCard'
import ProductGridSkeleton from '../product/ProductGridSkeleton'
import ProductModeToggle from '../product/ProductModeToggle'
import { useProducts } from '../../hooks/useProducts'

const EASE = [0.22, 1, 0.36, 1]

const CATEGORIES = [
  'All',
  'Pendants',
  'Chandeliers',
  'Sconces',
  'Table Lamps',
  'Floor Lamps',
]

const VIEW_OPTIONS = [
  { id: 'S', label: 'Small grid', gridClass: 'grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' },
  { id: 'M', label: 'Medium grid', gridClass: 'grid-cols-2 xl:grid-cols-3' },
  { id: 'L', label: 'Large grid', gridClass: 'grid-cols-1 lg:grid-cols-2' },
]

const ViewSelector = ({ value, onChange }) => (
  <div className="flex items-center gap-2.5">
    <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-stone">
      View:
    </span>
    <div
      role="group"
      aria-label="Product grid size"
      className="inline-flex items-center gap-1 rounded-full border border-espresso/10 bg-cream-deep/50 p-1"
    >
      {VIEW_OPTIONS.map((option) => (
        <button
          key={option.id}
          type="button"
          aria-label={option.label}
          aria-pressed={value === option.id}
          onClick={() => onChange(option.id)}
          className={`grid h-7 w-7 place-items-center rounded-full text-[10px] font-semibold transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass/60 ${
            value === option.id
              ? 'bg-espresso text-cream'
              : 'text-stone hover:text-espresso'
          }`}
        >
          {option.id}
        </button>
      ))}
    </div>
  </div>
)

const Collections = () => {
  const reduceMotion = useReducedMotion()
  const [activeFilter, setActiveFilter] = useState('All')
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [view, setView] = useState('S')

  const params = useMemo(
    () => ({ category: activeFilter === 'All' ? 'lighting' : activeFilter }),
    [activeFilter],
  )

  const { products, status, error, retry } = useProducts(params)
  const activeView =
    VIEW_OPTIONS.find((option) => option.id === view) ?? VIEW_OPTIONS[0]

  const countLabel =
    status === 'loading'
      ? 'Curating the collection…'
      : status === 'empty'
        ? 'No pieces found'
        : `${products.length} ${products.length === 1 ? 'piece' : 'pieces'}`

  return (
    <main className="bg-cream">
      <section className="mx-auto max-w-[1440px] px-4 pb-24 pt-10 sm:px-8 lg:px-12 lg:pb-32 lg:pt-14">
        <motion.header
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.6, ease: EASE }}
        >
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-stone"
          >
            <Link
              to="/"
              className="transition-colors duration-300 hover:text-espresso focus-visible:text-espresso focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass/50"
            >
              Home
            </Link>
            <span aria-hidden="true" className="text-brass">
              /
            </span>
            <span aria-current="page" className="text-espresso">
              Lighting
            </span>
          </nav>

          <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-brass">
                <span aria-hidden="true" className="h-px w-6 bg-brass/60" />
                The collection
              </p>
              <h1 className="mt-3 font-display text-5xl leading-[0.95] text-espresso sm:text-6xl">
                All Lighting
              </h1>
            </div>
            <p className="max-w-[38ch] text-[13.5px] leading-relaxed text-stone sm:text-right">
              Sculptural pieces in glass, brass and stone. Turn the lights on to
              see each one the way it will live in your home.
            </p>
          </div>
        </motion.header>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-espresso/10 pt-5">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-stone">
            {countLabel}
          </p>
          <ProductModeToggle />
        </div>

        <div className="mt-4 grid grid-cols-2 items-center gap-4 sm:grid-cols-[1fr_auto_1fr]">
          <span className="hidden sm:block" aria-hidden="true" />
          <button
            type="button"
            onClick={() => setFiltersOpen((open) => !open)}
            aria-expanded={filtersOpen}
            aria-controls="product-filters"
            className="inline-flex items-center justify-self-start gap-2 rounded-full border border-espresso/12 bg-cream-deep/40 px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-espresso transition-colors duration-300 hover:border-brass/45 hover:bg-brass/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass/60 sm:justify-self-center"
          >
            <Plus
              aria-hidden="true"
              className={`h-3.5 w-3.5 text-brass transition-transform duration-300 ${
                filtersOpen ? 'rotate-45' : ''
              }`}
            />
            Filter
            {activeFilter !== 'All' && (
              <span className="rounded-full bg-espresso px-2 py-0.5 text-[9px] tracking-[0.08em] text-cream">
                {activeFilter}
              </span>
            )}
          </button>
          <div className="justify-self-end">
            <ViewSelector value={view} onChange={setView} />
          </div>
        </div>

        <AnimatePresence initial={false}>
          {filtersOpen && (
            <motion.div
              id="product-filters"
              key="product-filters"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{
                duration: reduceMotion ? 0 : 0.3,
                ease: EASE,
              }}
              className="overflow-hidden"
            >
              <div
                role="group"
                aria-label="Filter products by category"
                className="flex flex-wrap gap-2 pb-1 pt-4"
              >
                {CATEGORIES.map((category) => (
                  <button
                    key={category}
                    type="button"
                    aria-pressed={activeFilter === category}
                    onClick={() => setActiveFilter(category)}
                    className={`rounded-full border px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass/60 ${
                      activeFilter === category
                        ? 'border-espresso bg-espresso text-cream'
                        : 'border-espresso/12 bg-transparent text-stone hover:border-brass/40 hover:text-espresso'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-9" aria-busy={status === 'loading'}>
          {status === 'loading' && (
            <ProductGridSkeleton gridClass={activeView.gridClass} />
          )}

          {status === 'error' && (
            <div className="flex flex-col items-center rounded-[28px] border border-espresso/10 bg-cream-deep/35 px-6 py-20 text-center">
              <span className="grid h-14 w-14 place-items-center rounded-full border border-brass/25 bg-brass/10 text-brass">
                <AlertCircle aria-hidden="true" className="h-6 w-6" />
              </span>
              <h2 className="mt-5 font-display text-3xl text-espresso">
                We could not load the collection.
              </h2>
              <p className="mt-2 max-w-md text-[13.5px] leading-relaxed text-stone">
                {error?.message || 'Please try again in a moment.'}
              </p>
              <button
                type="button"
                onClick={retry}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-espresso px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-cream transition-colors duration-300 hover:bg-espresso-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass/60"
              >
                <RotateCcw aria-hidden="true" className="h-3.5 w-3.5" />
                Try again
              </button>
            </div>
          )}

          {status === 'empty' && (
            <div className="flex flex-col items-center rounded-[28px] border border-espresso/10 bg-cream-deep/35 px-6 py-20 text-center">
              <h2 className="font-display text-3xl text-espresso">
                No pieces in this category yet.
              </h2>
              <p className="mt-2 max-w-md text-[13.5px] leading-relaxed text-stone">
                Try another category, or browse the full lighting collection.
              </p>
              <button
                type="button"
                onClick={() => setActiveFilter('All')}
                className="mt-6 rounded-full border border-espresso/15 px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-espresso transition-colors duration-300 hover:border-brass/45 hover:bg-brass/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass/60"
              >
                View all lighting
              </button>
            </div>
          )}

          {status === 'success' && (
            <div className={`grid gap-x-6 gap-y-10 ${activeView.gridClass}`}>
              {products.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  priority={index < 4}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}

export default Collections
