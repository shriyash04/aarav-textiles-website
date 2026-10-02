import { useEffect, useRef, useState, useCallback } from 'react';

/**
 * Hook that triggers a CSS class when an element enters the viewport.
 * Uses IntersectionObserver for performant scroll-based reveals.
 */
export function useReveal(
  threshold = 0.15,
  rootMargin = '0px 0px -60px 0px'
) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect prefers-reduced-motion
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return { ref, isVisible };
}

/**
 * Hook for staggered child reveals.
 * Returns a ref for the container and visibility state.
 */
export function useStaggerReveal(threshold = 0.1) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting || mq.matches) {
            entry.target.classList.add('is-visible');
            entry.target.setAttribute('data-revealed', 'true');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin: '0px 0px -40px 0px' }
    );

    const children = container.querySelectorAll('.reveal');
    children.forEach((child) => observer.observe(child));

    // Also observe the container to mark it as revealed for persistent child styling
    const containerObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting || mq.matches) {
          container.setAttribute('data-revealed', 'true');
          containerObserver.unobserve(container);
        }
      },
      { threshold: 0.05, rootMargin: '0px 0px -40px 0px' }
    );
    containerObserver.observe(container);

    return () => {
      observer.disconnect();
      containerObserver.disconnect();
    };
  }, [threshold]);

  return containerRef;
}

/**
 * Hook for detecting if user has scrolled past a threshold.
 * Used for navbar background transition.
 */
export function useScrolled(threshold = 50) {
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > threshold);
  }, [threshold]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return scrolled;
}
