'use client';

import { useEffect, useState } from 'react';
import styles from './ActivityCounter.module.css';

interface ActivityCounterProps {
  start: number;
  suffix: string;
  stepMs: number;
  steps: number;
}

/**
 * "103 appointments booked today" — brojač koji se okreće kao kolut (Figma motion:
 * pauza pa klizanje broja naviše sa ease-out). Bez animacije uz prefers-reduced-motion.
 */
export function ActivityCounter({ start, suffix, stepMs, steps }: ActivityCounterProps) {
  const [value, setValue] = useState(start);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let count = 0;
    const id = window.setInterval(() => {
      count += 1;
      setValue((v) => v + 1);
      if (count >= steps) window.clearInterval(id);
    }, stepMs);
    return () => window.clearInterval(id);
  }, [stepMs, steps]);

  return (
    <p className={styles.activity}>
      <span className={styles.dot} aria-hidden />
      <span className={styles.reel} aria-hidden>
        {value === start ? (
          <span className={styles.number}>{value}</span>
        ) : (
          <span key={value} className={styles.roll}>
            <span className={styles.number}>{value - 1}</span>
            <span className={styles.number}>{value}</span>
          </span>
        )}
      </span>
      <span className="visually-hidden">{value} </span>
      <span className={styles.suffix}>{suffix}</span>
    </p>
  );
}
