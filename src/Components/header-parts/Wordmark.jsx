import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { Lamp } from 'lucide-react'

const Wordmark = ({ compact = false, onClick }) => {
  const reduceMotion = useReducedMotion()

  return (
    <Link
      to="/"
      onClick={onClick}
      aria-label="Lamp and Glow — home"
      className="group flex shrink-0 items-center gap-2.5"
    >
      <span className="relative grid h-9 w-9 place-items-center rounded-full bg-espresso text-brass shadow-[0_6px_18px_-8px_rgba(33,26,19,0.8)] transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-105">
        <motion.span
          aria-hidden="true"
          className="absolute inset-0 rounded-full bg-brass/35 blur-md"
          animate={
            reduceMotion
              ? undefined
              : { opacity: [0.25, 0.7, 0.35], scale: [0.9, 1.15, 0.95] }
          }
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
        />
        <Lamp className="relative h-4 w-4" strokeWidth={1.6} aria-hidden="true" />
      </span>
      <span
        className={`font-display leading-none text-espresso ${
          compact ? 'text-xl' : 'text-2xl sm:text-[26px]'
        }`}
      >
        Lamp <span className="text-brass">&amp;</span> Glow
      </span>
    </Link>
  )
}

export default Wordmark
