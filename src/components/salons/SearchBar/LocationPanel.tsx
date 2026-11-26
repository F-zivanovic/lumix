'use client';

import type { BookingPageContent } from '@/content/types';
import { Icon } from '@/components/ui';
import type { LocationCriterion } from '@/lib/salon-search';
import type { GeoStatus } from '../useGeolocation';
import styles from './SearchBar.module.css';

interface LocationPanelProps {
  content: BookingPageContent;
  selected: LocationCriterion;
  geoStatus: GeoStatus;
  onSelect: (location: LocationCriterion) => void;
}

/** Trenutna lokacija (geolokacija), sve lokacije ili grad. */
export function LocationPanel({ content, selected, geoStatus, onSelect }: LocationPanelProps) {
  const t = content.search.location;
  const currentHint = geoStatus === 'locating' ? t.locating : geoStatus === 'denied' ? t.denied : t.currentHint;

  return (
    <ul className={styles.options}>
      <li>
        <button
          type="button"
          className={`${styles.option} ${styles.optionRich}`}
          aria-pressed={selected.kind === 'current'}
          onClick={() => onSelect({ kind: 'current' })}
        >
          <span className={styles.optionIcon} aria-hidden>
            <Icon name="locate-fixed" size={18} />
          </span>
          <span className={styles.optionText}>
            <span>{t.current}</span>
            <small className={geoStatus === 'denied' ? styles.hintError : undefined}>{currentHint}</small>
          </span>
        </button>
      </li>
      <li>
        <button
          type="button"
          className={`${styles.option} ${styles.optionRich}`}
          aria-pressed={selected.kind === 'anywhere'}
          onClick={() => onSelect({ kind: 'anywhere' })}
        >
          <span className={styles.optionIcon} aria-hidden>
            <Icon name="map-pin" size={18} />
          </span>
          <span className={styles.optionText}>
            <span>{t.anywhere}</span>
          </span>
        </button>
      </li>

      <li className={styles.groupTitle} aria-hidden>
        {t.citiesTitle}
      </li>
      {content.cities.map((c) => (
        <li key={c.id}>
          <button
            type="button"
            className={styles.option}
            aria-pressed={selected.kind === 'city' && selected.city === c.id}
            onClick={() => onSelect({ kind: 'city', city: c.id })}
          >
            <span className={styles.check} aria-hidden>
              <Icon name="check-lucide" size={12} />
            </span>
            {c.label}
          </button>
        </li>
      ))}
    </ul>
  );
}
