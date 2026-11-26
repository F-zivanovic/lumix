'use client';

import { useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import styles from './ScaleToFit.module.css';

interface ScaleToFitProps {
  width: number;
  height: number;
  children: ReactNode;
  className?: string;
}

/**
 * Prikazuje sadržaj u dizajnerskoj veličini (npr. 1153×675) i proporcionalno ga
 * smanjuje na užim ekranima — mockup ostaje piksel-veran na svakoj širini.
 */
export function ScaleToFit({ width, height, children, className }: ScaleToFitProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      setScale(Math.min(1, entry.contentRect.width / width));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [width]);

  return (
    <div ref={ref} className={[styles.outer, className].filter(Boolean).join(' ')} style={{ maxWidth: width, height: height * scale }}>
      <div className={styles.inner} style={{ width, height, transform: `scale(${scale})` }}>
        {children}
      </div>
    </div>
  );
}
