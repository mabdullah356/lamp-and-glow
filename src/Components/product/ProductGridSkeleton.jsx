const SKELETON_COUNT = 8

const ProductGridSkeleton = ({ gridClass }) => (
  <div role="status" aria-live="polite">
    <span className="sr-only">Loading lighting products…</span>
    <div className={`grid gap-x-6 gap-y-10 ${gridClass}`} aria-hidden="true">
      {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
        <div key={index} className="animate-pulse">
          <div className="aspect-square rounded-[22px] bg-espresso/[0.06]" />
          <div className="mt-4 h-4 w-2/3 rounded-full bg-espresso/[0.08]" />
          <div className="mt-2.5 h-3 w-1/3 rounded-full bg-espresso/[0.05]" />
        </div>
      ))}
    </div>
  </div>
)

export default ProductGridSkeleton
