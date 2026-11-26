'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import type { BookingPageContent, QuickFilterId, Salon } from '@/content/types';
import { Container, Icon } from '@/components/ui';
import {
  criteriaFromSearchParams,
  criteriaToSearchParams,
  defaultCriteria,
  filterSalons,
  hasActiveCriteria,
  plural,
  type SearchCriteria,
} from '@/lib/salon-search';
import { useGeolocation } from './useGeolocation';
import { SearchBar } from './SearchBar/SearchBar';
import { ActivityCounter } from './ActivityCounter';
import { SalonCard } from './SalonCard';
import styles from './SalonFinder.module.css';

interface SalonFinderProps {
  content: BookingPageContent;
  salons: Salon[];
}

/**
 * Booking stranica: pretraga (usluge · lokacija · vreme), brzi filteri i lista salona.
 * Primenjeni filteri se upisuju u URL (?services=…&city=…&date=…&time=…&filter=…),
 * pa se pretraga može podeliti linkom.
 */
export function SalonFinder({ content, salons }: SalonFinderProps) {
  const [draft, setDraft] = useState<SearchCriteria>(defaultCriteria);
  const [applied, setApplied] = useState<SearchCriteria>(defaultCriteria);
  const [quick, setQuick] = useState<QuickFilterId>('all');
  const [now, setNow] = useState<Date | null>(null);
  const geo = useGeolocation();
  const resultsRef = useRef<HTMLElement>(null);
  const hydrated = useRef(false);

  // Početno stanje iz URL-a (samo na klijentu — radi i sa statičkim exportom)
  useEffect(() => {
    const { criteria, quick: q } = criteriaFromSearchParams(new URLSearchParams(window.location.search), content);
    setDraft(criteria);
    setApplied(criteria);
    setQuick(q);
    setNow(new Date());
    if (q === 'nearby') geo.request();
    hydrated.current = true;
  }, []);

  useEffect(() => {
    if (!hydrated.current) return;
    const qs = criteriaToSearchParams(applied, quick).toString();
    window.history.replaceState(null, '', `${window.location.pathname}${qs ? `?${qs}` : ''}`);
  }, [applied, quick]);

  const results = useMemo(
    () =>
      filterSalons(salons, applied, quick, {
        coords: geo.coords,
        now: now ?? new Date(0),
        dayParts: content.dayParts,
        nearbyRadiusKm: content.nearbyRadiusKm,
      }),
    [salons, applied, quick, geo.coords, now, content.dayParts, content.nearbyRadiusKm],
  );

  const serviceLabels = useMemo(
    () => Object.fromEntries(content.services.map((s) => [s.id, s.label])),
    [content.services],
  );

  const filtersActive = hasActiveCriteria(applied) || quick !== 'all';
  const t = content.results;

  const submit = () => {
    setNow(new Date());
    setApplied(draft);
    resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const selectQuick = (id: QuickFilterId) => {
    if (id === 'nearby') geo.request();
    setQuick(id);
  };

  const clearAll = () => {
    setDraft(defaultCriteria);
    setApplied(defaultCriteria);
    setQuick('all');
  };

  return (
    <>
      {/* ---------- Figma: "Salon discovery" ---------- */}
      <section className={styles.discovery} aria-labelledby="booking-title">
        <Container className={styles.discoveryInner}>
          <div className={styles.intro}>
            <p className={styles.eyebrow}>{content.intro.eyebrow}</p>
            <h1 id="booking-title" className={styles.title}>
              {content.intro.title}
            </h1>
            <p className={styles.lead}>{content.intro.description}</p>
          </div>

          <SearchBar
            content={content}
            value={draft}
            onChange={setDraft}
            onSubmit={submit}
            geoStatus={geo.status}
            onRequestLocation={geo.request}
          />

          <ActivityCounter {...content.activity} />
        </Container>
      </section>

      {/* ---------- Figma: "Salon directory" ---------- */}
      <section ref={resultsRef} className={styles.directory} aria-label={content.search.label}>
        <Container className={styles.directoryInner}>
          <div className={styles.filters} role="group" aria-label="Filters">
            {content.quickFilters.map((f) => (
              <button
                key={f.id}
                type="button"
                className={styles.chip}
                aria-pressed={quick === f.id}
                onClick={() => selectQuick(f.id)}
              >
                <Icon name={f.icon} size={16} className={styles.chipIcon} />
                <span>{f.label}</span>
              </button>
            ))}
          </div>

          <div className={styles.summary}>
            <p className={styles.count} aria-live="polite">
              {plural(t.found, results.length)}
            </p>
            {filtersActive ? (
              <button type="button" className={styles.clear} onClick={clearAll}>
                <Icon name="close" size={14} />
                {t.clearFilters}
              </button>
            ) : (
              <p className={styles.hint}>{t.hint}</p>
            )}
          </div>

          {quick === 'nearby' && geo.status === 'denied' && (
            <p className={styles.notice} role="status">
              <Icon name="map-pin" size={16} />
              {t.nearbyDenied}
            </p>
          )}

          {results.length > 0 ? (
            <>
              <ul className={styles.grid}>
                {results.map(({ salon, distanceKm }, i) => (
                  <li key={salon.id} className={styles.gridItem}>
                    <SalonCard salon={salon} distanceKm={distanceKm} serviceLabels={serviceLabels} t={t} priority={i < 3} />
                  </li>
                ))}
              </ul>
              <p className={styles.footnote}>{plural(t.allShown, results.length)}</p>
            </>
          ) : (
            <div className={styles.empty}>
              <span className={styles.emptyIcon} aria-hidden>
                <Icon name="search-lucide" size={24} />
              </span>
              <h2 className={styles.emptyTitle}>{t.emptyTitle}</h2>
              <p className={styles.emptyText}>{t.emptyText}</p>
              <button type="button" className={styles.emptyBtn} onClick={clearAll}>
                {t.clearFilters}
              </button>
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
