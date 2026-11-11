import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion'
import {
  ArrowUpRight,
  ChevronDown,
  Clock,
  Loader2,
  Mail,
  MapPin,
  MessageCircle,
  Package,
  Sparkles,
} from 'lucide-react'

const EASE = [0.22, 1, 0.36, 1]
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const WHATSAPP_URL = 'https://wa.me/923020521000'
const EMAIL = 'support@lampandglow.com'

const HERO_LINES = ['Talk to the atelier.', 'We reply fast.']

const HERO_INTRO =
  'Questions about a piece, an order, or a commission of your own — write to us and a maker, not a bot, will answer. WhatsApp is fastest; email is answered within one working day.'

const CHANNELS = [
  {
    icon: 'whatsapp',
    title: 'WhatsApp',
    note: 'Replies in minutes, Mon–Sat',
    action: 'Start a chat',
    href: WHATSAPP_URL,
    external: true,
  },
  {
    icon: 'mail',
    title: 'Email',
    note: EMAIL,
    action: 'Write to us',
    href: `mailto:${EMAIL}`,
    external: true,
  },
  {
    icon: 'package',
    title: 'Track an order',
    note: 'Live status on every parcel',
    action: 'Track order',
    href: '/collections?view=tracking',
    external: false,
  },
  {
    icon: 'sparkles',
    title: 'Studio visit',
    note: 'Karachi · by appointment',
    action: 'Book a visit',
    href: `mailto:${EMAIL}?subject=Studio%20visit`,
    external: true,
  },
]

const TOPICS = [
  'Order enquiry',
  'Commission',
  'Studio visit',
  'Press & collaborations',
  'Something else',
]

const FAQS = [
  {
    q: 'How long does a commission take?',
    a: 'Most commissions are quoted in 2–4 days and completed in 3–6 weeks, depending on the wood and the finish. Everything is confirmed with you in writing before the first cut.',
  },
  {
    q: 'Do you deliver outside Karachi?',
    a: 'Yes — across Pakistan, in 3–5 business days, fully tracked. Standard pieces ship free over Rs. 15,000, and every parcel is packed by hand.',
  },
  {
    q: 'Can I see a piece in person?',
    a: 'The Karachi studio is open for visits by appointment, Mon–Sat. Write to us and we will set aside the pieces you want to see, lit and ready.',
  },
  {
    q: 'What is your returns policy?',
    a: 'Standard pieces may be returned within 7 days of delivery, unused and in their original packaging. Commissions and Signature pieces are made to order and are final sale.',
  },
  {
    q: 'Do you offer trade pricing?',
    a: 'We work with interior designers, restaurants and hotels on a trade basis, with tiered pricing and lead times. Write to us with your project and we will share the programme.',
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
}

const WhatsAppIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
)

const channelIcon = {
  whatsapp: WhatsAppIcon,
  mail: Mail,
  package: Package,
  sparkles: Sparkles,
}

const Eyebrow = ({ children, tone = 'brass' }) => (
  <p
    className={`flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.24em] ${
      tone === 'cream' ? 'text-brass-light' : 'text-brass'
    }`}
  >
    <span aria-hidden="true" className="h-px w-6 bg-brass/60" />
    {children}
  </p>
)

const Hero = () => {
  const reduce = useReducedMotion()

  return (
    <section className="relative isolate overflow-hidden bg-espresso py-24 text-cream lg:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(circle at 12% 0%, rgba(182,138,82,0.20), transparent 42%), radial-gradient(circle at 88% 18%, rgba(217,188,145,0.10), transparent 38%)',
        }}
      />
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
        >
          <Eyebrow tone="cream">Contact</Eyebrow>
        </motion.div>

        <h1 className="mt-6 font-display text-[clamp(2.8rem,7.5vw,6rem)] leading-[0.96]">
          {HERO_LINES.map((line, index) => (
            <span key={line} className="block overflow-hidden pb-1">
              <motion.span
                className="block"
                initial={reduce ? false : { y: '112%' }}
                animate={{ y: '0%' }}
                transition={{
                  duration: reduce ? 0 : 1.05,
                  ease: EASE,
                  delay: 0.22 + index * 0.13,
                }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.6 }}
          className="mt-7 max-w-[54ch] text-[15px] leading-relaxed text-cream/70"
        >
          {HERO_INTRO}
        </motion.p>

        <motion.div
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.85 }}
          className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-2.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-cream/45"
        >
          <span className="flex items-center gap-2">
            <MessageCircle
              aria-hidden="true"
              className="h-3.5 w-3.5 text-brass-light"
            />
            Replies in minutes
          </span>
          <span className="flex items-center gap-2">
            <Clock aria-hidden="true" className="h-3.5 w-3.5 text-brass-light" />
            Mon–Sat · 10:00–19:00 PKT
          </span>
          <span className="flex items-center gap-2">
            <MapPin aria-hidden="true" className="h-3.5 w-3.5 text-brass-light" />
            Karachi, Pakistan
          </span>
        </motion.div>
      </div>
    </section>
  )
}

