import styles from './Eyebrow.module.css';

interface EyebrowProps {
  children: string;
  tone?: 'light' | 'dark';
}

/** Mala "pill" oznaka iznad naslova sekcije. */
export function Eyebrow({ children, tone = 'light' }: EyebrowProps) {
  return <span className={`${styles.eyebrow} ${styles[tone]}`}>{children}</span>;
}
