import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import ProductImage from './ProductImage'

const formatPrice = (price, currency) => {
  try {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency,
      maximumFractionDigits: 0,
    }).format(price)
  } catch {
    return `${currency} ${price.toLocaleString('en-PK')}`
  }
}

const ProductCard = ({ product, priority = false }) => (
  <Link
    to={`/product/${product.id}`}
    className="group block rounded-[22px] focus-visible:outline-none"
  >
    <div className="relative overflow-hidden rounded-[22px] bg-cream-deep ring-1 ring-espresso/5 transition-shadow duration-500 group-hover:shadow-[0_34px_70px_-46px_rgba(33,26,19,0.6)] group-focus-visible:ring-2 group-focus-visible:ring-brass/60">
      <ProductImage images={product.images} priority={priority} />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-cream/85 text-espresso opacity-0 backdrop-blur transition-all duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
      >
        <ArrowUpRight className="h-4 w-4" />
      </span>
    </div>

    <div className="mt-3.5 flex items-start justify-between gap-4">
      <h2 className="font-display text-[20px] leading-tight text-espresso">
        {product.name}
      </h2>
      <span className="mt-1 shrink-0 text-right text-[12px] font-semibold text-espresso">
        From {formatPrice(product.price, product.currency)}
      </span>
    </div>
    <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-stone/75">
      {product.category}
    </p>
  </Link>
)

export default ProductCard
