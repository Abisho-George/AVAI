'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './Reveal.module.css';

export type RevealProps = {
  children: React.ReactNode;
  /** Stagger within a group, in milliseconds. */
  delay?: number;
  className?: string;
};

/**
 * Settles content into place as it comes into view. Nothing bounces, nothing
 * moves twice: one fade and a short rise, then it is done and the observer
 * disconnects.
 *
 * Starts visible and is hidden by the effect, so a reader without JavaScript,
 * or one who has asked for less motion, gets the finished page rather than an
 * empty one waiting on an observer that never fires.
 */
export function Reveal({ children, delay = 0, className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(true);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    setShown(false);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={[styles.reveal, shown ? styles.shown : styles.hidden, className]
        .filter(Boolean)
        .join(' ')}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
