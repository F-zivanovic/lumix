'use client';

import { useState } from 'react';
import type { BookingPageContent, ServiceId } from '@/content/types';
import { Icon } from '@/components/ui';
import styles from './SearchBar.module.css';

interface ServicePanelProps {
  content: BookingPageContent;
  selected: ServiceId[];
  onChange: (next: ServiceId[]) => void;
  onDone: () => void;
}

/** Višestruki izbor usluga, sa pretragom liste. */
export function ServicePanel({ content, selected, onChange, onDone }: ServicePanelProps) {
  const t = content.search.services;
  const [query, setQuery] = useState('');
  const q = query.trim().toLowerCase();
  const visible = content.services.filter((s) => s.label.toLowerCase().includes(q));

  const toggle = (id: ServiceId) =>
    onChange(selected.includes(id) ? selected.filter((s) => s !== id) : [...selected, id]);

  return (
    <>
      <label className={styles.panelSearch}>
        <Icon name="search-lucide" size={16} className={styles.panelSearchIcon} />
        <span className="visually-hidden">{t.filterPlaceholder}</span>
        <input
          type="search"
          value={query}
          placeholder={t.filterPlaceholder}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
        />
      </label>

      <ul className={styles.options}>
        {!q && (
          <li>
            <button
              type="button"
              className={styles.option}
              aria-pressed={selected.length === 0}
              onClick={() => onChange([])}
            >
              <span className={styles.check} aria-hidden>
                <Icon name="check-lucide" size={12} />
              </span>
              {t.all}
            </button>
          </li>
        )}
        {visible.map((s) => (
          <li key={s.id}>
            <button
              type="button"
              className={styles.option}
              aria-pressed={selected.includes(s.id)}
              onClick={() => toggle(s.id)}
            >
              <span className={styles.check} aria-hidden>
                <Icon name="check-lucide" size={12} />
              </span>
              {s.label}
            </button>
          </li>
        ))}
        {visible.length === 0 && <li className={styles.empty}>{t.noMatch}</li>}
      </ul>

      <div className={styles.panelFooter}>
        <button type="button" className={styles.linkBtn} onClick={() => onChange([])} disabled={!selected.length}>
          {t.clear}
        </button>
        <button type="button" className={styles.doneBtn} onClick={onDone}>
          {t.done}
        </button>
      </div>
    </>
  );
}
