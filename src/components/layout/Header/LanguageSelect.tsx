'use client';

import { useEffect, useRef, useState } from 'react';
import type { Locale } from '@/content/types';
import { Icon } from '@/components/ui';
import styles from './Header.module.css';

interface LanguageSelectProps {
  languages: { code: Locale; label: string }[];
  current?: Locale;
}

/** Izbor jezika. Kada se uvede i18n ruting (/sr, /en), ovde ide navigacija. */
export function LanguageSelect({ languages, current = 'en' }: LanguageSelectProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<Locale>(current);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [open]);

  const selected = languages.find((l) => l.code === value) ?? languages[0];

  return (
    <div className={styles.lang} ref={ref}>
      <button
        type="button"
        className={styles.langTrigger}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <Icon name="globe" size={18} />
        <span>{selected.label}</span>
        <Icon name="chevron-down" size={12} className={open ? styles.chevronUp : undefined} />
      </button>
      {open && (
        <ul className={styles.langMenu} role="listbox" aria-label="Language">
          {languages.map((l) => (
            <li key={l.code}>
              <button
                type="button"
                role="option"
                aria-selected={l.code === value}
                className={styles.langOption}
                onClick={() => {
                  setValue(l.code);
                  setOpen(false);
                }}
              >
                {l.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
