import { useState } from 'react';
import { useStaggerReveal } from '../../hooks/useReveal';
import { useModal } from '../../context/ModalContext';

interface RegionData {
  id: string;
  name: string;
  countries: string;
  transitTime: string;
  mainPorts: string;
  incoterms: string;
  routeCoordinates: { x: number; y: number };
}

const regions: RegionData[] = [
  {
    id: 'europe',
    name: 'Europe',
    countries: 'United Kingdom · Germany · France · Italy · Spain · Poland',
    transitTime: '14–18 Days Transit',
    mainPorts: 'Rotterdam · Hamburg · Felixstowe · Genoa',
    incoterms: 'FOB Nhava Sheva / CIF European Base Ports',
    routeCoordinates: { x: 285, y: 125 },
  },
  {
    id: 'middle-east',
    name: 'Middle East',
    countries: 'United Arab Emirates · Saudi Arabia · Qatar · Oman · Kuwait',
    transitTime: '3–6 Days Transit',
    mainPorts: 'Jebel Ali (Dubai) · Dammam · Jeddah · Hamad',
    incoterms: 'FOB Mundra / CIF Gulf Ports',
    routeCoordinates: { x: 335, y: 175 },
  },
  {
    id: 'north-america',
    name: 'North America',
    countries: 'United States · Canada · Mexico',
    transitTime: '22–28 Days Transit',
    mainPorts: 'New York / New Jersey · Savannah · Long Beach · Montreal',
    incoterms: 'FOB Indian Ports / CIF East & West Coast',
    routeCoordinates: { x: 120, y: 135 },
  },
  {
    id: 'southeast-asia',
    name: 'Southeast Asia & Subcontinent',
    countries: 'Bangladesh · Vietnam · Sri Lanka · Indonesia · Malaysia',
    transitTime: '5–10 Days Transit',
    mainPorts: 'Chittagong · Colombo · Port Klang · Ho Chi Minh',
    incoterms: 'FOB Nhava Sheva / CIF ASEAN Ports',
    routeCoordinates: { x: 470, y: 220 },
  },
];

