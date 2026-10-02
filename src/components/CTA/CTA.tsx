import { useState } from 'react';
import { useReveal } from '../../hooks/useReveal';
import { useModal } from '../../context/ModalContext';
import CatalogueModal from '../Modals/CatalogueModal';

export default function CTA() {
  const { ref, isVisible } = useReveal();
  const { openQuote } = useModal();
  const [catalogueOpen, setCatalogueOpen] = useState(false);

  return (
    <>
      <section
        id="contact"
        className="py-24 lg:py-34 bg-brand-100 border-t border-brand-200"
        aria-labelledby="cta-heading"
      >
        <div className="section-container" ref={ref}>
          <div
            className={`max-w-2xl mx-auto text-center transition-all duration-1000 ease-out-expo ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
          >
            <span className="eyebrow block">Commercial Inquiries</span>
            <h2
              id="cta-heading"
              className="mt-3 font-display text-display-sm lg:text-display text-neutral-900"
            >
              Looking for a reliable textile manufacturing partner?
            </h2>
            <p className="mt-6 text-body-lg text-neutral-600 leading-relaxed">
              Tell us what you need. Our team will help you identify the right
              fabric specification, provide samples, and set up a production
              schedule that fits your requirements.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => openQuote()}
                className="btn-primary"
              >
                Request a Quote
              </button>
              <button
                type="button"
                onClick={() => setCatalogueOpen(true)}
                className="btn-secondary"
              >
                Download Catalogue
              </button>
            </div>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 text-2xs text-neutral-500 font-mono">
              <span>Typical mill response: 24–48 hours</span>
              <span className="hidden sm:inline">·</span>
              <span>Export clearance from Nhava Sheva & Mundra</span>
            </div>
          </div>
        </div>
      </section>

      <CatalogueModal
        isOpen={catalogueOpen}
        onClose={() => setCatalogueOpen(false)}
      />
    </>
  );
}
