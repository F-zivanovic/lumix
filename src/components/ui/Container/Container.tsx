import type { ElementType, HTMLAttributes } from 'react';
import styles from './Container.module.css';

interface ContainerProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
}

export function Container({ as: Tag = 'div', className, ...rest }: ContainerProps) {
  return <Tag className={[styles.container, className].filter(Boolean).join(' ')} {...rest} />;
}
