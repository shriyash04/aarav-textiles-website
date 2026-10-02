import { useState, useEffect } from 'react';
import { productsData } from '../../data/products';

interface CatalogueModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CatalogueModal({ isOpen, onClose }: CatalogueModalProps) {
  const [downloading, setDownloading] = useState(false);
  const [downloadComplete, setDownloadComplete] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const triggerDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      setDownloadComplete(true);

      // Create a markdown / text summary file download as proof of real download
      const catalogueContent = `=======================================================
AARAV TEXTILES — MILL PRODUCTION COMPENDIUM (2026-27)
Engineered Fabrics. Reliable Supply.
Location: Surat, Gujarat, India
Export Bureau: export@aaravtextiles.demo
=======================================================

TABLE OF CAPABILITIES & SPECIFICATIONS:

${productsData
  .map(
    (p, i) => `-------------------------------------------------------
0${i + 1}. ${p.title.toUpperCase()} [${p.categoryCode}]
-------------------------------------------------------
Description: ${p.description}
Applications: ${p.applications}
Yarn Count: ${p.specs.yarnCount}
Construction: ${p.specs.construction}
Weight: ${p.specs.weightGsm}
Widths: ${p.specs.widths}
Weave: ${p.specs.weaveType}
Finishes: ${p.specs.finishOptions}
Commercial MOQ: ${p.specs.moq}
Production Lead: ${p.specs.leadTime}
Key Standards: ${p.keyFeatures.join('; ')}
Certifications: ${p.certifications.join(', ')}
`
  )
  .join('\n')}

=======================================================
QUALITY TESTING PROTOCOLS (IN-HOUSE LAB):
- ISO 105-C06 / C08 (Color fastness to domestic & commercial laundering)
- ISO 12945-2 (Martindale pilling & abrasion resistance)
- AATCC 135 (Dimensional stability & skewness after home laundering)
- ISO 13934-1 (Tensile properties — Maximum force & elongation)
- Spectrophotometer color tolerance: Delta E < 0.60
=======================================================
* Fictional B2B portfolio demonstration document.
`;

      const blob = new Blob([catalogueContent], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Aarav-Textiles-Fabric-Compendium-2026.txt';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }, 900);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="catalogue-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-10 bg-neutral-950/80 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl bg-white border border-neutral-200 shadow-2xl p-6 sm:p-8 animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-neutral-200">
          <div>
            <span className="eyebrow block">Technical Documentation</span>
            <h3 id="catalogue-modal-title" className="font-display text-heading-sm text-neutral-900 mt-1">
              Fabric Compendium & Mill Specifications
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-200/60 transition-colors"
            aria-label="Close dialogue"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="mt-6 space-y-4">
          <p className="text-body-sm text-neutral-600 leading-relaxed">
            Download the comprehensive 2026–27 fabric specification sheets covering all 6 core production categories, yarn count parameters, finishing chemistry, and export packaging specifications.
          </p>

          <div className="p-4 bg-brand-50 border border-neutral-200 space-y-2 text-2xs font-mono text-neutral-600">
            <div className="flex justify-between">
              <span>File Format:</span>
              <span className="font-medium text-neutral-900">Technical Spec Compendium (.txt / pdf ready)</span>
            </div>
            <div className="flex justify-between">
              <span>Categories:</span>
              <span className="font-medium text-neutral-900">6 Major Mill Divisions</span>
            </div>
            <div className="flex justify-between">
              <span>Standards Covered:</span>
              <span className="font-medium text-neutral-900">ISO 9001, OEKO-TEX, AATCC, BIS</span>
            </div>
            <div className="flex justify-between">
              <span>Last Revised:</span>
              <span className="font-medium text-neutral-900">Q3 Commercial Release</span>
            </div>
          </div>

          {downloadComplete && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-2xs flex items-center gap-2">
              <svg className="w-4 h-4 text-emerald-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <span>Download initiated successfully. Check your browser downloads folder.</span>
            </div>
          )}
        </div>

        <div className="mt-8 pt-4 border-t border-neutral-100 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="btn-secondary py-2.5 px-5 text-body-sm"
          >
            Close
          </button>
          <button
            type="button"
            onClick={triggerDownload}
            disabled={downloading}
            className="btn-primary py-2.5 px-6 text-body-sm inline-flex items-center gap-2"
          >
            {downloading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                </svg>
                Generating...
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download Specifications
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
