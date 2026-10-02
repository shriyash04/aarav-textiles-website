import { useStaggerReveal } from '../../hooks/useReveal';
import { useModal } from '../../context/ModalContext';
import { productsData } from '../../data/products';

const industries = [
  {
    title: 'Apparel',
    description: 'Shirting, suiting, and dress material fabrics for garment manufacturers and global apparel brands.',
    suggestedFabric: 'Cotton & Blended Weaves (95–160 GSM)',
    targetProductId: 'cotton-fabrics',
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 2l3 3h6l3-3M6 2L2 6l3 3V21h14V9l3-3-3-4M6 2v0M18 2v0" />
      </svg>
    ),
  },
  {
    title: 'Workwear',
    description: 'Heavy-duty twill, drill, and flame-retardant fabrics designed for workplace safety and durability.',
    suggestedFabric: 'Twill & Drill Constructions (180–380 GSM)',
    targetProductId: 'twill-workwear',
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: 'Home Textiles',
    description: 'Sheeting, sateen, and upholstery-grade wide-width fabrics for home furnishing exporters.',
    suggestedFabric: 'Percale & Sateen Seamless to 120" Width',
    targetProductId: 'home-textile',
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    title: 'Fashion',
    description: 'Trend-responsive weaves for fast fashion, private labels, and contemporary designer collections.',
    suggestedFabric: 'Micro-Dobby, Yarn-Dyed Checks & Satin Stripes',
    targetProductId: 'blended-fabrics',
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a6 6 0 00-6-6h-2" />
      </svg>
    ),
  },
  {
    title: 'Industrial',
    description: 'Canvas, filter cloth, and technical fabrics for non-apparel filtration and protective uses.',
    suggestedFabric: 'Numbered Duck #4–12 & High-Tenacity Canvas',
    targetProductId: 'industrial-fabric',
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    title: 'Hospitality',
    description: 'Durable, easy-care fabrics for hotels, institutional linen, and hospitality staff attire.',
    suggestedFabric: 'High-Wash Durable Bedding & Uniform Poplins',
    targetProductId: 'home-textile',
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
];

export default function Industries() {
  const containerRef = useStaggerReveal();
  const { openSpec } = useModal();

  return (
    <section
      id="industries"
      className="py-24 lg:py-34 bg-brand-50"
      aria-labelledby="industries-heading"
    >
      <div className="section-container" ref={containerRef}>
        <div className="max-w-2xl">
          <span className="reveal eyebrow">Who We Serve</span>
          <h2
            id="industries-heading"
            className="reveal reveal-delay-1 mt-5 font-display text-display-sm lg:text-display text-neutral-900"
          >
            Built around the needs of modern B2B buyers.
          </h2>
          <p className="reveal reveal-delay-2 mt-4 text-body text-neutral-600">
            We partner with buyers who require consistent production runs, strict shade tolerances, and reliable dispatch timetables tailored to their downstream manufacturing.
          </p>
        </div>

        <div className="mt-16 lg:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-neutral-200 border border-neutral-200">
          {industries.map((industry, i) => {
            const linkedProduct = productsData.find((p) => p.id === industry.targetProductId);
            return (
              <div
                key={industry.title}
                className={`reveal reveal-delay-${Math.min(i + 1, 6)} bg-white p-8 lg:p-10 group transition-all duration-300 hover:bg-brand-50 flex flex-col justify-between`}
              >
                <div>
                  <div className="text-neutral-400 group-hover:text-accent transition-colors duration-300">
                    {industry.icon}
                  </div>
                  <h3 className="mt-5 font-display text-heading-sm text-neutral-900">
                    {industry.title}
                  </h3>
                  <p className="mt-3 text-body-sm text-neutral-600 leading-relaxed">
                    {industry.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between">
                  <div className="text-2xs font-mono text-neutral-400 group-hover:text-accent transition-colors">
                    {industry.suggestedFabric}
                  </div>
                  {linkedProduct && (
                    <button
                      type="button"
                      onClick={() => openSpec(linkedProduct)}
                      className="text-2xs font-mono uppercase tracking-wider text-neutral-600 hover:text-accent font-medium transition-colors"
                    >
                      Specs →
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
