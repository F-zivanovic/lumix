'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import type { SiteContent } from '@/content/types';
import { Icon } from '@/components/ui';
import { LanguageSelect } from './LanguageSelect';
import styles from './Header.module.css';

interface HeaderProps {
  site: SiteContent;
  activeHref?: string;
}

export function Header({ site, activeHref }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo} aria-label={`${site.name} — home`}>
          <Image src={site.logo.src} alt={site.logo.alt} width={site.logo.width} height={site.logo.height} priority />
        </Link>

        <nav className={`${styles.nav} ${open ? styles.navOpen : ''}`} aria-label="Main">
          <ul className={styles.navList}>
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={styles.navLink}
                  aria-current={activeHref === item.href ? 'page' : undefined}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className={styles.actions}>
            <LanguageSelect languages={site.languages} />
            <Link href={site.login.href} className={styles.login}>
              {site.login.label}
            </Link>
            <Link href={site.businessLogin.href} className={styles.businessLogin}>
              {site.businessLogin.label}
            </Link>
          </div>
        </nav>

        <button
          type="button"
          className={styles.burger}
          aria-expanded={open}
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          <Icon name={open ? 'close' : 'menu'} size={26} />
        </button>
      </div>
    </header>
  );
}