export default function GlobalSupply() {
  const containerRef = useStaggerReveal();
  const [activeRegion, setActiveRegion] = useState<string>('europe');
  const { openQuote } = useModal();

  const currentRegion = regions.find((r) => r.id === activeRegion) || regions[0];

  return (
    <section
      id="global"
      className="py-24 lg:py-34 bg-neutral-925 text-white overflow-hidden"
      aria-labelledby="global-heading"
    >
      <div className="section-container" ref={containerRef}>
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left: Content and Region Selector (7 cols) */}
          <div className="lg:col-span-7">
            <span className="reveal eyebrow text-brand-400">Global Supply & Export Logistics</span>
            <h2
              id="global-heading"
              className="reveal reveal-delay-1 mt-5 font-display text-display-sm lg:text-display text-white"
            >
              Built in India.
              <br />
              Supplied worldwide.
            </h2>
            <p className="reveal reveal-delay-2 mt-6 text-body text-neutral-400 leading-relaxed max-w-xl">
              From our mill in Gujarat, we serve wholesale buyers, garment makers, and institutional procurement teams across four continents. Our in-house export desk coordinates documentation, containerization, and vessel booking for predictable dispatch.
            </p>

            {/* Regions list */}
            <div className="mt-10 space-y-2">
              {regions.map((region, i) => {
                const isActive = activeRegion === region.id;
                return (
                  <div
                    key={region.name}
                    role="button"
                    tabIndex={0}
                    aria-pressed={isActive}
                    onClick={() => setActiveRegion(region.id)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setActiveRegion(region.id);
                      }
                    }}
                    className={`reveal reveal-delay-${i + 1} p-5 border transition-all duration-300 cursor-pointer focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-[-2px] ${
                      isActive
                        ? 'border-brand-500/70 bg-neutral-900 shadow-md'
                        : 'border-neutral-800 bg-neutral-925 hover:border-neutral-700 hover:bg-neutral-900/40'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-3">
                          <h3 className="font-display text-heading-sm text-white">
                            {region.name}
                          </h3>
                          <span className="px-2 py-0.5 font-mono text-[10px] tracking-wider uppercase bg-brand-900/80 text-brand-300 border border-brand-700/50">
                            {region.transitTime}
                          </span>
                        </div>
                        <p className="mt-1.5 text-body-sm text-neutral-400">
                          {region.countries}
                        </p>
                      </div>

                      <div className="mt-1 flex-shrink-0">
                        <span
                          className={`w-3 h-3 rounded-full block transition-all ${
                            isActive ? 'bg-accent ring-4 ring-accent/20' : 'bg-neutral-700'
                          }`}
                        />
                      </div>
                    </div>

                    {isActive && (
                      <div className="mt-4 pt-3 border-t border-neutral-800/80 grid grid-cols-1 sm:grid-cols-2 gap-3 text-2xs font-mono text-neutral-400 animate-fade-in">
                        <div>
                          <span className="text-neutral-500 block">Hub Ports:</span>
                          <span className="text-white">{region.mainPorts}</span>
                        </div>
                        <div>
                          <span className="text-neutral-500 block">Terms Supported:</span>
                          <span className="text-white">{region.incoterms}</span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Logistics Assurance Badges */}
            <div className="reveal mt-8 pt-6 border-t border-neutral-800/80 flex flex-wrap items-center gap-3">
              {[
                'FOB / CIF / CFR Terms',
                'FCL & LCL Consolidation',
                'EUR.1 / GSP Form A Ready',
                'Moisture-Barrier Packing',
              ].map((badge) => (
                <span
                  key={badge}
                  className="px-3 py-1 bg-neutral-900 border border-neutral-800 text-neutral-400 text-2xs font-mono"
                >
                  ✓ {badge}
                </span>
              ))}
            </div>

            <p className="reveal mt-5 text-2xs text-neutral-600 italic">
              * Global trade regions and transit statistics are fictional demo illustrations.
            </p>
          </div>

          {/* Right: Interactive High-Tech Global Trade Vector (5 cols) */}
          <div className="lg:col-span-5 reveal reveal-delay-2 lg:sticky lg:top-28">
            <div className="p-6 bg-neutral-900 border border-neutral-800 relative overflow-hidden">
              <div className="flex items-center justify-between pb-4 border-b border-neutral-800 text-2xs font-mono">
                <span className="text-neutral-400 uppercase tracking-wider flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Origin Hub: Gujarat, IN (21.17° N, 72.83° E)
                </span>
                <span className="text-accent font-semibold">Active Corridor</span>
              </div>

              {/* Map Illustration SVG */}
              <div className="my-6 relative aspect-[4/3] flex items-center justify-center bg-neutral-950/80 border border-neutral-800/80">
                <svg
                  viewBox="0 0 540 360"
                  className="w-full h-full p-2"
                  fill="none"
                  aria-hidden="true"
                >
                  {/* Subtle Grid Lines */}
                  <line x1="0" y1="90" x2="540" y2="90" stroke="#262320" strokeWidth="0.5" strokeDasharray="3 3" />
                  <line x1="0" y1="180" x2="540" y2="180" stroke="#262320" strokeWidth="0.5" strokeDasharray="3 3" />
                  <line x1="0" y1="270" x2="540" y2="270" stroke="#262320" strokeWidth="0.5" strokeDasharray="3 3" />
                  <line x1="135" y1="0" x2="135" y2="360" stroke="#262320" strokeWidth="0.5" strokeDasharray="3 3" />
                  <line x1="270" y1="0" x2="270" y2="360" stroke="#262320" strokeWidth="0.5" strokeDasharray="3 3" />
                  <line x1="405" y1="0" x2="405" y2="360" stroke="#262320" strokeWidth="0.5" strokeDasharray="3 3" />

                  {/* World Landmasses (Stylized outlines) */}
                  {/* North America */}
                  <path
                    d="M 60 70 L 140 60 L 170 100 L 130 160 L 90 140 Z"
                    fill="#1f1d1a"
                    stroke="#38332c"
                    strokeWidth="1"
                  />
                  {/* South America */}
                  <path
                    d="M 120 180 L 160 190 L 150 290 L 110 240 Z"
                    fill="#1a1917"
                    stroke="#2e2b26"
                    strokeWidth="1"
                  />
                  {/* Europe */}
                  <path
                    d="M 250 80 L 320 70 L 320 130 L 250 120 Z"
                    fill="#1f1d1a"
                    stroke="#38332c"
                    strokeWidth="1"
                  />
                  {/* Africa */}
                  <path
                    d="M 250 140 L 310 140 L 300 270 L 240 220 Z"
                    fill="#1a1917"
                    stroke="#2e2b26"
                    strokeWidth="1"
                  />
                  {/* Asia / Eurasia */}
                  <path
                    d="M 330 60 L 480 70 L 460 170 L 350 150 Z"
                    fill="#1f1d1a"
                    stroke="#38332c"
                    strokeWidth="1"
                  />
                  {/* India Subcontinent (Prominent) */}
                  <path
                    d="M 360 160 L 400 160 L 380 230 Z"
                    fill="#2a251f"
                    stroke="#8b7355"
                    strokeWidth="1.5"
                  />
                  {/* Southeast Asia & Australia */}
                  <path
                    d="M 440 180 L 490 190 L 470 240 Z"
                    fill="#1a1917"
                    stroke="#2e2b26"
                    strokeWidth="1"
                  />
                  <path
                    d="M 450 260 L 510 270 L 490 320 L 440 300 Z"
                    fill="#1a1917"
                    stroke="#2e2b26"
                    strokeWidth="1"
                  />

                  {/* India Mill Hub Pin */}
                  <circle cx="375" cy="180" r="10" fill="none" stroke="#8b7355" strokeWidth="1" opacity="0.4" />
                  <circle cx="375" cy="180" r="5" fill="#8b7355" />
                  <circle cx="375" cy="180" r="2" fill="#fff" />
                  <text x="365" y="165" fill="#c4b9a5" fontSize="9" fontFamily="monospace" fontWeight="bold">
                    INDIA HUB
                  </text>

                  {/* Active Trade Route Arc from India (375, 180) to Destination */}
                  <path
                    d={`M 375 180 Q ${(375 + currentRegion.routeCoordinates.x) / 2} ${
                      Math.min(180, currentRegion.routeCoordinates.y) - 40
                    } ${currentRegion.routeCoordinates.x} ${currentRegion.routeCoordinates.y}`}
                    fill="none"
                    stroke="#8b7355"
                    strokeWidth="2.5"
                    strokeDasharray="6 4"
                    className="animate-pulse"
                  />

                  {/* Target Destination Pin */}
                  <circle
                    cx={currentRegion.routeCoordinates.x}
                    cy={currentRegion.routeCoordinates.y}
                    r="8"
                    fill="none"
                    stroke="#fff"
                    strokeWidth="1.5"
                  />
                  <circle
                    cx={currentRegion.routeCoordinates.x}
                    cy={currentRegion.routeCoordinates.y}
                    r="3.5"
                    fill="#fff"
                  />
                  <text
                    x={currentRegion.routeCoordinates.x - 20}
                    y={currentRegion.routeCoordinates.y + 20}
                    fill="#fff"
                    fontSize="10"
                    fontFamily="monospace"
                    fontWeight="bold"
                  >
                    {currentRegion.name.toUpperCase()}
                  </text>
                </svg>
              </div>

              {/* Corridor Card Info */}
              <div className="p-4 bg-neutral-950 border border-neutral-800 space-y-2">
                <div className="flex justify-between items-center text-2xs">
                  <span className="text-neutral-500 font-mono">Selected Region:</span>
                  <span className="font-semibold text-white font-display">{currentRegion.name}</span>
                </div>
                <div className="flex justify-between items-center text-2xs">
                  <span className="text-neutral-500 font-mono">Ocean Transit:</span>
                  <span className="text-brand-300 font-mono font-medium">{currentRegion.transitTime}</span>
                </div>
                <div className="flex justify-between items-center text-2xs">
                  <span className="text-neutral-500 font-mono">Discharge Ports:</span>
                  <span className="text-neutral-300 font-mono text-right">{currentRegion.mainPorts}</span>
                </div>
              </div>

              <div className="mt-5">
                <button
                  type="button"
                  onClick={() => openQuote()}
                  className="w-full btn-primary text-2xs py-3 tracking-widest uppercase font-mono"
                >
                  Inquire Export Pricing for {currentRegion.name}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