const ChannelsSection = () => {
  const reduce = useReducedMotion()

  return (
    <section
      aria-label="Ways to reach us"
      className="border-b border-espresso/10 bg-cream py-16 lg:py-20"
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12">
        <motion.div
          variants={stagger}
          initial={reduce ? 'show' : 'hidden'}
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {CHANNELS.map((channel) => {
            const Icon = channelIcon[channel.icon]
            const content = (
              <>
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-espresso/10 bg-cream text-brass transition-colors duration-500 group-hover:border-brass/40 group-hover:bg-brass/10">
                  <Icon aria-hidden="true" className="h-[18px] w-[18px]" />
                </span>
                <span className="min-w-0">
                  <span className="block font-display text-[21px] leading-tight text-espresso">
                    {channel.title}
                  </span>
                  <span className="mt-1 block truncate text-[12px] text-stone">
                    {channel.note}
                  </span>
                </span>
                <span className="mt-4 inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-brass transition-colors duration-300 group-hover:text-espresso">
                  {channel.action}
                  <ArrowUpRight
                    aria-hidden="true"
                    className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </span>
              </>
            )
            const className =
              'group flex h-full flex-col rounded-[22px] border border-espresso/10 bg-cream-deep/35 p-6 transition-colors duration-300 hover:border-brass/40 hover:bg-brass/[0.07] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass/60'

            return (
              <motion.div key={channel.title} variants={fadeUp}>
                {channel.external ? (
                  <a
                    href={channel.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className={className}
                  >
                    {content}
                  </a>
                ) : (
                  <Link to={channel.href} className={className}>
                    {content}
                  </Link>
                )}
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

const fieldClass = (invalid) =>
  `mt-2.5 w-full rounded-[18px] border bg-cream-deep/40 px-4 py-3 text-sm text-espresso transition-colors duration-300 placeholder:text-stone/60 focus:outline-none disabled:opacity-60 ${
    invalid
      ? 'border-red-400/70 focus:border-red-400'
      : 'border-espresso/12 focus:border-brass/60'
  }`

const FieldError = ({ id, message, reduce }) => (
  <AnimatePresence>
    {message && (
      <motion.p
        id={id}
        initial={{ opacity: 0, y: reduce ? 0 : 4, height: 0 }}
        animate={{ opacity: 1, y: 0, height: 'auto' }}
        exit={{ opacity: 0, y: reduce ? 0 : -4, height: 0 }}
        transition={{ duration: reduce ? 0 : 0.25 }}
        className="overflow-hidden text-[11.5px] leading-relaxed text-red-500"
      >
        {message}
      </motion.p>
    )}
  </AnimatePresence>
)

const ContactForm = () => {
  const reduce = useReducedMotion()
  const [values, setValues] = useState({
    name: '',
    email: '',
    topic: TOPICS[0],
    orderNumber: '',
    message: '',
  })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const fieldRefs = useRef({})
  const timerRef = useRef(null)

  const setField = (name) => (event) => {
    const { value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
    setErrors((current) =>
      current[name] ? { ...current, [name]: undefined } : current,
    )
  }

  const validate = () => {
    const next = {}
    if (values.name.trim().length < 2) next.name = 'Please tell us your name.'
    if (!EMAIL_PATTERN.test(values.email.trim()))
      next.email = 'Please enter a valid email address.'
    if (values.topic === 'Order enquiry' && !values.orderNumber.trim())
      next.orderNumber = 'Please add your order number so we can find it.'
    if (values.message.trim().length < 20)
      next.message = 'A sentence or two helps us help you — 20 characters or more.'
    return next
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (status === 'submitting') return
    const next = validate()
    setErrors(next)
    const firstError = Object.keys(next)[0]
    if (firstError) {
      fieldRefs.current[firstError]?.focus()
      return
    }
    setStatus('submitting')
    timerRef.current = window.setTimeout(() => setStatus('success'), 1100)
  }

  const reset = () => {
    window.clearTimeout(timerRef.current)
    setValues({
      name: '',
      email: '',
      topic: TOPICS[0],
      orderNumber: '',
      message: '',
    })
    setErrors({})
    setStatus('idle')
  }

  return (
    <motion.div
      variants={stagger}
      initial={reduce ? 'show' : 'hidden'}
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
    >
      <motion.h2
        variants={fadeUp}
        id="contact-form-title"
        className="font-display text-4xl leading-[1.02] text-espresso sm:text-[42px]"
      >
        Write to us.
      </motion.h2>
      <motion.p
        variants={fadeUp}
        className="mt-3 max-w-[46ch] text-[13.5px] leading-relaxed text-stone"
      >
        Fill this in and it reaches the atelier inbox — answered within one
        working day, usually much sooner.
      </motion.p>

      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: reduce ? 0 : 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduce ? 0 : -18 }}
            transition={{ duration: reduce ? 0 : 0.5, ease: EASE }}
            className="mt-9 rounded-[28px] border border-espresso/10 bg-cream-deep/40 px-8 py-12 text-center"
          >
            <span className="mx-auto grid h-16 w-16 place-items-center rounded-full border border-brass/30 bg-brass/10">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-7 w-7 text-brass"
                aria-hidden="true"
              >
                <motion.circle
                  cx="12"
                  cy="12"
                  r="10"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{
                    duration: reduce ? 0 : 0.6,
                    ease: EASE,
                  }}
                />
                <motion.path
                  d="m8.5 12.5 2.5 2.5 4.5-5.5"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{
                    duration: reduce ? 0 : 0.5,
                    ease: EASE,
                    delay: reduce ? 0 : 0.35,
                  }}
                />
              </svg>
            </span>
            <h3 className="mt-6 font-display text-3xl text-espresso">
              Message received.
            </h3>
            <p className="mx-auto mt-3 max-w-[40ch] text-[13.5px] leading-relaxed text-stone">
              Thank you, {values.name.trim().split(' ')[0] || 'friend'} — we
              will reply to {values.email.trim()} within one working day. If it
              is urgent, WhatsApp is fastest.
            </p>
            <button
              type="button"
              onClick={reset}
              className="mt-7 rounded-full border border-espresso/15 px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-espresso transition-colors duration-300 hover:border-brass/45 hover:bg-brass/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass/60"
            >
              Send another message
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            noValidate
            onSubmit={handleSubmit}
            aria-labelledby="contact-form-title"
            initial={{ opacity: 0, y: reduce ? 0 : 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduce ? 0 : -18 }}
            transition={{ duration: reduce ? 0 : 0.5, ease: EASE, delay: 0.1 }}
            className="mt-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <motion.div variants={fadeUp}>
                <label
                  htmlFor="contact-name"
                  className="text-[10px] font-semibold uppercase tracking-[0.22em] text-stone"
                >
                  Name
                </label>
                <input
                  ref={(node) => {
                    fieldRefs.current.name = node
                  }}
                  id="contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={values.name}
                  onChange={setField('name')}
                  disabled={status === 'submitting'}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? 'contact-name-error' : undefined}
                  placeholder="Ayesha Khan"
                  className={fieldClass(Boolean(errors.name))}
                />
                <FieldError
                  id="contact-name-error"
                  message={errors.name}
                  reduce={reduce}
                />
              </motion.div>

              <motion.div variants={fadeUp}>
                <label
                  htmlFor="contact-email"
                  className="text-[10px] font-semibold uppercase tracking-[0.22em] text-stone"
                >
                  Email
                </label>
                <input
                  ref={(node) => {
                    fieldRefs.current.email = node
                  }}
                  id="contact-email"
                  name="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  spellCheck={false}
                  value={values.email}
                  onChange={setField('email')}
                  disabled={status === 'submitting'}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'contact-email-error' : undefined}
                  placeholder="you@example.com"
                  className={fieldClass(Boolean(errors.email))}
                />
                <FieldError
                  id="contact-email-error"
                  message={errors.email}
                  reduce={reduce}
                />
              </motion.div>
            </div>

            <motion.div variants={fadeUp} className="mt-5">
              <label
                htmlFor="contact-topic"
                className="text-[10px] font-semibold uppercase tracking-[0.22em] text-stone"
              >
                Topic
              </label>
              <div className="relative">
                <select
                  ref={(node) => {
                    fieldRefs.current.topic = node
                  }}
                  id="contact-topic"
                  name="topic"
                  value={values.topic}
                  onChange={setField('topic')}
                  disabled={status === 'submitting'}
                  className={`${fieldClass(false)} appearance-none pr-10`}
                >
                  {TOPICS.map((topic) => (
                    <option key={topic} value={topic}>
                      {topic}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  aria-hidden="true"
                  className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-brass"
                />
              </div>
            </motion.div>

            <AnimatePresence initial={false}>
              {values.topic === 'Order enquiry' && (
                <motion.div
                  key="order-number-field"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: reduce ? 0 : 0.35, ease: EASE }}
                  className="overflow-hidden"
                >
                  <div className="mt-5">
                    <label
                      htmlFor="contact-order"
                      className="text-[10px] font-semibold uppercase tracking-[0.22em] text-stone"
                    >
                      Order number{' '}
                      <span className="normal-case tracking-normal text-stone/60">
                        (required for order enquiries)
                      </span>
                    </label>
                    <input
                      ref={(node) => {
                        fieldRefs.current.orderNumber = node
                      }}
                      id="contact-order"
                      name="orderNumber"
                      type="text"
                      autoComplete="off"
                      value={values.orderNumber}
                      onChange={setField('orderNumber')}
                      disabled={status === 'submitting'}
                      aria-invalid={Boolean(errors.orderNumber)}
                      aria-describedby={
                        errors.orderNumber ? 'contact-order-error' : undefined
                      }
                      placeholder="LG-0000"
                      className={fieldClass(Boolean(errors.orderNumber))}
                    />
                    <FieldError
                      id="contact-order-error"
                      message={errors.orderNumber}
                      reduce={reduce}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div variants={fadeUp} className="mt-5">
              <label
                htmlFor="contact-message"
                className="text-[10px] font-semibold uppercase tracking-[0.22em] text-stone"
              >
                Message
              </label>
              <textarea
                ref={(node) => {
                  fieldRefs.current.message = node
                }}
                id="contact-message"
                name="message"
                rows={5}
                value={values.message}
                onChange={setField('message')}
                disabled={status === 'submitting'}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={
                  errors.message ? 'contact-message-error' : undefined
                }
                placeholder="Tell us what you need — a piece, an order, an idea for a commission…"
                className={`${fieldClass(Boolean(errors.message))} resize-none`}
              />
              <FieldError
                id="contact-message-error"
                message={errors.message}
                reduce={reduce}
              />
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="mt-7 flex flex-wrap items-center gap-4"
            >
              <motion.button
                type="submit"
                disabled={status === 'submitting'}
                whileHover={
                  status === 'submitting' ? undefined : { y: -2 }
                }
                whileTap={status === 'submitting' ? undefined : { scale: 0.98 }}
                transition={{ duration: 0.2, ease: EASE }}
                className="inline-flex items-center gap-2 rounded-full bg-espresso px-6 py-3.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-cream transition-colors duration-300 hover:bg-espresso-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass/60 disabled:cursor-wait disabled:opacity-80"
              >
                {status === 'submitting' ? (
                  <>
                    <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" />
                    Sending
                  </>
                ) : (
                  <>
                    Send message
                    <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                  </>
                )}
              </motion.button>
              <p className="text-[11px] leading-relaxed text-stone/70">
                Or skip the form —{' '}
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="font-semibold text-espresso underline decoration-brass/50 underline-offset-4 transition-colors duration-300 hover:text-brass focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass/60"
                >
                  WhatsApp us
                </a>{' '}
                and we will answer in minutes.
              </p>
            </motion.div>
          </motion.form>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

const AtelierPanel = () => {
  const reduce = useReducedMotion()
  const frameRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: frameRef,
    offset: ['start end', 'end start'],
  })
  const imageY = useTransform(scrollYProgress, [0, 1], ['-5%', '5%'])

  return (
    <motion.aside
      ref={frameRef}
      initial={reduce ? false : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: reduce ? 0 : 0.9, ease: EASE }}
      className="relative overflow-hidden rounded-[28px] bg-espresso p-8 text-cream lg:p-10"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 15% 0%, rgba(182,138,82,0.22), transparent 45%), radial-gradient(circle at 90% 90%, rgba(217,188,145,0.10), transparent 40%)',
        }}
      />
      <div className="relative overflow-hidden rounded-[22px] ring-1 ring-cream/10">
        <motion.img
          style={reduce ? undefined : { y: imageY, scale: 1.14 }}
          src="/products/dome-black-pendant-dark.jpg"
          alt="A signature pendant glowing in the Karachi atelier"
          className="aspect-[4/3] w-full object-cover will-change-transform"
          loading="lazy"
          decoding="async"
        />
      </div>

      <h2 className="relative mt-8 font-display text-3xl leading-tight text-cream">
        The atelier
      </h2>

      <div className="relative mt-6 space-y-5 text-[13px] text-cream/65">
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
        <a
          href={`mailto:${EMAIL}`}
          className="flex items-center gap-3 transition-colors duration-300 hover:text-cream focus-visible:text-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass/50"
        >
          <Mail aria-hidden="true" className="h-4 w-4 shrink-0 text-brass-light" />
          {EMAIL}
        </a>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noreferrer noopener"
          className="flex items-center gap-3 transition-colors duration-300 hover:text-cream focus-visible:text-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass/50"
        >
          <WhatsAppIcon
            aria-hidden="true"
            className="h-4 w-4 shrink-0 text-brass-light"
          />
          +92 302 0521000
          <span className="text-[11.5px] text-cream/40">
            Replies in minutes
          </span>
        </a>
      </div>

      <a
        href={`mailto:${EMAIL}?subject=Studio%20visit`}
        className="group relative mt-8 inline-flex items-center gap-2 rounded-full border border-cream/15 px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-cream/70 transition-colors duration-300 hover:border-brass/50 hover:text-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass/50"
      >
        Book a studio visit
        <ArrowUpRight
          aria-hidden="true"
          className="h-3.5 w-3.5 text-brass-light transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      </a>
    </motion.aside>
  )
}

const FaqSection = () => {
  const reduce = useReducedMotion()
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section
      aria-label="Quick answers"
      className="border-t border-espresso/10 bg-cream py-20 lg:py-28"
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
          <motion.div
            variants={stagger}
            initial={reduce ? 'show' : 'hidden'}
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
          >
            <motion.div variants={fadeUp}>
              <Eyebrow>Quick answers</Eyebrow>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="mt-4 font-display text-4xl leading-[1.02] text-espresso sm:text-5xl"
            >
              Before you write.
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="mt-4 max-w-[38ch] text-[13.5px] leading-relaxed text-stone"
            >
              The questions we hear most, answered plainly. If yours is not
              here, the form above reaches a maker directly.
            </motion.p>
          </motion.div>

          <motion.ul
            variants={stagger}
            initial={reduce ? 'show' : 'hidden'}
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="divide-y divide-espresso/10 border-y border-espresso/10"
          >
            {FAQS.map((faq, index) => {
              const open = openIndex === index
              return (
                <motion.li key={faq.q} variants={fadeUp}>
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpenIndex(open ? -1 : index)}
                      aria-expanded={open}
                      aria-controls={`faq-panel-${index}`}
                      id={`faq-button-${index}`}
                      className="group flex w-full items-center justify-between gap-6 py-5 text-left transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass/60"
                    >
                      <span
                        className={`font-display text-[21px] leading-snug transition-colors duration-300 group-hover:text-brass ${
                          open ? 'text-espresso' : 'text-espresso/85'
                        }`}
                      >
                        {faq.q}
                      </span>
                      <span
                        aria-hidden="true"
                        className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-all duration-300 ${
                          open
                            ? 'rotate-180 border-brass/50 bg-brass/10 text-brass'
                            : 'border-espresso/12 text-stone group-hover:border-brass/40 group-hover:text-brass'
                        }`}
                      >
                        <ChevronDown className="h-4 w-4" />
                      </span>
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        id={`faq-panel-${index}`}
                        role="region"
                        aria-labelledby={`faq-button-${index}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: reduce ? 0 : 0.4, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-[62ch] pb-6 text-[13.5px] leading-relaxed text-stone">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.li>
              )
            })}
          </motion.ul>
        </div>
      </div>
    </section>
  )
}

const Contact = () => (
  <main className="bg-cream">
    <Hero />
    <ChannelsSection />
    <section
      aria-label="Send us a message"
      className="bg-cream py-20 lg:py-28"
    >
      <div className="mx-auto grid max-w-[1440px] gap-12 px-4 sm:px-8 lg:grid-cols-[1.5fr_1fr] lg:gap-16 lg:px-12">
        <ContactForm />
        <AtelierPanel />
      </div>
    </section>
    <FaqSection />
  </main>
)

export default Contact
