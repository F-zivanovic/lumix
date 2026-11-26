import type { ReactNode } from 'react';
import styles from './SectionHeading.module.css';

interface SectionHeadingProps {
  id?: string;
  children: ReactNode;
  /** light = brand→ink, dark = brand→white, none = puna boja */
  gradient?: 'light' | 'dark' | 'none';
  size?: 'md' | 'lg';
  as?: 'h2' | 'h3';
  className?: string;
}

export function SectionHeading({
  id,
  children,
  gradient = 'none',
  size = 'md',
  as: Tag = 'h2',
  className,
}: SectionHeadingProps) {
  return (
    <Tag
      id={id}
      className={[styles.heading, styles[size], gradient !== 'none' && styles[gradient], className]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </Tag>
  );
}
