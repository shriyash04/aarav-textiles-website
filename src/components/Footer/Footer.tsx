import { useModal } from '../../context/ModalContext';

const footerLinks = {
  company: [
    { label: 'About', href: '#about' },
    { label: 'Manufacturing', href: '#manufacturing' },
    { label: 'Quality', href: '#quality' },
    { label: 'Request a Quote', isQuote: true },
  ],
  products: [
    { label: 'Cotton Fabrics', href: '#products' },
    { label: 'Blended Fabrics', href: '#products' },
    { label: 'Twill & Workwear', href: '#products' },
    { label: 'Home Textiles', href: '#products' },
    { label: 'Industrial Fabrics', href: '#products' },
    { label: 'Custom / Made-to-Spec', href: '#products' },
  ],
};

export default function Footer() {
  const { openQuote } = useModal();

  return (
    <footer
      className="bg-neutral-950 text-white pt-20 pb-10"
      role="contentinfo"
    >
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <a
              href="#"
              className="font-display text-sm font-semibold tracking-[0.15em] uppercase text-white"
              aria-label="Aarav Textiles — Home"
            >
              AARAV TEXTILES
            </a>
            <p className="mt-4 text-body-sm text-neutral-500 max-w-sm leading-relaxed">
              Engineered Fabrics. Reliable Supply.
            </p>
            <p className="mt-2 text-body-sm text-neutral-500 max-w-sm leading-relaxed">
              Vertically integrated textile manufacturer and exporter based in
              India, serving B2B buyers across four continents.
            </p>

            {/* Demo contact info */}
            <div className="mt-8 space-y-2">
              <p className="text-body-sm text-neutral-400">
                <span className="text-neutral-600 mr-2">Email</span>
                info@aaravtextiles.demo
              </p>
              <p className="text-body-sm text-neutral-400">
                <span className="text-neutral-600 mr-2">Phone</span>
                +91 98XXX XXXXX
              </p>
              <p className="text-body-sm text-neutral-400">
                <span className="text-neutral-600 mr-2">Location</span>
                Surat, Gujarat, India
              </p>
            </div>
          </div>

          {/* Company links */}
          <div>
            <h3 className="text-eyebrow uppercase tracking-widest text-neutral-600 font-medium">
              Company
            </h3>
            <ul className="mt-5 space-y-3" role="list">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  {link.isQuote ? (
                    <button
                      type="button"
                      onClick={() => openQuote()}
                      className="text-body-sm text-neutral-400 hover:text-white transition-colors duration-300"
                    >
                      {link.label}
                    </button>
                  ) : (
                    <a
                      href={link.href}
                      className="text-body-sm text-neutral-400 hover:text-white transition-colors duration-300"
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Product links */}
          <div>
            <h3 className="text-eyebrow uppercase tracking-widest text-neutral-600 font-medium">
              Products
            </h3>
            <ul className="mt-5 space-y-3" role="list">
              {footerLinks.products.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-body-sm text-neutral-400 hover:text-white transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-neutral-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-2xs text-neutral-600">
            &copy; {new Date().getFullYear()} Aarav Textiles. All rights reserved.
          </p>
          <p className="text-2xs text-neutral-700 italic">
            This is a demonstration website. All content, data, and contact
            information is fictional.
          </p>
        </div>
      </div>
    </footer>
  );
}
