import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import {
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  Check,
  Clock,
  Globe,
  Lamp,
  Loader2,
  Mail,
  MapPin,
  ShieldCheck,
  Sparkles,
  Truck,
} from 'lucide-react'

const EASE = [0.22, 1, 0.36, 1]
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const SHOP_LINKS = [
  { label: 'Table lamps', to: '/collections?category=table-lamps' },
  { label: 'Floor lamps', to: '/collections?category=floor-lamps' },
  { label: 'Pendants', to: '/collections?category=pendants' },
  { label: 'Wall lights', to: '/collections?category=wall-lights' },
  { label: 'Candle holders', to: '/collections?category=candle-holders' },
  { label: 'Entryway lighting', to: '/collections?category=entryway' },
]

const COMPANY_LINKS = [
  { label: 'Our story', to: '/#story' },
  { label: 'Craftsmanship', to: '/#craft' },
  { label: 'The journal', to: '/collections?view=journal' },
  { label: 'Stockists', to: '/collections?view=stockists' },
  { label: 'Trade programme', to: '/collections?view=trade' },
]

const HELP_LINKS = [
  { label: 'Contact us', to: '/#contact' },
  { label: 'Shipping & delivery', to: '/collections?view=shipping' },
  { label: 'Returns & exchanges', to: '/collections?view=returns' },
  { label: 'Product care', to: '/collections?view=care' },
  { label: 'FAQs', to: '/collections?view=faqs' },
  { label: 'Track your order', to: '/collections?view=tracking' },
]

const LEGAL_LINKS = [
  { label: 'Privacy', to: '/collections?view=privacy' },
  { label: 'Terms', to: '/collections?view=terms' },
  { label: 'Cookies', to: '/collections?view=cookies' },
]

const InstagramIcon = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.2" cy="6.8" r="0.8" fill="currentColor" stroke="none" />
  </svg>
)

const FacebookIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M14.5 8.5H17V5h-2.5A4.5 4.5 0 0 0 10 9.5V12H7.5v3.5H10V22h3.5v-6.5H16l.6-3.5h-3.1V9.5a1 1 0 0 1 1-1Z" />
  </svg>
)

const YouTubeIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M21.6 7.2a2.5 2.5 0 0 0-1.76-1.77C18.25 5 12 5 12 5s-6.25 0-7.84.43A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.76 1.77C5.75 19 12 19 12 19s6.25 0 7.84-.43a2.5 2.5 0 0 0 1.76-1.77A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8ZM10 15.2V8.8l5.5 3.2Z" />
  </svg>
)

const SOCIAL_LINKS = [
  { label: 'Instagram', href: 'https://www.instagram.com', icon: InstagramIcon },
  { label: 'Facebook', href: 'https://www.facebook.com', icon: FacebookIcon },
  { label: 'YouTube', href: 'https://www.youtube.com', icon: YouTubeIcon },
]

const PROMISES = [
  {
    icon: Truck,
    title: 'Complimentary delivery',
    note: 'On orders over Rs. 15,000',
  },
  {
    icon: ShieldCheck,
    title: 'Lifetime warranty',
    note: 'On every solid-wood piece',
  },
  {
    icon: Sparkles,
    title: 'Gift-ready packaging',
    note: 'Wrapped by hand, always',
  },
]

const PAYMENT_METHODS = [
  'Visa',
  'Mastercard',
  'Amex',
  'JazzCash',
  'Easypaisa',
]

const footerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
}

const footerItem = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
}

const footerList = {
  hidden: {},
  show: { transition: { staggerChildren: 0.035, delayChildren: 0.08 } },
}

const footerListItem = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE } },
}

const FooterColumn = ({ title, links }) => (
  <motion.nav variants={footerItem} aria-label={title}>
    <h3 className="text-[10px] font-semibold uppercase tracking-[0.24em] text-brass-light">
      {title}
    </h3>
    <motion.ul variants={footerList} className="mt-5 space-y-2.5">
      {links.map((link) => (
        <motion.li key={link.label} variants={footerListItem}>
          <Link
            to={link.to}
            className="group inline-flex items-center gap-1.5 rounded-sm text-[13px] text-cream/60 transition-colors duration-300 hover:text-cream focus-visible:text-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass/50"
          >
            <span className="relative">
              {link.label}
              <span
                aria-hidden="true"
                className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-brass-light/80 transition-transform duration-300 group-hover:scale-x-100"
              />
            </span>
            <ArrowUpRight
              aria-hidden="true"
              className="h-3 w-3 -translate-x-1 text-brass-light opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
            />
          </Link>
        </motion.li>
      ))}
    </motion.ul>
  </motion.nav>
)

