import { useEffect } from 'react';
import { useModal } from '../../context/ModalContext';

export default function ProductModal() {
  const { activeSpecProduct, closeSpec, openQuote } = useModal();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeSpec();
    };
    if (activeSpecProduct) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeSpecProduct, closeSpec]);

  if (!activeSpecProduct) return null;

  const product = activeSpecProduct;

  const handleRequestQuote = () => {
    closeSpec();
    openQuote(product);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="spec-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-10 bg-neutral-950/80 backdrop-blur-sm animate-fade-in"
      onClick={closeSpec}
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] bg-white border border-neutral-200 overflow-y-auto shadow-2xl flex flex-col animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-brand-50 border-b border-neutral-200">
          <div className="flex items-center gap-3">
            <span className="font-mono text-2xs uppercase tracking-widest text-accent font-semibold px-2 py-0.5 border border-brand-300 bg-white">
              {product.categoryCode}
            </span>
            <span className="text-2xs uppercase tracking-widest text-neutral-500 font-medium">
              Technical Specification Sheet
            </span>
          </div>
          <button
            onClick={closeSpec}
            className="p-1.5 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-200/60 transition-colors"
            aria-label="Close specifications"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 lg:p-10 space-y-8">
          {/* Main Info Header */}
          <div className="grid md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-7">
              <span className="eyebrow">Fabric Profile</span>
              <h2 id="spec-modal-title" className="font-display text-display-sm text-neutral-900 mt-2">
                {product.title}
              </h2>
              <p className="mt-3 text-body text-neutral-600 leading-relaxed">
                {product.description}
              </p>
              <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center gap-2 text-2xs uppercase tracking-wider text-neutral-500">
                <span className="font-medium text-neutral-900">Target Applications:</span>
                <span>{product.applications}</span>
              </div>
            </div>

            <div className="md:col-span-5">
              <div className="relative aspect-[4/3] overflow-hidden border border-neutral-200 bg-neutral-100">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 right-2 px-2 py-1 bg-neutral-950/70 text-white font-mono text-[10px] tracking-wider uppercase">
                  Mill Specimen
                </div>
              </div>
            </div>
          </div>

          {/* Technical Specs Table Grid */}
          <div>
            <h3 className="text-eyebrow uppercase tracking-widest text-neutral-500 font-semibold mb-4">
              Mill Parameter Matrix
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-neutral-200 border border-neutral-200">
              <div className="bg-white p-4">
                <span className="block text-2xs uppercase tracking-wider text-neutral-400 font-mono">Yarn Count</span>
                <span className="block mt-1 font-medium text-neutral-900 text-body-sm">{product.specs.yarnCount}</span>
              </div>
              <div className="bg-white p-4">
                <span className="block text-2xs uppercase tracking-wider text-neutral-400 font-mono">Construction</span>
                <span className="block mt-1 font-medium text-neutral-900 text-body-sm">{product.specs.construction}</span>
              </div>
              <div className="bg-white p-4">
                <span className="block text-2xs uppercase tracking-wider text-neutral-400 font-mono">Weight / GSM</span>
                <span className="block mt-1 font-medium text-neutral-900 text-body-sm">{product.specs.weightGsm}</span>
              </div>
              <div className="bg-white p-4">
                <span className="block text-2xs uppercase tracking-wider text-neutral-400 font-mono">Available Widths</span>
                <span className="block mt-1 font-medium text-neutral-900 text-body-sm">{product.specs.widths}</span>
              </div>
              <div className="bg-white p-4">
                <span className="block text-2xs uppercase tracking-wider text-neutral-400 font-mono">Weave Type</span>
                <span className="block mt-1 font-medium text-neutral-900 text-body-sm">{product.specs.weaveType}</span>
              </div>
              <div className="bg-white p-4">
                <span className="block text-2xs uppercase tracking-wider text-neutral-400 font-mono">Finishing Treatments</span>
                <span className="block mt-1 font-medium text-neutral-900 text-body-sm">{product.specs.finishOptions}</span>
              </div>
              <div className="bg-white p-4">
                <span className="block text-2xs uppercase tracking-wider text-neutral-400 font-mono">Commercial MOQ</span>
                <span className="block mt-1 font-medium text-neutral-900 text-body-sm">{product.specs.moq}</span>
              </div>
              <div className="bg-white p-4">
                <span className="block text-2xs uppercase tracking-wider text-neutral-400 font-mono">Production Lead Time</span>
                <span className="block mt-1 font-medium text-neutral-900 text-body-sm">{product.specs.leadTime}</span>
              </div>
            </div>
          </div>

          {/* Features and Testing Grid */}
          <div className="grid md:grid-cols-2 gap-6 pt-4 border-t border-neutral-100">
            <div>
              <h4 className="text-eyebrow uppercase tracking-widest text-neutral-500 font-semibold mb-3">
                Quality & Performance Benchmarks
              </h4>
              <ul className="space-y-2 text-body-sm text-neutral-700">
                {product.keyFeatures.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="mt-1.5 w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-eyebrow uppercase tracking-widest text-neutral-500 font-semibold mb-3">
                Compliance & Quality Protocols
              </h4>
              <div className="flex flex-wrap gap-2">
                {product.certifications.map((cert) => (
                  <span
                    key={cert}
                    className="px-3 py-1.5 bg-brand-50 border border-neutral-200 text-neutral-800 font-mono text-2xs tracking-wider"
                  >
                    ✓ {cert}
                  </span>
                ))}
              </div>
              <div className="mt-4 p-3 bg-brand-50/70 border border-brand-200 text-2xs text-neutral-600 leading-relaxed">
                <strong>Sampling Protocol:</strong> A4 swatch cuttings and yardage strike-offs available on request for approved wholesale accounts and verified apparel makers.
              </div>
            </div>
          </div>
        </div>

        {/* Modal Bottom CTA Footer */}
        <div className="sticky bottom-0 z-20 flex flex-col sm:flex-row items-center justify-between gap-4 px-6 sm:px-8 py-4 bg-brand-50 border-t border-neutral-200">
          <div className="text-2xs text-neutral-500">
            Reference lot specification code: <span className="font-mono font-medium text-neutral-800">{product.categoryCode}</span>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={closeSpec}
              className="btn-secondary py-2.5 px-5 text-body-sm w-1/2 sm:w-auto"
            >
              Close
            </button>
            <button
              type="button"
              onClick={handleRequestQuote}
              className="btn-primary py-2.5 px-6 text-body-sm w-1/2 sm:w-auto"
            >
              Request Swatch & Quote
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
