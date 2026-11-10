import { useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion'
import {
  ArrowUpRight,
  ChevronDown,
  Hand,
  Lightbulb,
  ShieldCheck,
  TreePine,
} from 'lucide-react'
import ProductImage from '../product/ProductImage'
import formatPrice from '../../utils/formatPrice'

const EASE = [0.22, 1, 0.36, 1]

const HERO_IMAGE = {
  url: '/products/black-cylinder-floor-lamp-dark.jpg',
  alt: 'The Monolith floor lamp glowing in a darkened room',
}

const HERO_LINES = ['Six pieces.', 'Six hands.']

const HERO_INTRO =
  'Each of these six works belongs to one maker — drawn at the bench, raised by hand, and signed like a canvas. A product can be repeated. A signature cannot.'

const CRAFT_STEPS = [
  {
    no: '01',
    title: 'Solid wood',
    copy: 'The board is chosen long before you meet it — seasoned walnut, ash and bamboo, dried until it settles, picked by weight in the hand. Solid to the core. Never veneer.',
  },
  {
    no: '02',
    title: 'Shaped by hand',
    copy: 'Cut, sculpted and joined by whichever discipline the form demands — the saw, the chisel, the lathe where a curve truly calls for it. No moulds. No templates to hide behind.',
  },
  {
    no: '03',
    title: 'Finished & cured',
    copy: 'Hand-sanded through ever-finer grits, sealed and lacquered where the design asks, then cured beneath a hardened topcoat built for decades, not seasons.',
  },
  {
    no: '04',
    title: 'Signed & numbered',
    copy: 'Assembled, packed and released with a numbered certificate. The maker’s signature goes on last — it is the only part that cannot be redone.',
  },
]

const CRAFT_NOTE =
  'A Signature begins months before its first cut, and it never travels alone — four crafts lead the way, and the makers of our atelier stand behind them, from the first sanding to the final inspection.'

const workImages = (id, name) => ({
  light: {
    url: `/products/${id}-light.jpg`,
    width: 1200,
    height: 1200,
    alt: `${name}, switched off`,
  },
  dark: {
    url: `/products/${id}-dark.jpg`,
    width: 1200,
    height: 1200,
    alt: `${name}, switched on`,
  },
})

const SIGNATURE_WORKS = ([
  {
    id: 'black-cylinder-floor-lamp',
    no: '01',
    name: 'The Monolith',
    tagline: 'A single column of near-black wood, holding a quiet crown of light.',
    maker: 'Hamza Sheikh',
    makerRole: 'Turned & shaped by',
    copy: [
      'One cylinder of turned hardwood, stained to a deep charcoal and sanded until it reads like stone. By day it stands as sculpture; after dark the inner diffuser opens into a soft column of amber that climbs the wall behind it.',
      'A braided cord with an inline dimmer takes the glow down to a last ember. Each piece is numbered and signed beneath the base.',
    ],
    price: 132000,
    currency: 'PKR',
    specs: [
      ['Designed & turned', 'Hamza Sheikh'],
      ['Finished & polished', 'Imran Malik'],
      ['Assembled', 'Faisal Nawaz'],
      ['Packed', 'Daniyal Raza'],
      ['Hands-on', '140 hours'],
      ['Edition', 'First edition of 25'],
    ],
  },
  {
    id: 'golden-crystal-chandelier',
    no: '02',
    name: 'The Gilded Cascade',
    tagline: 'A chandelier cut down to its essentials — brass, crystal, and falling light.',
    maker: 'Zain Ul Abideen',
    makerRole: 'Chained & hung by',
    copy: [
      'The Cascade strips the chandelier back to what actually matters: the drop, the glint, the warmth. Aged brass frames a fall of hand-cut crystal, each piece hung and balanced until the whole reads as one slow pour of light.',
      'Dimmed low it turns a dining room candlelit; raised full it fills a stairwell. Numbered, signed, and delivered with its own hanging kit.',
    ],
    price: 264000,
    currency: 'PKR',
    specs: [
      ['Designed & chained', 'Zain Ul Abideen'],
      ['Finished & polished', 'Noor Hassan'],
      ['Assembled', 'Faisal Nawaz'],
      ['Packed', 'Daniyal Raza'],
      ['Hands-on', '210 hours'],
      ['Edition', 'First edition of 18'],
    ],
  },
  {
    id: 'woven-bamboo-lantern',
    no: '03',
    name: 'The Hour Lantern',
    tagline: 'An open weave of cured bamboo around a single warm flame.',
    maker: 'Abdul Rehman',
    makerRole: 'Woven by',
    copy: [
      'Strands of cured bamboo are woven over a turned frame — open enough to let the light breathe, tight enough to hold the lantern’s shape for decades. Hung low, it throws a pattern of warm lattice-work across the table beneath it.',
      'The weave is finished in a natural matte oil, so the bamboo keeps the colour of the afternoon it was cut. Numbered and signed at the crown.',
    ],
    price: 98000,
    currency: 'PKR',
    specs: [
      ['Designed & woven', 'Abdul Rehman'],
      ['Finished & polished', 'Imran Malik'],
      ['Assembled', 'Faisal Nawaz'],
      ['Packed', 'Daniyal Raza'],
      ['Hands-on', '95 hours'],
      ['Edition', 'First edition of 30'],
    ],
  },
  {
    id: 'illuminated-glass-table-lamp',
    no: '04',
    name: 'The Ember Vessel',
    tagline: 'Hand-blown glass that keeps the colour of a wood fire at rest.',
    maker: 'Bilal Jabbar',
    makerRole: 'Blown & fitted by',
    copy: [
      'The Vessel is blown in a single sitting, so no two share exactly the same swell. The iridescent skin catches daylight like soap film; lit from within, it holds the low amber of embers an hour after the fire.',
      'It sits on a turned hardwood collar, weighted so it cannot tip, and is wired with an inline dimmer on a cloth cord. Numbered and signed on the base ring.',
    ],
    price: 87000,
    currency: 'PKR',
    specs: [
      ['Designed & blown', 'Bilal Jabbar'],
      ['Finished & polished', 'Noor Hassan'],
      ['Assembled', 'Faisal Nawaz'],
      ['Packed', 'Daniyal Raza'],
      ['Hands-on', '110 hours'],
      ['Edition', 'First edition of 40'],
    ],
  },
  {
    id: 'oval-glow-sconce',
    no: '05',
    name: 'The Halo',
    tagline: 'A ring of light that floats a hand’s width off the wall.',
    maker: 'Saad Anwar',
    makerRole: 'Spun & mounted by',
    copy: [
      'One spun oval, mounted on a shadow gap so the light never touches the wall directly — it lands as a soft ring, wider than the fixture itself. Read beside the bed or lighting a corridor, it does one thing perfectly.',
      'The mount is brass over solid hardwood, and the whole piece fits with two screws and a push-in connector. Numbered and signed behind the plate.',
    ],
    price: 66000,
    currency: 'PKR',
    specs: [
      ['Designed & spun', 'Saad Anwar'],
      ['Finished & polished', 'Imran Malik'],
      ['Assembled', 'Faisal Nawaz'],
      ['Packed', 'Daniyal Raza'],
      ['Hands-on', '80 hours'],
      ['Edition', 'First edition of 30'],
    ],
  },
  {
    id: 'intertwined-ring-chandelier',
    no: '06',
    name: 'The Interlace',
    tagline: 'Two rings of light, locked mid-turn, that never quite touch.',
    maker: 'Usman Khalid',
    makerRole: 'Forged & balanced by',
    copy: [
      'Two forged rings, one dark and one pale, are set into a single slow twist — held at the moment before they meet. Suspended over a stair or a long table, the geometry changes as you move around it.',
      'Each ring carries its own diffused strip, dimmable together or apart, so the piece can favour one arm of the room. Balanced by hand until it hangs perfectly still. Numbered and signed at the canopy.',
    ],
    price: 232000,
    currency: 'PKR',
    specs: [
      ['Designed & forged', 'Usman Khalid'],
      ['Finished & polished', 'Noor Hassan'],
      ['Assembled', 'Faisal Nawaz'],
      ['Packed', 'Daniyal Raza'],
      ['Hands-on', '165 hours'],
      ['Edition', 'First edition of 22'],
    ],
  },
]).map((work) => ({
  ...work,
  images: workImages(work.id, work.name),
}))

const CITIES = [
  'Lahore',
  'Karachi',
  'Dubai',
  'London',
  'Amsterdam',
  'Berlin',
  'New York',
]

const MATERIALS = [
  {
    icon: TreePine,
    title: 'Solid wood',
    copy: 'Seasoned walnut, ash and bamboo — aged until it settles, solid throughout, never veneered.',
  },
  {
    icon: Lightbulb,
    title: 'Warm, golden light',
    copy: 'Professionally wired at full mains voltage, crowned with warm filament bulbs for that soft, golden glow.',
  },
  {
    icon: Hand,
    title: 'Hand-finished',
    copy: 'Hand-sanded to silk, sealed and cured beneath a hardened topcoat. A soft, dry cloth is all it ever asks.',
  },
  {
    icon: ShieldCheck,
    title: 'Numbered & guaranteed',
    copy: 'Each piece is numbered and covered by our lifetime guarantee on the wood and craftsmanship.',
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

const SectionHeading = ({ eyebrow, title, tone = 'dark', align = 'left' }) => (
  <motion.div
    variants={stagger}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, amount: 0.5 }}
    className={align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}
  >
    <motion.div variants={fadeUp} className={align === 'center' ? 'flex justify-center' : ''}>
      <Eyebrow tone={tone === 'dark' ? 'brass' : 'cream'}>{eyebrow}</Eyebrow>
    </motion.div>
    <motion.h2
      variants={fadeUp}
      className={`mt-4 font-display text-4xl leading-[1.02] sm:text-5xl ${
        tone === 'dark' ? 'text-espresso' : 'text-cream'
      }`}
    >
      {title}
    </motion.h2>
  </motion.div>
)

const Hero = () => {
  const reduce = useReducedMotion()
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.06, 1.2])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '45%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section
      ref={heroRef}
      className="relative isolate flex min-h-[92svh] items-end overflow-hidden bg-espresso"
    >
      <motion.div
        aria-hidden="true"
        style={reduce ? undefined : { y: imageY, scale: imageScale }}
        className="absolute inset-0 -z-10"
      >
        <img
          src={HERO_IMAGE.url}
          alt=""
          className="h-full w-full object-cover opacity-90"
          fetchPriority="high"
          decoding="async"
        />
      </motion.div>
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-t from-espresso via-espresso/45 to-espresso/25"
      />

      <motion.div
        style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
        className="mx-auto w-full max-w-[1440px] px-4 pb-16 pt-40 sm:px-8 lg:px-12"
      >
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
        >
          <Eyebrow tone="cream">The Signature Collection</Eyebrow>
        </motion.div>

        <h1 className="mt-6 font-display text-[clamp(3.2rem,9vw,7.5rem)] leading-[0.94] text-cream">
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
          className="mt-7 max-w-[52ch] text-[15px] leading-relaxed text-cream/70"
        >
          {HERO_INTRO}
        </motion.p>

        <motion.a
          href="#craft"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="mt-12 inline-flex items-center gap-3 rounded-full border border-cream/20 py-2 pl-5 pr-4 text-[10px] font-semibold uppercase tracking-[0.22em] text-cream/80 transition-colors duration-300 hover:border-brass-light/60 hover:text-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass/60"
        >
          Begin
          <motion.span
            animate={reduce ? undefined : { y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
          >
            <ChevronDown aria-hidden="true" className="h-4 w-4 text-brass-light" />
          </motion.span>
        </motion.a>
      </motion.div>
    </section>
  )
}

