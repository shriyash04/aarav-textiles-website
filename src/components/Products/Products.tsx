import { useStaggerReveal } from '../../hooks/useReveal';
import { productsData } from '../../data/products';
import { useModal } from '../../context/ModalContext';

export default function Products() {
  const containerRef = useStaggerReveal();
  const { openSpec, openQuote } = useModal();

  return (
    <section
      id="products"
      className="py-24 lg:py-34 bg-brand-50"
      aria-labelledby="products-heading"
    >
      <div className="section-container" ref={containerRef}>
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 max-w-full">
          <div className="max-w-2xl">
            <span className="reveal eyebrow">Our Products</span>
            <h2
              id="products-heading"
              className="reveal reveal-delay-1 mt-5 font-display text-display-sm lg:text-display text-neutral-900"
            >
              Fabrics engineered for demanding applications.
            </h2>
          </div>
          <div className="reveal reveal-delay-2">
            <button
              type="button"
              onClick={() => openQuote()}
              className="inline-flex items-center gap-2 text-body-sm font-medium text-neutral-800 hover:text-accent border-b border-neutral-300 pb-1 hover:border-accent transition-colors"
            >
              Request custom fabric specifications →
            </button>
          </div>
        </div>

        {/* Product grid — editorial layout with varying sizes */}
        <div className="mt-16 lg:mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-neutral-200 border border-neutral-200">
          {productsData.map((product, i) => (
            <article
              key={product.id}
              className={`reveal reveal-delay-${Math.min(i + 1, 6)} group relative bg-white flex flex-col justify-between overflow-hidden transition-all duration-300 hover:shadow-lg`}
            >
              <div>
                {/* Image */}
                <div
                  className="aspect-[4/3] overflow-hidden relative cursor-pointer"
                  onClick={() => openSpec(product)}
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 px-2 py-0.5 bg-neutral-950/80 backdrop-blur-xs text-white font-mono text-[11px] tracking-wider uppercase border border-white/20">
                    {product.categoryCode}
                  </div>
                  {product.id === 'custom-fabrics' && (
                    <div className="absolute top-3 right-3 px-2 py-0.5 bg-accent text-white font-mono text-[10px] tracking-wider uppercase">
                      Bespoke Lab
                    </div>
                  )}
                  <div className="absolute inset-0 bg-neutral-950/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="px-3.5 py-1.5 bg-white/95 text-neutral-900 text-2xs font-mono uppercase tracking-wider shadow-sm transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      View Mill Specs
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 lg:p-8">
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="font-display text-heading-sm text-neutral-900 group-hover:text-accent transition-colors duration-300">
                      {product.title}
                    </h3>
                    <span className="font-mono text-2xs text-neutral-400">
                      {product.specs.weightGsm.split(' ')[0]} GSM
                    </span>
                  </div>

                  <p className="mt-3 text-body-sm text-neutral-600 leading-relaxed line-clamp-3">
                    {product.description}
                  </p>

                  <div className="mt-4 pt-3 border-t border-neutral-100">
                    <p className="text-2xs uppercase tracking-wider text-accent font-medium line-clamp-1">
                      {product.applications}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action bar */}
              <div className="px-6 lg:px-8 pb-6 lg:pb-8 pt-0 flex items-center justify-between border-t border-neutral-100 mt-2">
                <button
                  type="button"
                  onClick={() => openSpec(product)}
                  className="inline-flex items-center gap-2 text-body-sm font-medium text-neutral-900 group/link transition-colors duration-300 hover:text-accent cursor-pointer"
                  aria-label={`Explore specifications for ${product.title}`}
                >
                  Explore
                  <svg
                    className="w-4 h-4 transition-transform duration-300 ease-out-expo group-hover/link:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </button>

                <button
                  type="button"
                  onClick={() => openQuote(product)}
                  className="text-2xs uppercase tracking-wider text-neutral-500 hover:text-neutral-900 font-mono transition-colors"
                >
                  Quote lot →
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