const NewsletterSection = () => {
  const reduceMotion = useReducedMotion()
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle')
  const timerRef = useRef(null)

  useEffect(() => () => window.clearTimeout(timerRef.current), [])

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
    if (status === 'error' || status === 'success') setStatus('idle')
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (status === 'submitting' || status === 'success') return
    if (!EMAIL_PATTERN.test(email.trim())) {
      setStatus('error')
      return
    }
    setStatus('submitting')
    timerRef.current = window.setTimeout(() => setStatus('success'), 900)
  }

  const statusMessage =
    status === 'error'
      ? 'Please enter a valid email address.'
      : status === 'success'
        ? 'You are on the list. Watch your inbox for 10% off your first order.'
        : ''

  return (
    <motion.section
      aria-labelledby="footer-newsletter-title"
      initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: reduceMotion ? 0 : 0.65, ease: EASE }}
      className="grid gap-10 border-b border-cream/10 py-14 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-16 lg:py-20"
    >
      <div>
        <p className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-brass-light">
          <span aria-hidden="true" className="h-px w-6 bg-brass-light/60" />
          The glow list
        </p>
        <h2
          id="footer-newsletter-title"
          className="mt-4 max-w-[16ch] font-display text-4xl leading-[1.05] text-cream sm:text-5xl"
        >
          A little light in your inbox.
        </h2>
        <p className="mt-4 max-w-[48ch] text-[13.5px] leading-relaxed text-cream/60">
          New collections, atelier stories and quiet early access. Join the list
          and enjoy 10% off your first piece.
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="w-full lg:max-w-xl">
        <label
          htmlFor="footer-newsletter-email"
          className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cream/45"
        >
          Email address
        </label>
        <div
          className={`mt-3 flex items-center gap-2 rounded-full border bg-cream/[0.045] p-1.5 transition-colors duration-300 focus-within:bg-cream/[0.07] ${
            status === 'error'
              ? 'border-red-400/60'
              : 'border-cream/15 focus-within:border-brass/60'
          }`}
        >
          <Mail
            aria-hidden="true"
            className="ml-3 h-4 w-4 shrink-0 text-brass-light"
          />
          <input
            id="footer-newsletter-email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            spellCheck={false}
            value={email}
            onChange={handleEmailChange}
            disabled={status === 'submitting'}
            aria-invalid={status === 'error'}
            aria-describedby="footer-newsletter-note footer-newsletter-status"
            placeholder="you@example.com"
            className="min-w-0 flex-1 bg-transparent py-2.5 text-sm text-cream placeholder:text-cream/35 focus:outline-none disabled:opacity-60"
          />
          <motion.button
            type="submit"
            disabled={status === 'submitting'}
            whileHover={status === 'submitting' ? undefined : { y: -2 }}
            whileTap={status === 'submitting' ? undefined : { scale: 0.97 }}
            transition={{ duration: 0.2, ease: EASE }}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-brass px-4 py-3 text-[10px] font-bold uppercase tracking-[0.16em] text-espresso transition-colors duration-300 hover:bg-brass-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream/60 disabled:cursor-wait disabled:opacity-80 sm:px-5"
          >
            {status === 'submitting' ? (
              <>
                <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" />
                <span className="hidden sm:inline">Sending</span>
              </>
            ) : status === 'success' ? (
              <>
                <Check aria-hidden="true" className="h-4 w-4" />
                <span className="hidden sm:inline">Subscribed</span>
              </>
            ) : (
              <>
                <span className="hidden sm:inline">Subscribe</span>
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </>
            )}
          </motion.button>
        </div>

        <p
          id="footer-newsletter-note"
          className="mt-3 text-[11px] leading-relaxed text-cream/40"
        >
          No noise, ever. Unsubscribe anytime. We treat your inbox like our
          showroom: calm and considered.
        </p>

        <div
          id="footer-newsletter-status"
          role="status"
          aria-live="polite"
          className="mt-2 min-h-5"
        >
          <AnimatePresence mode="wait">
            {statusMessage && (
              <motion.p
                key={status}
                initial={{ opacity: 0, y: reduceMotion ? 0 : 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: reduceMotion ? 0 : -4 }}
                transition={{ duration: reduceMotion ? 0 : 0.25 }}
                className={`flex items-center gap-2 text-[11.5px] ${
                  status === 'error' ? 'text-red-300' : 'text-brass-light'
                }`}
              >
                {status === 'success' && (
                  <Check aria-hidden="true" className="h-3.5 w-3.5" />
                )}
                {statusMessage}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </form>
    </motion.section>
  )
}

