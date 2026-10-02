import { useEffect, useState } from 'react';
import { images } from '../../lib/images';
import { useModal } from '../../context/ModalContext';

export default function Hero() {
  const [loaded, setLoaded] = useState(false);
  const { openQuote } = useModal();

  useEffect(() => {
    // Trigger entrance animations after a small delay
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-end lg:items-center overflow-hidden"
      aria-label="Hero"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={images.heroFactory}
          alt="Large textile manufacturing facility with industrial looms and fabric rolls"
          className={`w-full h-full object-cover transition-all duration-[1.8s] ease-out-expo ${
            loaded ? 'scale-100 opacity-100' : 'scale-105 opacity-0'
          }`}
        />
        {/* Dark overlay for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-black/35" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/30 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 section-container w-full pb-20 pt-36 lg:pb-28 lg:pt-20">
        <div className="max-w-3xl">
          {/* Eyebrow badge */}
          <div
            className={`inline-flex items-center gap-2.5 px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 text-2xs uppercase tracking-widest text-brand-200 mb-6 transition-all duration-1000 ease-out-expo ${
              loaded ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span>Integrated Textile Mill · Gujarat, India</span>
          </div>

          {/* Headline */}
          <h1
            className={`font-display text-[2.35rem] sm:text-display-lg md:text-display-xl text-white leading-[1.08] sm:leading-none transition-all duration-1000 ease-out-expo ${
              loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            Engineered Fabrics.
            <br />
            Reliable Supply.
          </h1>

          {/* Subheadline */}
          <p
            className={`mt-6 lg:mt-8 max-w-xl text-body-lg text-white/80 leading-relaxed transition-all duration-1000 ease-out-expo ${
              loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            Performance-driven fabrics manufactured for garment makers, brands,
            distributors and industrial buyers worldwide.
          </p>

          {/* CTAs */}
          <div
            className={`mt-8 lg:mt-10 flex flex-wrap gap-4 transition-all duration-1000 ease-out-expo ${
              loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
            style={{ transitionDelay: '400ms' }}
          >
            <a href="#products" className="btn-light">
              Explore Products
            </a>
            <button
              type="button"
              onClick={() => openQuote()}
              className="inline-flex items-center gap-2 px-7 py-3.5 text-body-sm font-medium tracking-wide text-white border border-white/50 transition-all duration-300 ease-out-expo hover:bg-white hover:text-neutral-900"
            >
              Request a Quote
            </button>
          </div>

          {/* Trust Highlights Strip */}
          <div
            className={`mt-12 pt-6 border-t border-white/15 grid grid-cols-2 sm:grid-cols-3 gap-6 max-w-2xl transition-all duration-1000 ease-out-expo ${
              loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
            style={{ transitionDelay: '600ms' }}
          >
            <div>
              <div className="font-display text-lg text-white font-semibold">18M+ Meters</div>
              <div className="text-2xs text-white/60 uppercase tracking-wider mt-0.5">Annual Woven Output</div>
            </div>
            <div>
              <div className="font-display text-lg text-white font-semibold">35+ Nations</div>
              <div className="text-2xs text-white/60 uppercase tracking-wider mt-0.5">Global Export Reach</div>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <div className="font-display text-lg text-white font-semibold">Lab-to-Bulk</div>
              <div className="text-2xs text-white/60 uppercase tracking-wider mt-0.5">Strict Lot Consistency</div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 hidden lg:flex transition-all duration-1000 ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ transitionDelay: '800ms' }}
          aria-hidden="true"
        >
          <span className="text-2xs uppercase tracking-[0.2em] text-white/50">
            Scroll
          </span>
          <div className="w-px h-10 bg-gradient-to-b from-white/40 to-transparent relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-3 bg-white/80 animate-[scroll-line_2s_ease-in-out_infinite]" />
          </div>
        </div>
      </div>

      {/* Inline keyframes for scroll indicator */}
      <style>{`
        @keyframes scroll-line {
          0% { transform: translateY(-12px); opacity: 0; }
          30% { opacity: 1; }
          100% { transform: translateY(40px); opacity: 0; }
        }
      `}</style>
    </section>
  );
}
