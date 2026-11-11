import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import {
  AlertCircle,
  ArrowUpRight,
  Check,
  ChevronDown,
  Loader2,
  Minus,
  Package,
  Plus,
  RotateCcw,
  ShieldCheck,
  ShoppingBag,
  Truck,
} from 'lucide-react'
import ProductCard from '../product/ProductCard'
import ProductImage from '../product/ProductImage'
import ProductModeToggle from '../product/ProductModeToggle'
import formatPrice from '../../utils/formatPrice'
import { useProduct } from '../../hooks/useProduct'
import { useProducts } from '../../hooks/useProducts'

const EASE = [0.22, 1, 0.36, 1]

const PROMISES = [
  {
    icon: Truck,
    title: 'Handcrafted in 2–4 days',
    note: 'Each piece is made to order in the Karachi atelier',
  },
  {
    icon: Package,
    title: 'Delivered in 3–5 business days',
    note: 'Across Pakistan, tracked door to door',
  },
  {
    icon: ShieldCheck,
    title: 'Lifetime structural warranty',
    note: 'On the wood and the craftsmanship',
  },
]

const ACCORDION_COPY = {
  materials:
    'Solid wood, glass, brass and natural finishes, hand-sanded to silk. Dust with a soft, dry cloth; keep water and direct sun off it. No polish, ever — the finish is cured to need nothing but the shade you put it in.',
  shipping:
    'Handcrafted in 2–4 days and delivered across Pakistan in 3–5 business days, fully tracked. Standard pieces may be returned within 7 days of delivery, unused and in their original packaging.',
  warranty:
    'Every piece carries our lifetime structural warranty on the wood and craftsmanship, with two years on the electricals. If a joint ever fails, we repair or replace it — the piece outlives the paperwork.',
}

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
}

const ProductSkeleton = () => (
  <div className="grid gap-10 lg:grid-cols-12 lg:gap-16" aria-hidden="true">
    <div className="animate-pulse rounded-[28px] bg-cream-deep/70 lg:col-span-7">
      <div className="aspect-square w-full" />
    </div>
    <div className="lg:col-span-5">
      <div className="animate-pulse h-2.5 w-24 rounded-full bg-cream-deep" />
      <div className="mt-6 animate-pulse h-10 w-3/4 rounded-2xl bg-cream-deep" />
      <div className="mt-5 animate-pulse h-5 w-32 rounded-full bg-cream-deep" />
      <div className="mt-8 space-y-3">
        {[72, 96, 88, 60].map((width) => (
          <div
            key={width}
            className="animate-pulse h-3 rounded-full bg-cream-deep"
            style={{ width: `${width}%` }}
          />
        ))}
      </div>
      <div className="mt-8 flex animate-pulse gap-3">
        <div className="h-12 w-28 rounded-full bg-cream-deep" />
        <div className="h-12 flex-1 rounded-full bg-cream-deep" />
      </div>
      <div className="mt-10 space-y-3.5 border-t border-espresso/10 pt-8">
        {[0, 1, 2].map((row) => (
          <div key={row} className="animate-pulse h-3 w-full rounded-full bg-cream-deep" />
        ))}
      </div>
    </div>
  </div>
)

const QuantityStepper = ({ quantity, onChange, disabled }) => (
  <div
    role="group"
    aria-label="Quantity"
    className="inline-flex items-center rounded-full border border-espresso/12 bg-cream-deep/40"
  >
    <button
      type="button"
      aria-label="Decrease quantity"
      disabled={disabled || quantity <= 1}
      onClick={() => onChange(Math.max(1, quantity - 1))}
      className="grid h-12 w-12 place-items-center rounded-full text-stone transition-colors duration-300 hover:text-espresso focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass/60 disabled:cursor-not-allowed disabled:opacity-40"
    >
      <Minus aria-hidden="true" className="h-4 w-4" />
    </button>
    <span
      aria-live="polite"
      className="w-8 text-center text-sm font-semibold tabular-nums text-espresso"
    >
      {quantity}
    </span>
    <button
      type="button"
      aria-label="Increase quantity"
      disabled={disabled || quantity >= 9}
      onClick={() => onChange(Math.min(9, quantity + 1))}
      className="grid h-12 w-12 place-items-center rounded-full text-stone transition-colors duration-300 hover:text-espresso focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass/60 disabled:cursor-not-allowed disabled:opacity-40"
    >
      <Plus aria-hidden="true" className="h-4 w-4" />
    </button>
  </div>
)

