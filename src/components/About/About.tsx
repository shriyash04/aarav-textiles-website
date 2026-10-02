import { useStaggerReveal } from '../../hooks/useReveal';
import { images } from '../../lib/images';

const stats = [
  { value: '25+', label: 'Years of Experience' },
  { value: '18M+', label: 'Meters Annual Capacity' },
  { value: '35+', label: 'Export Markets' },
  { value: '98%', label: 'On-Time Dispatch' },
];

export default function About() {
  const containerRef = useStaggerReveal();

  return (
    <section id="about" className="py-24 lg:py-34 bg-white" aria-labelledby="about-heading">
      <div className="section-container" ref={containerRef}>
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Text column */}
          <div>
            <span className="reveal eyebrow">About Aarav Textiles</span>
            <h2
              id="about-heading"
              className="reveal reveal-delay-1 mt-5 font-display text-display-sm lg:text-display text-neutral-900"
            >
              Built for buyers who demand consistency.
            </h2>
            <div className="reveal reveal-delay-2 mt-6 lg:mt-8 space-y-4 text-body text-neutral-600 leading-relaxed">
              <p>
                Aarav Textiles is a vertically integrated textile manufacturer
                based in India, producing woven fabrics for apparel, workwear,
                home textile, and industrial applications.
              </p>
              <p>
                Our manufacturing infrastructure is built around consistency —
                tight process control from yarn selection through final
                inspection ensures every lot meets the same technical
                specification. We work with buyers who need reliable production
                volumes, accurate delivery schedules, and fabrics that perform
                under demanding conditions.
              </p>
              <p>
                With over two decades of manufacturing experience, our
                relationships with buyers are built on technical transparency,
                honest communication, and the kind of production reliability
                that only comes from deep process knowledge.
              </p>
            </div>
          </div>

          {/* Image column */}
          <div className="reveal reveal-delay-2 relative">
            <div className="overflow-hidden">
              <img
                src={images.cottonFabrics}
                alt="Premium cotton fabric rolls stacked on industrial shelving"
                className="w-full aspect-[4/3] object-cover transition-transform duration-700 ease-out-expo hover:scale-[1.03]"
                loading="lazy"
              />
            </div>
            {/* Accent border detail */}
            <div className="absolute -bottom-4 -right-4 w-32 h-32 border border-brand-300/50 -z-10 hidden lg:block" aria-hidden="true" />
          </div>
        </div>

        {/* Statistics */}
        <div className="mt-20 lg:mt-26 pt-16 border-t border-neutral-200">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className={`reveal reveal-delay-${i + 1}`}
              >
                <div className="font-display text-display-sm lg:text-display text-neutral-900">
                  {stat.value}
                </div>
                <div className="mt-2 text-body-sm text-neutral-500 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
          <p className="mt-8 text-2xs text-neutral-400 italic">
            * Figures shown are fictional and used for demonstration purposes only.
          </p>
        </div>
      </div>
    </section>
  );
}
