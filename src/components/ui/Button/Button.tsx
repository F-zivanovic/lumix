import Link from 'next/link';
import type { ReactNode } from 'react';
import { Icon, type IconName } from '../Icon';
import styles from './Button.module.css';

type Variant = 'primary' | 'outline' | 'solid' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  icon?: IconName;
  /** Varijanta gradijenta za primary dugme (u Figmi se razlikuje po sekcijama). */
  tone?: 'hero' | 'default' | 'footer';
  className?: string;
}

const iconSizes: Partial<Record<IconName, { w: number; h: number }>> = {
  'arrow-filled': { w: 12, h: 24 },
  'chevron-right': { w: 16, h: 16 },
};

export function Button({
  href,
  children,
  variant = 'primary',
  size = 'lg',
  icon,
  tone = 'default',
  className,
}: ButtonProps) {
  const cls = [styles.btn, styles[variant], styles[size], variant === 'primary' && styles[`tone-${tone}`], icon && styles.hasIcon, className]
    .filter(Boolean)
    .join(' ');
  const dims = icon ? iconSizes[icon] ?? { w: 16, h: 16 } : null;
  return (
    <Link href={href} className={cls}>
      <span>{children}</span>
      {icon && dims && <Icon name={icon} width={dims.w} height={dims.h} className={styles.icon} />}
    </Link>
  );
}
