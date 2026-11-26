import Link from 'next/link';
import { Fragment } from 'react';
import type { SiteContent } from '@/content/types';
import { Container, Icon } from '@/components/ui';
import styles from './Footer.module.css';

export function Footer({ site }: { site: SiteContent }) {
  const { footer } = site;
  return (
    <footer className={styles.footer}>
      <Container className={styles.nav}>
        <nav aria-label="Footer">
          <ul className={styles.links}>
            {footer.links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={styles.link}
                  aria-current={footer.activeHref === l.href ? 'page' : undefined}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <ul className={styles.social}>
          {footer.social.map((s) => (
            <li key={s.label}>
              <a href={s.href} target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label={s.label}>
                <Icon name={s.icon} size={20} />
              </a>
            </li>
          ))}
        </ul>
      </Container>
      <div className={styles.legal}>
        {footer.legal.map((l, i) => (
          <Fragment key={l.href}>
            {i > 0 && <span aria-hidden> | </span>}
            <Link href={l.href}>{l.label}</Link>
          </Fragment>
        ))}
      </div>
    </footer>
  );
}
