import { useState } from 'react';
import { useStaggerReveal } from '../../hooks/useReveal';
import { images } from '../../lib/images';

const steps = [
  {
    number: '01',
    title: 'Yarn Selection',
    description:
      'Raw material sourcing from certified spinners. Every lot is tested for count, evenness, and tensile strength before entering the production cycle.',
    machinery: 'Uster Tester 5 · Tensile Single-Yarn Tester',
    parameters: 'Count CV% < 1.2 · Hairiness H-Index < 4.2',
    inspection: 'Lot-to-lot CSP testing & twist multiplier check',
  },
  {
    number: '02',
    title: 'Weaving',
    description:
      'High-speed air-jet and rapier looms running plain, twill, satin, and dobby constructions. EPI and PPI monitored continuously against specification.',
    machinery: 'Picanol OmniPlus-i Air-Jets · Staubli Dobby Heads',
    parameters: 'Weft insertion up to 1,200 rpm · Widths to 340cm',
    inspection: 'Continuous opto-electronic warp & weft stop sensors',
  },
  {
    number: '03',
    title: 'Processing',
    description:
      'Grey fabric goes through singeing, desizing, scouring, and mercerizing as required. Each process is calibrated for the specific fabric construction.',
    machinery: 'Osthoff Singeing · Benninger Continuous Scouring',
    parameters: 'Controlled pH buffer · Cold pad-batch mercerizing',
    inspection: 'Barium activity number check for mercerization degree',
  },
  {
    number: '04',
    title: 'Dyeing & Finishing',
    description:
      'Pad-dry-cure and jigger dyeing for consistent shade matching. Finishing treatments include anti-crease, water-repellent, peach-feel, and flame-retardant.',
    machinery: 'Monforts Stenter Frames · Datacolor Dispensing',
    parameters: 'Delta E < 0.60 · Computerized recipe calculation',
    inspection: 'Spectrophotometric shade sorting under D65 & TL84 lights',
  },
  {
    number: '05',
    title: 'Quality Inspection',
    description:
      'Four-point fabric inspection system. Every roll tested for GSM, shrinkage, colour fastness (washing, rubbing, light), and dimensional stability.',
    machinery: '4-Point Motorized Inspection Frames · Light Cabinets',
    parameters: 'Defect score < 20 pts / 100 sq. yds (Grade A)',
    inspection: 'Full physical test report generated per master roll',
  },
  {
    number: '06',
    title: 'Packing & Dispatch',
    description:
      'Fabric packed to buyer specification — roll, fold, or bale. Export documentation, container loading supervision, and shipment tracking.',
    machinery: 'Automatic Poly-Shrink Wrapping & Roll Palletizers',
    parameters: 'Double-ply moisture barrier · Export carton strapping',
    inspection: 'Gross/Net weight verification & container seal audits',
  },
];

export default function Manufacturing() {
  const containerRef = useStaggerReveal();
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section
      id="manufacturing"
      className="py-24 lg:py-34 bg-neutral-925 text-white"
      aria-labelledby="manufacturing-heading"
    >
      <div className="section-container" ref={containerRef}>
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
          <div>
            <span className="reveal eyebrow text-brand-400">Manufacturing Facility</span>
            <h2
              id="manufacturing-heading"
              className="reveal reveal-delay-1 mt-5 font-display text-display-sm lg:text-display text-white"
            >
              From raw material to finished fabric.
            </h2>
          </div>
          <div className="reveal reveal-delay-2 flex items-end">
            <p className="text-body text-neutral-400 leading-relaxed max-w-lg">
              Our manufacturing infrastructure in Gujarat is engineered for traceability and consistency. Every batch is catalogued, process parameters are calibrated in real-time, and every single meter is graded before dispatch.
            </p>
          </div>
        </div>

        {/* Process image with industrial technical overlay */}
        <div className="reveal reveal-delay-2 mt-14 lg:mt-18 relative overflow-hidden border border-neutral-800">
          <img
            src={images.heroFactory}
            alt="Textile manufacturing floor with industrial air-jet looms in operation"
            className="w-full aspect-[21/9] object-cover opacity-60 filter contrast-125"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />
          
          <div className="absolute bottom-6 left-6 right-6 hidden md:flex items-center justify-between text-2xs font-mono text-neutral-300">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Looms Running: 144 Air-Jet Units
              </span>
              <span className="text-neutral-600">|</span>
              <span>Weaving Hall 02</span>
              <span className="text-neutral-600">|</span>
              <span>Capacity: 50,000m / day</span>
            </div>
            <div className="text-brand-300 uppercase tracking-widest text-[10px]">
              Vertical Integration · Yarn to Roll
            </div>
          </div>
        </div>

        {/* Interactive Step Selector and Detail Display */}
        <div className="mt-16 lg:mt-20">
          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-neutral-800 border border-neutral-800">
            {steps.map((step, i) => {
              const isSelected = activeStep === i;
              return (
                <div
                  key={step.number}
                  role="button"
                  tabIndex={0}
                  aria-pressed={isSelected}
                  onClick={() => setActiveStep(i)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setActiveStep(i);
                    }
                  }}
                  className={`reveal reveal-delay-${Math.min(i + 1, 6)} group p-7 lg:p-8 cursor-pointer transition-all duration-300 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-[-2px] ${
                    isSelected
                      ? 'bg-neutral-900 border-l-2 border-accent'
                      : 'bg-neutral-925 hover:bg-neutral-900/60'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-brand-400 font-semibold tracking-wider">
                      STAGE {step.number}
                    </span>
                    {isSelected && (
                      <span className="text-[10px] uppercase tracking-wider font-mono px-2 py-0.5 bg-accent/20 text-accent border border-accent/40">
                        Selected Stage
                      </span>
                    )}
                  </div>

                  <h3 className="mt-4 font-display text-heading-sm text-white group-hover:text-brand-200 transition-colors">
                    {step.title}
                  </h3>

                  <p className="mt-2.5 text-body-sm text-neutral-400 leading-relaxed">
                    {step.description}
                  </p>

                  <div className="mt-4 pt-3 border-t border-neutral-800/80 flex items-center justify-between text-2xs font-mono text-neutral-500">
                    <span>Click for mill telemetry</span>
                    <span className="text-accent group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Active Step Telemetry Panel */}
          <div className="mt-6 p-6 lg:p-8 bg-neutral-900 border border-neutral-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-mono text-2xs text-accent uppercase tracking-wider font-semibold">
                  Stage {steps[activeStep].number} Mill Details
                </span>
                <span className="text-neutral-600">·</span>
                <span className="text-xs text-white font-medium">{steps[activeStep].title}</span>
              </div>
              <p className="text-body-sm text-neutral-400">
                Primary Machine Cell: <strong className="text-neutral-200">{steps[activeStep].machinery}</strong>
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full md:w-auto text-2xs font-mono">
              <div className="p-3 bg-neutral-950 border border-neutral-800/60">
                <span className="text-neutral-500 block">Calibration Metric:</span>
                <span className="text-brand-300 font-medium">{steps[activeStep].parameters}</span>
              </div>
              <div className="p-3 bg-neutral-950 border border-neutral-800/60">
                <span className="text-neutral-500 block">Quality Protocol:</span>
                <span className="text-brand-300 font-medium">{steps[activeStep].inspection}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