const CraftSection = () => {
  const reduce = useReducedMotion()

  return (
    <section
      id="craft"
      aria-label="How a signature is made"
      className="scroll-mt-24 bg-cream py-24 lg:py-32"
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="How a Signature is made"
            title="Four crafts. One piece."
          />
          <motion.p
            variants={fadeUp}
            initial={reduce ? false : 'hidden'}
            whileInView="show"
            viewport={{ once: true, amount: 0.6 }}
            className="max-w-[42ch] text-[13.5px] leading-relaxed text-stone lg:pb-2 lg:text-right"
          >
            {CRAFT_NOTE}
          </motion.p>
        </div>

        <motion.div
          variants={stagger}
          initial={reduce ? 'show' : 'hidden'}
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-16 grid gap-px overflow-hidden rounded-[28px] bg-espresso/10 sm:grid-cols-2 lg:grid-cols-4"
        >
          {CRAFT_STEPS.map((step) => (
            <motion.article
              key={step.no}
              variants={fadeUp}
              className="group relative bg-cream p-8 transition-colors duration-500 hover:bg-cream-deep/70 lg:p-9"
            >
              <span
                aria-hidden="true"
                className="font-display text-6xl leading-none text-brass/25 transition-colors duration-500 group-hover:text-brass/45"
              >
                {step.no}
              </span>
              <h3 className="mt-6 font-display text-[26px] leading-tight text-espresso">
                {step.title}
              </h3>
              <p className="mt-3 text-[13px] leading-relaxed text-stone">
                {step.copy}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

const SignatureWork = ({ work, index }) => {
  const reduce = useReducedMotion()
  const frameRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: frameRef,
    offset: ['start end', 'end start'],
  })
  const imageY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])
  const flipped = index % 2 === 1

  return (
    <article className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
      <motion.div
        ref={frameRef}
        initial={
          reduce
            ? false
            : { clipPath: 'inset(12% 5% 12% 5% round 28px)', opacity: 0.35 }
        }
        whileInView={{
          clipPath: 'inset(0% 0% 0% 0% round 28px)',
          opacity: 1,
        }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: reduce ? 0 : 1.1, ease: EASE }}
        className={`relative overflow-hidden rounded-[28px] bg-cream-deep ring-1 ring-espresso/5 lg:col-span-7 ${
          flipped ? 'lg:order-2' : ''
        }`}
      >
        <motion.div
          style={reduce ? undefined : { y: imageY, scale: 1.15 }}
          className="will-change-transform"
        >
          <ProductImage images={work.images} priority={index === 0} />
        </motion.div>
        <span className="absolute left-4 top-4 z-10 rounded-full bg-cream/85 px-3.5 py-1.5 font-display text-[15px] text-espresso backdrop-blur">
          No. {work.no}
        </span>
      </motion.div>

      <motion.div
        variants={stagger}
        initial={reduce ? 'show' : 'hidden'}
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className={`lg:col-span-5 ${flipped ? 'lg:order-1 lg:pr-6' : 'lg:pl-6'}`}
      >
        <motion.p
          variants={fadeUp}
          className="text-[10px] font-semibold uppercase tracking-[0.24em] text-brass"
        >
          {work.makerRole}{' '}
          <span className="text-espresso">{work.maker}</span>
        </motion.p>

        <motion.h3
          variants={fadeUp}
          className="mt-4 font-display text-4xl leading-[1.02] text-espresso sm:text-[42px]"
        >
          {work.name}
        </motion.h3>

        <motion.p
          variants={fadeUp}
          className="mt-4 max-w-[42ch] font-display text-[19px] italic leading-snug text-stone"
        >
          {work.tagline}
        </motion.p>

        {work.copy.map((paragraph) => (
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
          className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-espresso/10 pt-5"
        >
          <p className="text-[19px] font-semibold text-espresso">
            {formatPrice(work.price, work.currency)}
          </p>
          <Link
            to={`/product/${work.id}`}
            className="group/link inline-flex items-center gap-2 rounded-full border border-espresso/15 px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-espresso transition-colors duration-300 hover:border-brass/45 hover:bg-brass/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass/60"
          >
            View product
            <ArrowUpRight
              aria-hidden="true"
              className="h-3.5 w-3.5 text-brass transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
            />
          </Link>
        </motion.div>

        <motion.dl
          variants={stagger}
          className="mt-7 rounded-[22px] border border-espresso/10 bg-cream-deep/40 px-5 py-2"
        >
          {work.specs.map(([label, value]) => (
            <motion.div
              key={label}
              variants={fadeUp}
              className="flex items-baseline justify-between gap-6 border-b border-espresso/[0.07] py-2.5 last:border-b-0"
            >
              <dt className="text-[10px] font-semibold uppercase tracking-[0.16em] text-stone">
                {label}
              </dt>
              <dd className="text-right text-[12.5px] font-medium text-espresso">
                {value}
              </dd>
            </motion.div>
          ))}
        </motion.dl>
      </motion.div>
    </article>
  )
}

const WorksSection = () => (
  <section
    aria-label="The signature works"
    className="bg-cream pb-24 pt-4 lg:pb-32"
  >
    <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12">
      <div className="flex flex-col gap-6 border-t border-espresso/10 pt-16 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading eyebrow="The works" title="Six signatures." />
        <p className="max-w-[38ch] text-[13.5px] leading-relaxed text-stone lg:pb-2 lg:text-right">
          Conceived at the bench, raised by one pair of hands, released in a
          numbered edition — then never made the same way again.
        </p>
      </div>

      <div className="mt-16 flex flex-col gap-24 lg:gap-32">
        {SIGNATURE_WORKS.map((work, index) => (
          <SignatureWork key={work.id} work={work} index={index} />
        ))}
      </div>
    </div>
  </section>
)

const MarqueeRow = ({ hidden = false }) => (
  <div className="flex shrink-0 items-center" aria-hidden={hidden}>
    {CITIES.map((city) => (
      <span key={city} className="flex items-center">
        <span className="whitespace-nowrap px-10 font-display text-4xl text-espresso/75 sm:text-5xl">
          {city}
        </span>
        <span
          aria-hidden="true"
          className="h-1.5 w-1.5 rounded-full bg-brass/50"
        />
      </span>
    ))}
  </div>
)

const CitiesMarquee = () => {
  const reduce = useReducedMotion()

  return (
    <section
      aria-label="Where signature pieces live"
      className="border-y border-espresso/10 bg-cream-deep/50 py-12"
    >
      <div className="relative overflow-hidden">
        <motion.div
          className="flex w-max will-change-transform"
          animate={reduce ? undefined : { x: ['0%', '-50%'] }}
          transition={{ repeat: Infinity, duration: 44, ease: 'linear' }}
        >
          <MarqueeRow />
          <MarqueeRow hidden />
        </motion.div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-cream to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-cream to-transparent"
        />
      </div>
      <div className="mx-auto mt-10 max-w-[1440px] px-4 sm:px-8 lg:px-12">
        <SectionHeading
          eyebrow="Beyond the home"
          title="Chosen for select interiors — residences, restaurants and hotels."
        />
      </div>
    </section>
  )
}

const MaterialsSection = () => {
  const reduce = useReducedMotion()

  return (
    <section aria-label="Materials and care" className="bg-cream py-24 lg:py-32">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12">
        <SectionHeading
          eyebrow="Materials & care"
          title="Made to last a lifetime."
        />

        <motion.ul
          variants={stagger}
          initial={reduce ? 'show' : 'hidden'}
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8"
        >
          {MATERIALS.map((item) => (
            <motion.li key={item.title} variants={fadeUp} className="group">
              <span className="grid h-12 w-12 place-items-center rounded-full border border-espresso/10 bg-cream text-brass transition-colors duration-500 group-hover:border-brass/40 group-hover:bg-brass/10">
                <item.icon
                  aria-hidden="true"
                  className="h-5 w-5"
                  strokeWidth={1.5}
                />
              </span>
              <h3 className="mt-5 font-display text-[22px] leading-tight text-espresso">
                {item.title}
              </h3>
              <p className="mt-2.5 max-w-[34ch] text-[13px] leading-relaxed text-stone">
                {item.copy}
              </p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}

const CommissionSection = () => {
  const reduce = useReducedMotion()
  const frameRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: frameRef,
    offset: ['start end', 'end start'],
  })
  const imageY = useTransform(scrollYProgress, [0, 1], ['-5%', '5%'])

  return (
    <section
      aria-label="Private commissions"
      className="scroll-mt-24 bg-espresso py-24 text-cream lg:py-32"
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            ref={frameRef}
            initial={reduce ? false : { opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: reduce ? 0 : 0.9, ease: EASE }}
            className="relative overflow-hidden rounded-[28px] ring-1 ring-cream/10"
          >
            <motion.img
              style={reduce ? undefined : { y: imageY, scale: 1.14 }}
              src="/products/warm-beige-wall-lamp-dark.jpg"
              alt="A commissioned wall lamp glowing in a client interior"
              className="aspect-[4/3] w-full object-cover will-change-transform"
              loading="lazy"
              decoding="async"
            />
          </motion.div>

          <motion.div
            variants={stagger}
            initial={reduce ? 'show' : 'hidden'}
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div variants={fadeUp}>
              <Eyebrow tone="cream">Commission</Eyebrow>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="mt-4 font-display text-4xl leading-[1.02] text-cream sm:text-5xl"
            >
              A piece, signed for you.
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="mt-5 max-w-[48ch] text-[14px] leading-relaxed text-cream/65"
            >
              Beyond the collection, our makers accept a small number of
              private commissions each year — your wood, your dimensions,
              your name beside theirs. Commissions are few by design; a
              signature cannot be hurried.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-8">
              <a
                href="mailto:support@lampandglow.com?subject=Signature%20commission%20enquiry"
                className="group inline-flex items-center gap-2 rounded-full bg-cream px-6 py-3.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-espresso transition-colors duration-300 hover:bg-brass-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass"
              >
                Enquire about a commission
                <ArrowUpRight
                  aria-hidden="true"
                  className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

const FinalCta = () => {
  const reduce = useReducedMotion()

  return (
    <section
      aria-label="The signature collection call to action"
      className="bg-cream py-24 text-center lg:py-32"
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12">
        <motion.div
          variants={stagger}
          initial={reduce ? 'show' : 'hidden'}
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="mx-auto max-w-3xl"
        >
          <motion.div variants={fadeUp} className="flex justify-center">
            <Eyebrow>One collection, six makers</Eyebrow>
          </motion.div>

          <h2 className="mt-5 font-display text-5xl leading-[0.98] text-espresso sm:text-6xl">
            {['Owned by you.', 'Made by them.'].map((line, index) => (
              <span key={line} className="block overflow-hidden pb-1">
                <motion.span
                  className="block"
                  initial={reduce ? false : { y: '112%' }}
                  whileInView={{ y: '0%' }}
                  viewport={{ once: true }}
                  transition={{
                    duration: reduce ? 0 : 0.95,
                    ease: EASE,
                    delay: reduce ? 0 : 0.12 + index * 0.12,
                  }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h2>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-6 max-w-[46ch] text-[14px] leading-relaxed text-stone"
          >
            A Signature piece is the closest thing to owning the maker’s hand
            — turned once, signed once, kept for a lifetime.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-9 flex flex-wrap items-center justify-center gap-3.5"
          >
            <Link
              to="/collections"
              className="rounded-full bg-espresso px-6 py-3.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-cream transition-colors duration-300 hover:bg-espresso-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass/60"
            >
              Shop the collection
            </Link>
            <a
              href="#craft"
              className="rounded-full border border-espresso/15 px-6 py-3.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-espresso transition-colors duration-300 hover:border-brass/45 hover:bg-brass/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass/60"
            >
              Meet the makers
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

const Signature = () => (
  <main className="bg-cream">
    <Hero />
    <CraftSection />
    <WorksSection />
    <CitiesMarquee />
    <MaterialsSection />
    <CommissionSection />
    <FinalCta />
  </main>
)

export default Signature
