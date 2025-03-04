
import { useEffect, useState, useRef, RefObject } from 'react';

/**
 * Hook to check if an element is in viewport
 */
export function useInView(ref: RefObject<HTMLElement>, options = {}) {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
        ...options,
      }
    );

    const currentRef = ref.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [ref, options]);

  return isInView;
}

/**
 * Animate elements when they come into view
 */
export function useAnimateOnScroll(ref: RefObject<HTMLElement>) {
  const isInView = useInView(ref);
  
  useEffect(() => {
    if (!ref.current) return;
    
    if (isInView) {
      ref.current.classList.add('is-visible');
    } else {
      ref.current.classList.remove('is-visible');
    }
  }, [isInView, ref]);
  
  return isInView;
}

/**
 * Type-safe animation variants for tailwind
 */
type AnimationVariant = 
  | 'fade-in' 
  | 'fade-out' 
  | 'slide-up' 
  | 'slide-down' 
  | 'scale-in'
  | 'float'
  | 'pulse-slow';

/**
 * Generate animation classes with optional stagger effect
 */
export const animate = (
  variant: AnimationVariant, 
  stagger?: 0 | 1 | 2 | 3
): string => {
  const baseClass = `animate-${variant}`;
  return stagger ? `${baseClass} stagger-${stagger}` : baseClass;
};