const AddToBagButton = ({ product, quantity }) => {
  const [status, setStatus] = useState('idle')
  const timerRef = useRef(null)

  useEffect(
    () => () => {
      window.clearTimeout(timerRef.current)
    },
    [],
  )

  const handleAddToBag = () => {
    if (status !== 'idle') return
    window.clearTimeout(timerRef.current)
    setStatus('adding')
    timerRef.current = window.setTimeout(() => {
      setStatus('added')
      timerRef.current = window.setTimeout(() => setStatus('idle'), 2600)
    }, 800)
  }

  return (
    <div className="flex flex-col gap-2.5">
      <motion.button
        type="button"
        onClick={handleAddToBag}
        disabled={status !== 'idle'}
        whileHover={status === 'idle' ? { y: -2 } : undefined}
        whileTap={status === 'idle' ? { scale: 0.985 } : undefined}
        transition={{ duration: 0.2, ease: EASE }}
        className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-espresso px-8 text-[10px] font-semibold uppercase tracking-[0.16em] text-cream transition-colors duration-300 hover:bg-espresso-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass/60 disabled:cursor-default"
      >
        <AnimatePresence mode="wait" initial={false}>
          {status === 'idle' && (
            <motion.span
              key="idle"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18 }}
              className="flex items-center gap-2"
            >
              <ShoppingBag aria-hidden="true" className="h-4 w-4" />
              Add to bag
            </motion.span>
          )}
          {status === 'adding' && (
            <motion.span
              key="adding"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18 }}
              className="flex items-center gap-2"
            >
              <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" />
              Adding
            </motion.span>
          )}
          {status === 'added' && (
            <motion.span
              key="added"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18 }}
              className="flex items-center gap-2 text-brass-light"
            >
              <Check aria-hidden="true" className="h-4 w-4" />
              Added to bag
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
      <p className="text-[11px] leading-relaxed text-stone/70">
        {status === 'added'
          ? `${quantity} × ${product.name} reserved in your bag.`
          : `${formatPrice(product.price * quantity, product.currency)} · Free delivery over Rs. 15,000`}
      </p>
    </div>
  )
}

