import { useState, useEffect } from 'react';
import { useScrolled } from '../../hooks/useReveal';
import { useModal } from '../../context/ModalContext';

const navLinks = [
  { label: 'Products', href: '#products' },
  { label: 'Manufacturing', href: '#manufacturing' },
  { label: 'Quality', href: '#quality' },
  { label: 'About', href: '#about' },
];

export default function Navbar() {
  const scrolled = useScrolled(80);
  const [menuOpen, setMenuOpen] = useState(false);
  const { openQuote } = useModal();

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && menuOpen) {
        setMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen]);

  return (
    <header
      id="navbar"
      role="banner"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out-expo ${
        menuOpen
          ? 'bg-white border-b border-neutral-200 py-3.5'
          : scrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-neutral-200/80 py-3 shadow-xs'
          : 'bg-transparent py-5 lg:py-6'
      }`}
    >
      <nav className="section-container flex items-center justify-between" aria-label="Primary navigation">
        {/* Logo */}
        <a
          href="#"
          className={`relative z-50 font-display text-sm font-semibold tracking-[0.18em] uppercase transition-colors duration-300 ${
            scrolled || menuOpen ? 'text-neutral-900' : 'text-white'
          }`}
          aria-label="Aarav Textiles — Home"
        >
          AARAV TEXTILES
        </a>

        {/* Desktop nav */}
        <ul className="hidden lg:flex items-center gap-10" role="list">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`text-body-sm font-medium tracking-wide transition-colors duration-300 hover:text-accent ${
                  scrolled ? 'text-neutral-700' : 'text-white/85 hover:text-white'
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <button
          type="button"
          onClick={() => openQuote()}
          className={`hidden lg:inline-flex items-center gap-2 px-5 py-2.5 text-body-sm font-medium tracking-wide border transition-all duration-300 ease-out-expo ${
            scrolled
              ? 'border-neutral-900 text-neutral-900 hover:bg-neutral-900 hover:text-white'
              : 'border-white/70 text-white hover:bg-white hover:text-neutral-900'
          }`}
        >
          Request a Quote
        </button>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="relative z-50 flex lg:hidden flex-col items-center justify-center w-10 h-10 gap-1.5 focus-visible:outline-2 focus-visible:outline-accent"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        >
          <span
            className={`block h-[2px] w-6 transition-all duration-300 ease-out-expo origin-center ${
              menuOpen
                ? 'rotate-45 translate-y-[4px] bg-neutral-900'
                : scrolled
                ? 'bg-neutral-900'
                : 'bg-white'
            }`}
          />
          <span
            className={`block h-[2px] w-6 transition-all duration-300 ease-out-expo origin-center ${
              menuOpen
                ? '-rotate-45 -translate-y-[4px] bg-neutral-900'
                : scrolled
                ? 'bg-neutral-900'
                : 'bg-white'
            }`}
          />
        </button>
      </nav>

      {/* Mobile menu overlay */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 top-0 left-0 w-full h-dvh bg-white z-40 transition-all duration-300 ease-out-expo lg:hidden overflow-y-auto ${
          menuOpen ? 'opacity-100 pointer-events-auto visible' : 'opacity-0 pointer-events-none invisible'
        }`}
        aria-hidden={!menuOpen}
      >
        <div className="flex flex-col justify-between min-h-full w-full max-w-md mx-auto px-6 sm:px-8 pt-24 pb-8">
          <ul className="space-y-2" role="list">
            {navLinks.map((link, i) => (
              <li
                key={link.href}
                className="overflow-hidden"
                style={{ transitionDelay: menuOpen ? `${i * 50 + 100}ms` : '0ms' }}
              >
                <a
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`block py-3 text-2xl sm:text-3xl font-display font-semibold text-neutral-900 hover:text-accent border-b border-neutral-100 transition-all duration-300 ease-out-expo ${
                    menuOpen ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                  }`}
                  style={{ transitionDelay: menuOpen ? `${i * 50 + 100}ms` : '0ms' }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-8 pt-6 space-y-6">
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                openQuote();
              }}
              className={`w-full btn-primary text-center justify-center py-3.5 transition-all duration-300 ease-out-expo ${
                menuOpen ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
              }`}
              style={{ transitionDelay: menuOpen ? '300ms' : '0ms' }}
            >
              Request a Quote
            </button>

            <div
              className={`pt-6 border-t border-neutral-200 text-xs text-neutral-500 font-mono flex flex-col sm:flex-row sm:items-center justify-between gap-1 transition-all duration-300 ${
                menuOpen ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ transitionDelay: menuOpen ? '350ms' : '0ms' }}
            >
              <span>Aarav Textiles · Gujarat, India</span>
              <span>info@aaravtextiles.demo</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
