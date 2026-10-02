import { useState } from 'react';
import { useStaggerReveal } from '../../hooks/useReveal';
import { useModal } from '../../context/ModalContext';

const stages = [
  {
    title: 'Raw Material Inspection',
    stageCode: 'QC-STAGE-01',
    metric: 'Uster & CSP Verification',
    details: [
      'Yarn count verification (Ne 40s to 120s)',
      'Tensile strength & elongation testing',
      'Evenness (U%) and hairiness analysis',
      'Moisture regain calibration (8.5% standard)',
    ],
  },
  {
    title: 'In-Process Testing',
    stageCode: 'QC-STAGE-02',
    metric: 'On-Loom Opto-Electronic Monitoring',
    details: [
      'EPI / PPI real-time density monitoring',
      'Width & grey GSM verification',
      'Selvedge tension & weave uniformity check',
      'Continuous loom stop-motion defect tracking',
    ],
  },
  {
    title: 'Fabric Inspection',
    stageCode: 'QC-STAGE-03',
    metric: 'ASTM D5430 4-Point System',
    details: [
      '100% fabric roll grading on backlit frames',
      'Colour fastness — wash (ISO 105-C06), rub, light',
      'Shrinkage & dimensional stability (AATCC 135)',
      'Martindale pilling & abrasion resistance',
    ],
  },
  {
    title: 'Final Approval',
    stageCode: 'QC-STAGE-04',
    metric: 'Pre-Shipment Audit (AQL 2.5)',
    details: [
      'Lot-wise physical & chemical test reports',
      'Buyer tech-pack cross-check & delta E audit',
      'Moisture-barrier export packing audit',
      'Pre-shipment inspection certificate release',
    ],
  },
];

export default function Quality() {
  const containerRef = useStaggerReveal();
  const [showCriteriaTable, setShowCriteriaTable] = useState(false);
  const { openQuote } = useModal();

  return (
    <section
      id="quality"
      className="py-24 lg:py-34 bg-white"
      aria-labelledby="quality-heading"
    >
      <div className="section-container" ref={containerRef}>
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 max-w-full">
          <div className="max-w-2xl">
            <span className="reveal eyebrow">Quality Assurance Framework</span>
            <h2
              id="quality-heading"
              className="reveal reveal-delay-1 mt-5 font-display text-display-sm lg:text-display text-neutral-900"
            >
              Consistency is built into every roll.
            </h2>
            <p className="reveal reveal-delay-2 mt-6 text-body text-neutral-600 leading-relaxed">
              Quality at Aarav Textiles is not a separate final checkpoint — it is engineered into every stage of production. From raw yarn receipts through spinning partner audits to final barcode roll sealing, each lot passes through documented checkpoints conforming to international buyer standards.
            </p>
          </div>

          <div className="reveal reveal-delay-2 flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={() => setShowCriteriaTable(!showCriteriaTable)}
              className="btn-secondary text-body-sm py-2.5 px-5"
            >
              {showCriteriaTable ? 'Hide 4-Point Criteria' : 'View 4-Point Grading Standards'}
            </button>
            <button
              type="button"
              onClick={() => openQuote()}
              className="btn-primary text-body-sm py-2.5 px-5"
            >
              Request Lab Test Reports
            </button>
          </div>
        </div>

        {/* 4-Point Grading Criteria Expandable Box */}
        {showCriteriaTable && (
          <div className="mt-8 p-6 bg-brand-50 border border-brand-200 animate-fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-brand-200">
              <span className="font-mono text-2xs uppercase tracking-wider text-accent font-semibold">
                ASTM D5430 / 4-Point System Defect Scoring Standard
              </span>
              <span className="text-2xs text-neutral-500 font-mono">Acceptance Threshold: Max 20 pts / 100 sq. yds</span>
            </div>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-2xs font-mono">
              <div className="p-3 bg-white border border-brand-200/80">
                <span className="text-accent font-bold text-sm block mb-1">1 Point</span>
                <span className="text-neutral-700">Defects up to 3 inches in length or width</span>
              </div>
              <div className="p-3 bg-white border border-brand-200/80">
                <span className="text-accent font-bold text-sm block mb-1">2 Points</span>
                <span className="text-neutral-700">Defects over 3 inches up to 6 inches</span>
              </div>
              <div className="p-3 bg-white border border-brand-200/80">
                <span className="text-accent font-bold text-sm block mb-1">3 Points</span>
                <span className="text-neutral-700">Defects over 6 inches up to 9 inches</span>
              </div>
              <div className="p-3 bg-white border border-brand-200/80">
                <span className="text-accent font-bold text-sm block mb-1">4 Points</span>
                <span className="text-neutral-700">Defects over 9 inches or any hole/tear</span>
              </div>
            </div>
          </div>
        )}

        {/* Quality flow */}
        <div className="mt-14 lg:mt-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-neutral-200 border border-neutral-200">
            {stages.map((stage, i) => (
              <div
                key={stage.title}
                className={`reveal reveal-delay-${i + 1} bg-white p-7 lg:p-9 relative flex flex-col justify-between`}
              >
                <div>
                  {/* Step number and Stage Code */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-mono text-2xs text-accent font-semibold px-2 py-0.5 bg-brand-50 border border-brand-200">
                      {stage.stageCode}
                    </span>
                    <span className="font-mono text-2xs text-neutral-400">
                      0{i + 1} / 04
                    </span>
                  </div>

                  <h3 className="font-display text-heading-sm text-neutral-900">
                    {stage.title}
                  </h3>

                  <div className="mt-2 text-2xs font-mono text-accent font-medium">
                    {stage.metric}
                  </div>

                  <ul className="mt-5 space-y-2.5 border-t border-neutral-100 pt-4" role="list">
                    {stage.details.map((detail) => (
                      <li
                        key={detail}
                        className="flex items-start gap-2.5 text-body-sm text-neutral-600"
                      >
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" aria-hidden="true" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-3 border-t border-neutral-100 text-2xs font-mono text-neutral-400 flex items-center justify-between">
                  <span>Pass Criterion: 100%</span>
                  <span className="text-emerald-700 font-semibold">✓ Verified</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testing Standards & Laboratory Credentials */}
        <div className="reveal mt-12 flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-8 border-t border-neutral-200">
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-2xs uppercase tracking-widest text-neutral-500 font-medium">
              Accredited Test Frameworks:
            </span>
            <div className="flex flex-wrap gap-2">
              {['ISO 9001:2015', 'OEKO-TEX Standard 100', 'AATCC Test Methods', 'BIS Indian Standards', 'ASTM International'].map((cert) => (
                <span
                  key={cert}
                  className="px-3 py-1 text-2xs font-mono text-neutral-700 bg-brand-50 border border-neutral-200 tracking-wide"
                >
                  {cert}
                </span>
              ))}
            </div>
          </div>

          <div className="text-2xs font-mono text-neutral-500">
            Internal In-House Laboratory calibrated to NABL standards
          </div>
        </div>
      </div>
    </section>
  );
}
