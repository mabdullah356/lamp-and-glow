import { motion, useReducedMotion } from 'framer-motion'
import { useProductImageMode } from '../../hooks/useProductImageMode'

const ProductModeToggle = () => {
  const { mode, toggle } = useProductImageMode()
  const reduceMotion = useReducedMotion()
  const isDark = mode === 'dark'

  return (
    <div className="flex items-center gap-3">
      <span className="w-11 text-right text-[10px] font-semibold uppercase tracking-[0.18em] text-stone">
        {isDark ? 'Dark' : 'Light'}:
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={isDark}
        aria-label="Show products with lights on"
        onClick={toggle}
        className={`relative inline-flex h-7 w-12 shrink-0 items-center rounded-full border p-1 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass/60 focus-visible:ring-offset-2 focus-visible:ring-offset-cream ${
          isDark
            ? 'border-[#6d2f2a] bg-[#6d2f2a]'
            : 'border-espresso/15 bg-espresso/10'
        }`}
      >
        <motion.span
          aria-hidden="true"
          animate={{ x: isDark ? 20 : 0 }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : { type: 'spring', stiffness: 520, damping: 32 }
          }
          className={`block h-5 w-5 rounded-full shadow-[0_2px_6px_rgba(33,26,19,0.3)] ${
            isDark ? 'bg-cream' : 'bg-cream-deep'
          }`}
        />
      </button>
    </div>
  )
}

export default ProductModeToggle