const Accordion = ({ title, children, defaultOpen = false }) => {
  const reduce = useReducedMotion()
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className="border-b border-espresso/10">
      <h3>
        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          className="group flex w-full items-center justify-between gap-6 py-4.5 text-left transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass/60"
        >
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-espresso group-hover:text-brass">
            {title}
          </span>
          <span
            aria-hidden="true"
            className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border transition-all duration-300 ${
              open
                ? 'rotate-180 border-brass/50 bg-brass/10 text-brass'
                : 'border-espresso/12 text-stone group-hover:border-brass/40 group-hover:text-brass'
            }`}
          >
            <ChevronDown className="h-3.5 w-3.5" />
          </span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.4, ease: EASE }}
            className="overflow-hidden"
          >
            <div className="pb-5">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const ProductGallery = ({ product }) => {
  const reduce = useReducedMotion()

  return (
    <div className="lg:col-span-7">
      <motion.div
        initial={
          reduce ? false : { clipPath: 'inset(10% 5% 10% 5% round 28px)', opacity: 0.35 }
        }
        animate={{ clipPath: 'inset(0% 0% 0% 0% round 28px)', opacity: 1 }}
        transition={{ duration: reduce ? 0 : 1.1, ease: EASE }}
        className="group relative overflow-hidden rounded-[28px] bg-cream-deep ring-1 ring-espresso/5"
      >
        <div className="transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]">
          <ProductImage images={product.images} priority />
        </div>
        <span className="absolute left-4 top-4 z-10 rounded-full bg-cream/85 px-3.5 py-1.5 font-display text-[15px] text-espresso backdrop-blur">
          Handcrafted to order
        </span>
      </motion.div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <p className="text-[11px] leading-relaxed text-stone/70">
          The piece, off and on — your light choice from the collection follows
          you here.
        </p>
        <ProductModeToggle />
      </div>
    </div>
  )
}

const ProductInfo = ({ product }) => {
  const reduce = useReducedMotion()
  const [quantity, setQuantity] = useState(1)

  return (
    <motion.div
      variants={stagger}
      initial={reduce ? 'show' : 'hidden'}
      animate="show"
      className="lg:sticky lg:top-28 lg:col-span-5 lg:self-start"
    >
      <motion.p
        variants={fadeUp}
        className="text-[10px] font-semibold uppercase tracking-[0.24em] text-brass"
      >
        {product.category}
      </motion.p>

      <motion.h1
        variants={fadeUp}
        className="mt-3 font-display text-4xl leading-[1.02] text-espresso sm:text-[44px]"
      >
        {product.name}
      </motion.h1>

      <motion.div
        variants={fadeUp}
        className="mt-4 flex items-baseline justify-between gap-4 border-b border-espresso/10 pb-6"
      >
        <p className="font-display text-3xl text-espresso">
          {formatPrice(product.price, product.currency)}
        </p>
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-stone">
          Numbered &amp; signed
        </p>
      </motion.div>

      {product.description.map((paragraph) => (
        <motion.p
          key={paragraph.slice(0, 24)}
          variants={fadeUp}
          className="mt-4 max-w-[52ch] text-[13.5px] leading-relaxed text-stone"
        >
          {paragraph}
        </motion.p>
      ))}

      <motion.div
        variants={fadeUp}
        className="mt-8 flex flex-wrap items-center gap-3"
      >
        <QuantityStepper quantity={quantity} onChange={setQuantity} />
        <div className="min-w-[200px] flex-1">
          <AddToBagButton product={product} quantity={quantity} />
        </div>
      </motion.div>

      <motion.ul
        variants={stagger}
        className="mt-9 divide-y divide-espresso/[0.07] border-y border-espresso/10"
      >
        {PROMISES.map(({ icon: Icon, title, note }) => (
          <motion.li
            key={title}
            variants={fadeUp}
            className="flex items-center gap-3.5 py-3.5"
          >
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-espresso/10 bg-cream text-brass">
              <Icon aria-hidden="true" className="h-4 w-4" strokeWidth={1.5} />
            </span>
            <span>
              <span className="block text-[12px] font-semibold uppercase tracking-[0.12em] text-espresso">
                {title}
              </span>
              <span className="mt-0.5 block text-[11.5px] text-stone">
                {note}
              </span>
            </span>
          </motion.li>
        ))}
      </motion.ul>

      <motion.div variants={fadeUp} className="mt-7">
        <Accordion title="Details & dimensions" defaultOpen>
          {product.details.length ? (
            <dl className="space-y-0">
              {product.details.map(([label, value]) => (
                <div
                  key={label}
                  className="flex items-baseline justify-between gap-6 border-b border-espresso/[0.07] py-2.5 last:border-b-0"
                >
                  <dt className="text-[10px] font-semibold uppercase tracking-[0.16em] text-stone">
                    {label}
                  </dt>
                  <dd className="text-right text-[12.5px] font-medium text-espresso">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          ) : (
            <p className="text-[13px] leading-relaxed text-stone">
              Full dimensions for this piece are available on request.
            </p>
          )}
        </Accordion>
        <Accordion title="Materials & care">
          <p className="max-w-[52ch] text-[13px] leading-relaxed text-stone">
            {ACCORDION_COPY.materials}
          </p>
        </Accordion>
        <Accordion title="Shipping & returns">
          <p className="max-w-[52ch] text-[13px] leading-relaxed text-stone">
            {ACCORDION_COPY.shipping}
          </p>
        </Accordion>
        <Accordion title="Warranty">
          <p className="max-w-[52ch] text-[13px] leading-relaxed text-stone">
            {ACCORDION_COPY.warranty}
          </p>
        </Accordion>
      </motion.div>
    </motion.div>
  )
}

const RelatedSection = ({ product, catalog }) => {
  const reduce = useReducedMotion()

  const related = useMemo(() => {
    const sameCategory = catalog.filter(
      (item) => item.id !== product.id && item.category === product.category,
    )
    const others = catalog.filter(
      (item) => item.id !== product.id && item.category !== product.category,
    )
    return [...sameCategory, ...others].slice(0, 4)
  }, [catalog, product])

  if (!related.length) return null

  return (
    <section
      aria-label="Related pieces"
      className="border-t border-espresso/10 bg-cream py-20 lg:py-28"
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <motion.div
            variants={stagger}
            initial={reduce ? 'show' : 'hidden'}
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
          >
            <motion.p
              variants={fadeUp}
              className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-brass"
            >
              <span aria-hidden="true" className="h-px w-6 bg-brass/60" />
              From the collection
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="mt-4 font-display text-4xl leading-[1.02] text-espresso sm:text-5xl"
            >
              Complete the room.
            </motion.h2>
          </motion.div>
          <Link
            to="/collections"
            className="group inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-espresso transition-colors duration-300 hover:text-brass focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass/60"
          >
            View all pieces
            <ArrowUpRight
              aria-hidden="true"
              className="h-3.5 w-3.5 text-brass transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
        </div>

        <motion.div
          variants={stagger}
          initial={reduce ? 'show' : 'hidden'}
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4"
        >
          {related.map((item, index) => (
            <motion.div key={item.id} variants={fadeUp}>
              <ProductCard product={item} priority={index < 2} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

const CommissionBand = () => {
  const reduce = useReducedMotion()

  return (
    <section aria-label="Commission enquiry" className="bg-cream pb-24 lg:pb-32">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: reduce ? 0 : 0.8, ease: EASE }}
          className="relative overflow-hidden rounded-[32px] bg-espresso px-8 py-14 text-center sm:px-12 lg:px-16"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(circle at 15% 0%, rgba(182,138,82,0.22), transparent 45%), radial-gradient(circle at 90% 100%, rgba(217,188,145,0.10), transparent 40%)',
            }}
          />
          <p className="relative text-[10px] font-semibold uppercase tracking-[0.24em] text-brass-light">
            Not quite the piece?
          </p>
          <h2 className="relative mx-auto mt-4 max-w-[24ch] font-display text-4xl leading-[1.02] text-cream sm:text-5xl">
            Commission one of your own.
          </h2>
          <p className="relative mx-auto mt-4 max-w-[52ch] text-[13.5px] leading-relaxed text-cream/60">
            Our makers accept a small number of private commissions each year —
            your wood, your dimensions, your name beside theirs.
          </p>
          <Link
            to="/contact"
            className="group relative mt-7 inline-flex items-center gap-2 rounded-full bg-cream px-6 py-3.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-espresso transition-colors duration-300 hover:bg-brass-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass"
          >
            Enquire about a commission
            <ArrowUpRight
              aria-hidden="true"
              className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

const ProductPage = () => {
  const { id } = useParams()
  const { status, product, error, retry } = useProduct(id)
  const { products: catalog } = useProducts({})

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [id])

  useEffect(() => {
    if (!product?.name) return undefined
    const previousTitle = document.title
    document.title = `${product.name} — Lamp & Glow`
    return () => {
      document.title = previousTitle
    }
  }, [product?.name])

  return (
    <main className="bg-cream" aria-busy={status === 'loading'}>
      <div className="mx-auto max-w-[1440px] px-4 pb-24 pt-10 sm:px-8 lg:px-12 lg:pb-32 lg:pt-14">
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
          {product && (
            <>
              <span aria-hidden="true" className="text-brass">
                /
              </span>
              <Link
                to={`/collections?category=${encodeURIComponent(product.category)}`}
                className="transition-colors duration-300 hover:text-espresso focus-visible:text-espresso focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass/50"
              >
                {product.category}
              </Link>
            </>
          )}
          <span aria-hidden="true" className="text-brass">
            /
          </span>
          <span aria-current="page" className="truncate text-espresso">
            {status === 'loading' ? 'Loading…' : product?.name ?? 'Not found'}
          </span>
        </nav>

        <div className="mt-10" aria-live="polite">
          {status === 'loading' && <ProductSkeleton />}

          {status === 'error' && (
            <div className="flex flex-col items-center rounded-[28px] border border-espresso/10 bg-cream-deep/35 px-6 py-24 text-center">
              <span className="grid h-14 w-14 place-items-center rounded-full border border-brass/25 bg-brass/10 text-brass">
                <AlertCircle aria-hidden="true" className="h-6 w-6" />
              </span>
              <h1 className="mt-5 font-display text-3xl text-espresso">
                We could not load this piece.
              </h1>
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
            <div className="flex flex-col items-center rounded-[28px] border border-espresso/10 bg-cream-deep/35 px-6 py-24 text-center">
              <span className="grid h-14 w-14 place-items-center rounded-full border border-brass/25 bg-brass/10 text-brass">
                <Package aria-hidden="true" className="h-6 w-6" />
              </span>
              <h1 className="mt-5 font-display text-3xl text-espresso">
                We could not find that piece.
              </h1>
              <p className="mt-2 max-w-md text-[13.5px] leading-relaxed text-stone">
                It may have been retired to make way for a new work, or the
                link may be mistyped.
              </p>
              <Link
                to="/collections"
                className="mt-6 rounded-full bg-espresso px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-cream transition-colors duration-300 hover:bg-espresso-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass/60"
              >
                Browse the collection
              </Link>
            </div>
          )}

          {status === 'success' && (
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
              <ProductGallery product={product} />
              <ProductInfo product={product} />
            </div>
          )}
        </div>
      </div>

      {status === 'success' && (
        <>
          <RelatedSection product={product} catalog={catalog} />
          <CommissionBand />
        </>
      )}
    </main>
  )
}

export default ProductPage