const PromiseStrip = () => {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      variants={footerContainer}
      initial={reduceMotion ? 'show' : 'hidden'}
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      className="grid divide-y divide-cream/10 border-b border-cream/10 py-2 sm:grid-cols-3 sm:divide-x sm:divide-y-0"
    >
      {PROMISES.map(({ icon: Icon, title, note }) => (
        <motion.div
          key={title}
          variants={footerItem}
          className="flex items-center gap-3.5 py-5 sm:px-6 sm:first:pl-0 sm:last:pr-0"
        >
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-brass/25 bg-brass/10 text-brass-light">
            <Icon className="h-[18px] w-[18px]" strokeWidth={1.5} />
          </span>
          <span>
            <span className="block text-[12px] font-semibold uppercase tracking-[0.12em] text-cream/85">
              {title}
            </span>
            <span className="mt-0.5 block text-[11.5px] text-cream/45">
              {note}
            </span>
          </span>
        </motion.div>
      ))}
    </motion.div>
  )
}

const BrandColumn = () => {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div variants={footerItem} className="sm:col-span-2 lg:col-span-1">
      <Link
        to="/"
        aria-label="Lamp and Glow — home"
        className="group inline-flex items-center gap-2.5"
      >
        <span className="relative grid h-11 w-11 place-items-center rounded-full bg-brass text-espresso shadow-[0_10px_30px_-12px_rgba(182,138,82,0.9)] transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-105">
          <motion.span
            aria-hidden="true"
            className="absolute inset-0 rounded-full bg-brass/40 blur-lg"
            animate={
              reduceMotion
                ? undefined
                : { opacity: [0.25, 0.7, 0.35], scale: [0.9, 1.2, 0.95] }
            }
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          />
          <Lamp
            aria-hidden="true"
            className="relative h-5 w-5"
            strokeWidth={1.6}
          />
        </span>
        <span className="font-display text-[28px] leading-none text-cream">
          Lamp <span className="text-brass-light">&amp;</span> Glow
        </span>
      </Link>

      <p className="mt-5 max-w-[36ch] text-[13.5px] leading-relaxed text-cream/60">
        Handcrafted lighting for the hour after sunset. Sculptural pieces in
        solid wood, made slowly in our Karachi atelier.
      </p>

      <div className="mt-6 flex items-center gap-2.5">
        {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
          <motion.a
            key={label}
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label={label}
            whileHover={reduceMotion ? undefined : { y: -3 }}
            whileTap={reduceMotion ? undefined : { scale: 0.94 }}
            transition={{ duration: 0.2, ease: EASE }}
            className="grid h-10 w-10 place-items-center rounded-full border border-cream/15 text-cream/70 transition-colors duration-300 hover:border-brass/50 hover:bg-brass/10 hover:text-brass-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass/50"
          >
            <Icon className="h-4 w-4" />
          </motion.a>
        ))}
      </div>

      <p className="mt-6 inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.18em] text-cream/40">
        <Globe aria-hidden="true" className="h-3.5 w-3.5" />
        Pakistan · PKR
      </p>
    </motion.div>
  )
}

const AtelierColumn = () => (
  <motion.div variants={footerItem} className="sm:col-span-2 lg:col-span-1">
    <h3 className="text-[10px] font-semibold uppercase tracking-[0.24em] text-brass-light">
      The atelier
    </h3>
    <div className="mt-5 space-y-4 text-[13px] text-cream/60">
      <p className="flex gap-3">
        <MapPin
          aria-hidden="true"
          className="mt-0.5 h-4 w-4 shrink-0 text-brass-light"
        />
        <span>
          Karachi, Pakistan
          <span className="mt-0.5 block text-[11.5px] text-cream/40">
            Studio visits by appointment
          </span>
        </span>
      </p>
      <a
        href="mailto:support@lampandglow.com"
        className="flex items-center gap-3 transition-colors duration-300 hover:text-cream focus-visible:text-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass/50"
      >
        <Mail aria-hidden="true" className="h-4 w-4 shrink-0 text-brass-light" />
        support@lampandglow.com
      </a>
      <p className="flex gap-3">
        <Clock
          aria-hidden="true"
          className="mt-0.5 h-4 w-4 shrink-0 text-brass-light"
        />
        <span>
          Mon–Sat · 10:00–19:00 PKT
          <span className="mt-0.5 block text-[11.5px] text-cream/40">
            Replies within one working day
          </span>
        </span>
      </p>
    </div>

    <a
      href="mailto:support@lampandglow.com?subject=Studio%20visit"
      className="group mt-6 inline-flex items-center gap-2 rounded-full border border-cream/15 px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-cream/70 transition-colors duration-300 hover:border-brass/50 hover:text-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass/50"
    >
      Book a studio visit
      <ArrowUpRight
        aria-hidden="true"
        className="h-3.5 w-3.5 text-brass-light transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
      />
    </a>
  </motion.div>
)

