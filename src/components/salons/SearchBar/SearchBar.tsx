'use client';

import { useEffect, useId, useRef, useState, type ReactNode } from 'react';
import type { BookingPageContent } from '@/content/types';
import { Icon, type IconName } from '@/components/ui';
import { addDays, fromISODate, toISODate, type SearchCriteria } from '@/lib/salon-search';
import type { GeoStatus } from '../useGeolocation';
import { ServicePanel } from './ServicePanel';
import { LocationPanel } from './LocationPanel';
import { TimePanel } from './TimePanel';
import styles from './SearchBar.module.css';

type PanelId = 'services' | 'location' | 'time';

interface SearchBarProps {
  content: BookingPageContent;
  value: SearchCriteria;
  onChange: (next: SearchCriteria) => void;
  onSubmit: () => void;
  geoStatus: GeoStatus;
  onRequestLocation: () => void;
}

/**
 * "Unified salon search" iz Figme: usluge · lokacija · vreme + dugme Search.
 * Izbor u panelima menja nacrt pretrage, a rezultati se osvežavaju na "Search".
 */
export function SearchBar({ content, value, onChange, onSubmit, geoStatus, onRequestLocation }: SearchBarProps) {
  const [open, setOpen] = useState<PanelId | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const { search } = content;

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(e.target as Node)) setOpen(null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      formRef.current?.querySelector<HTMLButtonElement>(`[data-panel="${open}"]`)?.focus();
      setOpen(null);
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const toggle = (id: PanelId) => setOpen((cur) => (cur === id ? null : id));
  const close = () => setOpen(null);

  return (
    <form
      ref={formRef}
      className={styles.bar}
      role="search"
      aria-label={search.label}
      onSubmit={(e) => {
        e.preventDefault();
        close();
        onSubmit();
      }}
    >
      <Criterion
        id="services"
        className={styles.service}
        icon="search-lucide"
        label={search.services.label}
        value={servicesLabel(content, value.services)}
        open={open === 'services'}
        onToggle={() => toggle('services')}
      >
        <ServicePanel
          content={content}
          selected={value.services}
          onChange={(services) => onChange({ ...value, services })}
          onDone={close}
        />
      </Criterion>

      <span className={styles.divider} aria-hidden />

      <Criterion
        id="location"
        className={styles.location}
        icon="map-pin"
        label={search.location.label}
        value={locationLabel(content, value.location, geoStatus)}
        open={open === 'location'}
        onToggle={() => toggle('location')}
      >
        <LocationPanel
          content={content}
          selected={value.location}
          geoStatus={geoStatus}
          onSelect={(location) => {
            if (location.kind === 'current') onRequestLocation();
            onChange({ ...value, location });
            close();
          }}
        />
      </Criterion>

      <span className={styles.divider} aria-hidden />

      <Criterion
        id="time"
        className={styles.time}
        icon="calendar-blank"
        label={search.time.label}
        value={timeLabel(content, value.date, value.part)}
        open={open === 'time'}
        onToggle={() => toggle('time')}
      >
        <TimePanel
          content={content}
          date={value.date}
          part={value.part}
          onChange={(date, part) => onChange({ ...value, date, part })}
          onDone={close}
        />
      </Criterion>

      <button type="submit" className={styles.submit}>
        {search.submit}
      </button>
    </form>
  );
}

/* ---------- Jedan kriterijum (dugme + padajući panel) ---------- */

interface CriterionProps {
  id: PanelId;
  className: string;
  icon: IconName;
  label: string;
  value: string;
  open: boolean;
  onToggle: () => void;
  children: ReactNode;
}

function Criterion({ id, className, icon, label, value, open, onToggle, children }: CriterionProps) {
  const panelId = useId();
  return (
    <div className={`${styles.criterion} ${className} ${open ? styles.criterionOpen : ''}`}>
      <button
        type="button"
        className={styles.trigger}
        data-panel={id}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        onClick={onToggle}
      >
        <Icon name={icon} className={styles.triggerIcon} />
        <span className="visually-hidden">{label}: </span>
        <span className={styles.value}>{value}</span>
      </button>
      {open && (
        <div id={panelId} className={styles.panel} role="dialog" aria-label={label}>
          {children}
        </div>
      )}
    </div>
  );
}

/* ---------- Tekst prikazan u polju ---------- */

function servicesLabel(content: BookingPageContent, ids: string[]): string {
  if (!ids.length) return content.search.services.all;
  const labels = content.services.filter((s) => ids.includes(s.id)).map((s) => s.label);
  return labels.length <= 2 ? labels.join(', ') : `${labels[0]} +${labels.length - 1}`;
}

function locationLabel(content: BookingPageContent, loc: SearchCriteria['location'], geo: GeoStatus): string {
  const t = content.search.location;
  if (loc.kind === 'anywhere') return t.anywhere;
  if (loc.kind === 'city') return content.cities.find((c) => c.id === loc.city)?.label ?? t.anywhere;
  return geo === 'locating' ? t.locating : t.current;
}

export function timeLabel(content: BookingPageContent, date: string | null, part: SearchCriteria['part']): string {
  const t = content.search.time;
  const partLabel = part === 'any' ? null : content.dayParts.find((p) => p.id === part)?.label ?? null;
  if (!date) return partLabel ?? t.any;
  const today = new Date();
  const dayLabel =
    date === toISODate(today)
      ? t.today
      : date === toISODate(addDays(today, 1))
        ? t.tomorrow
        : new Intl.DateTimeFormat('en-GB', { weekday: 'short', day: 'numeric', month: 'short' }).format(fromISODate(date));
  return partLabel ? `${dayLabel} · ${partLabel}` : dayLabel;
}
