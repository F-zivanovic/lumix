'use client';

import { useMemo, useState } from 'react';
import type { BookingPageContent, DayPartId } from '@/content/types';
import { Icon } from '@/components/ui';
import { addDays, fromISODate, toISODate } from '@/lib/salon-search';
import styles from './SearchBar.module.css';

interface TimePanelProps {
  content: BookingPageContent;
  date: string | null;
  part: DayPartId;
  onChange: (date: string | null, part: DayPartId) => void;
  onDone: () => void;
}

const MONTHS_AHEAD = 3;
const monthFmt = new Intl.DateTimeFormat('en-GB', { month: 'long', year: 'numeric' });
const weekdayFmt = new Intl.DateTimeFormat('en-GB', { weekday: 'short' });
const fullFmt = new Intl.DateTimeFormat('en-GB', { weekday: 'long', day: 'numeric', month: 'long' });

/** Izbor dana (brzi izbor + kalendar) i doba dana. */
export function TimePanel({ content, date, part, onChange, onDone }: TimePanelProps) {
  const t = content.search.time;
  const today = useMemo(() => new Date(), []);
  const todayISO = toISODate(today);
  const tomorrowISO = toISODate(addDays(today, 1));

  const initial = date ? fromISODate(date) : today;
  const [view, setView] = useState(() => new Date(initial.getFullYear(), initial.getMonth(), 1));

  const firstMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const lastMonth = new Date(today.getFullYear(), today.getMonth() + MONTHS_AHEAD, 1);
  const canPrev = view > firstMonth;
  const canNext = view < lastMonth;

  // Nedelja počinje ponedeljkom
  const offset = (view.getDay() + 6) % 7;
  const daysInMonth = new Date(view.getFullYear(), view.getMonth() + 1, 0).getDate();
  const weekdays = Array.from({ length: 7 }, (_, i) => weekdayFmt.format(new Date(2024, 0, 1 + i)).slice(0, 2));

  const quick: { label: string; value: string | null }[] = [
    { label: t.any, value: null },
    { label: t.today, value: todayISO },
    { label: t.tomorrow, value: tomorrowISO },
  ];

  const pickDate = (value: string | null) => {
    onChange(value, part);
    if (value) {
      const d = fromISODate(value);
      setView(new Date(d.getFullYear(), d.getMonth(), 1));
    }
  };

  return (
    <>
      <div className={styles.quickRow}>
        {quick.map((q) => (
          <button
            key={q.label}
            type="button"
            className={styles.pill}
            aria-pressed={date === q.value}
            onClick={() => pickDate(q.value)}
          >
            {q.label}
          </button>
        ))}
      </div>

      <div className={styles.calendar}>
        <div className={styles.calendarHead}>
          <button type="button" className={styles.navBtn} onClick={() => setView(new Date(view.getFullYear(), view.getMonth() - 1, 1))} disabled={!canPrev} aria-label={t.prevMonth}>
            <Icon name="chevron-left" size={16} />
          </button>
          <span className={styles.month} aria-live="polite">
            {monthFmt.format(view)}
          </span>
          <button type="button" className={styles.navBtn} onClick={() => setView(new Date(view.getFullYear(), view.getMonth() + 1, 1))} disabled={!canNext} aria-label={t.nextMonth}>
            <Icon name="chevron-right" size={16} />
          </button>
        </div>
        <div className={styles.grid} role="group" aria-label={t.dateTitle}>
          {weekdays.map((w) => (
            <span key={w} className={styles.weekday} aria-hidden>
              {w}
            </span>
          ))}
          {Array.from({ length: offset }, (_, i) => (
            <span key={`blank-${i}`} />
          ))}
          {Array.from({ length: daysInMonth }, (_, i) => {
            const d = new Date(view.getFullYear(), view.getMonth(), i + 1);
            const iso = toISODate(d);
            return (
              <button
                key={iso}
                type="button"
                className={`${styles.day} ${iso === todayISO ? styles.today : ''}`}
                aria-pressed={iso === date}
                aria-label={fullFmt.format(d)}
                disabled={iso < todayISO}
                onClick={() => pickDate(iso === date ? null : iso)}
              >
                {i + 1}
              </button>
            );
          })}
        </div>
      </div>

      <p className={styles.groupTitle}>{t.partTitle}</p>
      <div className={styles.partRow}>
        {content.dayParts.map((p) => (
          <button
            key={p.id}
            type="button"
            className={styles.part}
            aria-pressed={part === p.id}
            onClick={() => onChange(date, part === p.id ? 'any' : p.id)}
          >
            <Icon name={p.icon} size={16} />
            <span>{p.label}</span>
            <small>
              {String(p.from).padStart(2, '0')}–{String(p.to).padStart(2, '0')}h
            </small>
          </button>
        ))}
      </div>

      <div className={styles.panelFooter}>
        <button type="button" className={styles.linkBtn} onClick={() => onChange(null, 'any')} disabled={!date && part === 'any'}>
          {t.clear}
        </button>
        <button type="button" className={styles.doneBtn} onClick={onDone}>
          {t.done}
        </button>
      </div>
    </>
  );
}