const BottomBar = () => {
  const reduceMotion = useReducedMotion()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' })
  }

  return (
    <motion.div
      variants={footerContainer}
      initial={reduceMotion ? 'show' : 'hidden'}
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      className="border-t border-cream/10 py-7"
    >
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <motion.p
          variants={footerItem}
          className="text-[11px] leading-relaxed text-cream/40"
        >
          © {new Date().getFullYear()} Lamp &amp; Glow. All rights reserved.
          <span className="hidden sm:inline"> Handcrafted in Pakistan.</span>
        </motion.p>

        <motion.div
          variants={footerItem}
          className="flex flex-wrap items-center gap-x-6 gap-y-2"
        >
          {LEGAL_LINKS.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className="rounded-sm text-[10px] font-semibold uppercase tracking-[0.16em] text-cream/45 transition-colors duration-300 hover:text-cream focus-visible:text-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass/50"
            >
              {link.label}
            </Link>
          ))}
        </motion.div>
      </div>

      <div className="mt-6 flex flex-col gap-5 border-t border-cream/[0.07] pt-6 sm:flex-row sm:items-center sm:justify-between">
        <motion.div
          variants={footerItem}
          className="flex flex-wrap items-center gap-2"
        >
          <span className="mr-1 text-[10px] font-medium uppercase tracking-[0.16em] text-cream/35">
            We accept
          </span>
          {PAYMENT_METHODS.map((method) => (
            <span
              key={method}
              className="rounded-md border border-cream/10 bg-cream/[0.03] px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-cream/50"
            >
              {method}
            </span>
          ))}
        </motion.div>

        <motion.div
          variants={footerItem}
          className="flex flex-wrap items-center gap-4"
        >
          <span className="inline-flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.16em] text-cream/40">
            <ShieldCheck
              aria-hidden="true"
              className="h-3.5 w-3.5 text-brass-light"
            />
            Secure checkout
          </span>
          <motion.button
            type="button"
            onClick={scrollToTop}
            whileHover={reduceMotion ? undefined : { y: -3 }}
            whileTap={reduceMotion ? undefined : { scale: 0.96 }}
            transition={{ duration: 0.2, ease: EASE }}
            className="group inline-flex items-center gap-2 rounded-full border border-cream/15 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-cream/60 transition-colors duration-300 hover:border-brass/50 hover:text-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass/50"
          >
            Back to top
            <span className="grid h-6 w-6 place-items-center rounded-full bg-brass/15 text-brass-light transition-colors duration-300 group-hover:bg-brass group-hover:text-espresso">
              <ArrowUp aria-hidden="true" className="h-3 w-3" />
            </span>
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  )
}

const Footer = () => {
  const reduceMotion = useReducedMotion()

  return (
    <footer
      id="contact"
      className="relative scroll-mt-24 overflow-hidden bg-espresso font-sans text-cream"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at 12% 0%, rgba(182,138,82,0.20), transparent 42%), radial-gradient(circle at 88% 18%, rgba(217,188,145,0.10), transparent 38%)',
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(250,247,241,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(250,247,241,0.7) 1px, transparent 1px)',
            backgroundSize: '72px 72px',
          }}
        />
      </div>

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-[-10rem] h-[30rem] w-[30rem] rounded-full bg-brass/10 blur-[130px]"
        animate={
          reduceMotion
            ? undefined
            : { opacity: [0.25, 0.6, 0.25], scale: [1, 1.12, 1] }
        }
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12">
        <NewsletterSection />
        <PromiseStrip />

        <motion.div
          variants={footerContainer}
          initial={reduceMotion ? 'show' : 'hidden'}
          whileInView="show"
          viewport={{ once: true, amount: 0.12 }}
          className="grid gap-12 py-14 sm:grid-cols-2 lg:grid-cols-[1.35fr_0.8fr_0.85fr_0.85fr_1.1fr] lg:gap-10 lg:py-16"
        >
          <BrandColumn />
          <FooterColumn title="Shop" links={SHOP_LINKS} />
          <FooterColumn title="Company" links={COMPANY_LINKS} />
          <FooterColumn title="Help" links={HELP_LINKS} />
          <AtelierColumn />
        </motion.div>

        <BottomBar />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 select-none overflow-hidden"
      >
        <p className="translate-y-[38%] whitespace-nowrap text-center font-display text-[22vw] leading-none text-cream/[0.025]">
          Lamp &amp; Glow
        </p>
      </div>
    </footer>
  )
}

export default Footer
