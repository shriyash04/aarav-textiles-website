import { useState, useEffect } from 'react';
import { useModal } from '../../context/ModalContext';
import { productsData } from '../../data/products';

export default function QuoteModal() {
  const { isQuoteOpen, selectedProduct, closeQuote } = useModal();

  const [formData, setFormData] = useState({
    fullName: '',
    workEmail: '',
    companyName: '',
    country: '',
    buyerType: 'Garment Manufacturer',
    fabricCategory: 'cotton-fabrics',
    estimatedVolume: '5,000 – 15,000 Meters',
    targetGsm: '',
    notes: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [rfqNumber, setRfqNumber] = useState('');

  // Update selected fabric when opened from specific product
  useEffect(() => {
    if (selectedProduct) {
      setFormData((prev) => ({
        ...prev,
        fabricCategory: selectedProduct.id,
      }));
    }
  }, [selectedProduct]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeQuote();
    };
    if (isQuoteOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isQuoteOpen, closeQuote]);

  if (!isQuoteOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedRfq = `ARV-RFQ-${Math.floor(100000 + Math.random() * 900000)}`;
    setRfqNumber(generatedRfq);
    setIsSubmitted(true);
  };

  const resetAndClose = () => {
    setIsSubmitted(false);
    closeQuote();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="quote-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-10 bg-neutral-950/80 backdrop-blur-sm animate-fade-in"
      onClick={resetAndClose}
    >
      <div
        className="relative w-full max-w-2xl max-h-[92vh] bg-white border border-neutral-200 overflow-y-auto shadow-2xl flex flex-col animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-brand-50 border-b border-neutral-200">
          <div>
            <span className="eyebrow block">B2B Manufacturing Enquiry</span>
            <h2 id="quote-modal-title" className="font-display text-heading-sm text-neutral-900 mt-1">
              Request Commercial Quotation & Swatches
            </h2>
          </div>
          <button
            onClick={resetAndClose}
            className="p-1.5 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-200/60 transition-colors"
            aria-label="Close quotation modal"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          {isSubmitted ? (
            <div className="text-center py-8 space-y-6">
              <div className="w-16 h-16 mx-auto bg-brand-100 border border-brand-300 rounded-full flex items-center justify-center text-accent">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>

              <div>
                <span className="eyebrow">Enquiry Dispatched to Mill Desk</span>
                <h3 className="font-display text-display-sm text-neutral-900 mt-2">
                  Quotation Request Registered
                </h3>
                <p className="mt-3 text-body-sm text-neutral-600 max-w-md mx-auto">
                  Thank you, <strong className="text-neutral-900">{formData.fullName}</strong>. Our commercial export sales team will review your fabric specification and reply within <strong>24–48 business hours</strong>.
                </p>
              </div>

              {/* RFQ Reference Card */}
              <div className="max-w-md mx-auto p-5 bg-brand-50 border border-neutral-200 text-left space-y-2">
                <div className="flex justify-between items-center pb-2 border-b border-neutral-200">
                  <span className="text-2xs uppercase tracking-wider text-neutral-500 font-mono">Reference Number</span>
                  <span className="font-mono text-sm font-semibold text-accent">{rfqNumber}</span>
                </div>
                <div className="flex justify-between items-center text-2xs">
                  <span className="text-neutral-500">Target Fabric:</span>
                  <span className="font-medium text-neutral-800">
                    {productsData.find((p) => p.id === formData.fabricCategory)?.title || formData.fabricCategory}
                  </span>
                </div>
                <div className="flex justify-between items-center text-2xs">
                  <span className="text-neutral-500">Estimated Volume:</span>
                  <span className="font-medium text-neutral-800">{formData.estimatedVolume}</span>
                </div>
                <div className="flex justify-between items-center text-2xs">
                  <span className="text-neutral-500">Destination:</span>
                  <span className="font-medium text-neutral-800">{formData.country || 'Global Export'}</span>
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={resetAndClose}
                  className="btn-primary w-full sm:w-auto"
                >
                  Return to Homepage
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <p className="text-body-sm text-neutral-600 leading-relaxed">
                Connect directly with our mill sales desk for pricing tiers, lab-dip sampling, production slots, and CIF/FOB export quotes.
              </p>

              {/* Grid 1: Contact Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="fullName" className="block text-2xs uppercase tracking-wider text-neutral-600 font-medium mb-1.5">
                    Contact Name *
                  </label>
                  <input
                    id="fullName"
                    required
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Marcus Vance"
                    className="w-full px-3.5 py-2.5 bg-brand-50/50 border border-neutral-300 text-body-sm text-neutral-900 focus:outline-none focus:border-accent transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="workEmail" className="block text-2xs uppercase tracking-wider text-neutral-600 font-medium mb-1.5">
                    Corporate Email *
                  </label>
                  <input
                    id="workEmail"
                    required
                    type="email"
                    value={formData.workEmail}
                    onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                    placeholder="marcus@garmentworks.com"
                    className="w-full px-3.5 py-2.5 bg-brand-50/50 border border-neutral-300 text-body-sm text-neutral-900 focus:outline-none focus:border-accent transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="companyName" className="block text-2xs uppercase tracking-wider text-neutral-600 font-medium mb-1.5">
                    Company / Organization *
                  </label>
                  <input
                    id="companyName"
                    required
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    placeholder="e.g. Apex Apparel Group"
                    className="w-full px-3.5 py-2.5 bg-brand-50/50 border border-neutral-300 text-body-sm text-neutral-900 focus:outline-none focus:border-accent transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="country" className="block text-2xs uppercase tracking-wider text-neutral-600 font-medium mb-1.5">
                    Destination Country / Port *
                  </label>
                  <input
                    id="country"
                    required
                    type="text"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    placeholder="e.g. United Kingdom (FOB/CIF)"
                    className="w-full px-3.5 py-2.5 bg-brand-50/50 border border-neutral-300 text-body-sm text-neutral-900 focus:outline-none focus:border-accent transition-colors"
                  />
                </div>
              </div>

              {/* Grid 2: Fabric & Sourcing Parameters */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-neutral-100">
                <div>
                  <label htmlFor="fabricCategory" className="block text-2xs uppercase tracking-wider text-neutral-600 font-medium mb-1.5">
                    Target Fabric Category *
                  </label>
                  <select
                    id="fabricCategory"
                    value={formData.fabricCategory}
                    onChange={(e) => setFormData({ ...formData, fabricCategory: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-brand-50/50 border border-neutral-300 text-body-sm text-neutral-900 focus:outline-none focus:border-accent transition-colors cursor-pointer"
                  >
                    {productsData.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="buyerType" className="block text-2xs uppercase tracking-wider text-neutral-600 font-medium mb-1.5">
                    Buyer Profile
                  </label>
                  <select
                    id="buyerType"
                    value={formData.buyerType}
                    onChange={(e) => setFormData({ ...formData, buyerType: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-brand-50/50 border border-neutral-300 text-body-sm text-neutral-900 focus:outline-none focus:border-accent transition-colors cursor-pointer"
                  >
                    <option value="Garment Manufacturer">Garment Manufacturer</option>
                    <option value="Fashion Brand">Fashion Brand / Retailer</option>
                    <option value="Buying House / Agent">Buying House / Sourcing Agent</option>
                    <option value="Fabric Wholesaler / Importer">Fabric Wholesaler / Importer</option>
                    <option value="Institutional / Uniform Supplier">Institutional / Uniform Supplier</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="estimatedVolume" className="block text-2xs uppercase tracking-wider text-neutral-600 font-medium mb-1.5">
                    Estimated Production Volume
                  </label>
                  <select
                    id="estimatedVolume"
                    value={formData.estimatedVolume}
                    onChange={(e) => setFormData({ ...formData, estimatedVolume: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-brand-50/50 border border-neutral-300 text-body-sm text-neutral-900 focus:outline-none focus:border-accent transition-colors cursor-pointer"
                  >
                    <option value="Sampling (50–300 Meters)">Sampling (50–300 Meters)</option>
                    <option value="1,500 – 5,000 Meters (Trial Order)">1,500 – 5,000 Meters (Trial Order)</option>
                    <option value="5,000 – 15,000 Meters">5,000 – 15,000 Meters</option>
                    <option value="15,000 – 50,000 Meters">15,000 – 50,000 Meters</option>
                    <option value="50,000+ Meters (Annual Contract)">50,000+ Meters (Annual Contract)</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="targetGsm" className="block text-2xs uppercase tracking-wider text-neutral-600 font-medium mb-1.5">
                    Target GSM / Weave Count (Optional)
                  </label>
                  <input
                    id="targetGsm"
                    type="text"
                    value={formData.targetGsm}
                    onChange={(e) => setFormData({ ...formData, targetGsm: e.target.value })}
                    placeholder="e.g. 140 GSM, 60s x 60s"
                    className="w-full px-3.5 py-2.5 bg-brand-50/50 border border-neutral-300 text-body-sm text-neutral-900 focus:outline-none focus:border-accent transition-colors"
                  />
                </div>
              </div>

              {/* Notes */}
              <div>
                <label htmlFor="notes" className="block text-2xs uppercase tracking-wider text-neutral-600 font-medium mb-1.5">
                  Specification Details & Swatch Requirements
                </label>
                <textarea
                  id="notes"
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Mention desired hand-feel, shade references (Pantone/TCX), finish treatments, or target delivery dates..."
                  className="w-full px-3.5 py-2.5 bg-brand-50/50 border border-neutral-300 text-body-sm text-neutral-900 focus:outline-none focus:border-accent transition-colors resize-none"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-2xs text-neutral-500 italic">
                  * Fictional demo form. No real emails or contracts are created.
                </span>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={resetAndClose}
                    className="btn-secondary py-2.5 px-5 text-body-sm w-1/2 sm:w-auto"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-primary py-2.5 px-7 text-body-sm w-1/2 sm:w-auto"
                  >
                    Submit RFQ
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
