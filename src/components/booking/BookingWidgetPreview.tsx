'use client';

import Image from 'next/image';
import { useState } from 'react';
import type { BookingWidgetContent } from '@/content/types';
import { Icon } from '@/components/ui';
import styles from './BookingWidgetPreview.module.css';

interface Props {
  content: BookingWidgetContent;
  logo: { src: string; alt: string };
}

/**
 * Interaktivni demo booking widgeta (Figma: "Overlay 2").
 * Kada widget bude gotov, ova komponenta se menja pravim embed-om
 * bez ikakvih izmena u sekciji koja ga prikazuje.
 */
export function BookingWidgetPreview({ content, logo }: Props) {
  const [step, setStep] = useState(1);
  const [categoryId, setCategoryId] = useState(content.categories[0]?.id);
  const [selected, setSelected] = useState(0);
  const [query, setQuery] = useState('');

  const category = content.categories.find((c) => c.id === categoryId) ?? content.categories[0];
  const services = Array.from({ length: category?.services ?? 0 }, (_, i) => i);
  const lastStep = content.steps.length - 1;

  return (
    <div className={styles.widget} role="group" aria-label={`${content.title} — preview`}>
      <div className={styles.top}>
        <Image src={logo.src} alt={logo.alt} width={86} height={25} className={styles.logo} />
        <button type="button" className={styles.close} aria-label="Close" onClick={() => setStep(1)}>
          <Icon name="close" size={18} />
        </button>
      </div>

      <div className={styles.titleRow}>
        <h3 className={styles.title}>{content.title}</h3>
        <Icon name="globe" size={15} className={styles.globe} />
      </div>

      <div className={styles.body}>
        <div className={styles.main}>
          <ol className={styles.stepper}>
            {content.steps.map((s, i) => (
              <li
                key={s}
                className={styles.step}
                data-state={i < step ? 'done' : i === step ? 'active' : 'todo'}
                aria-current={i === step ? 'step' : undefined}
              >
                <span className={styles.dot} />
                <span className={styles.stepLabel}>{s}</span>
              </li>
            ))}
          </ol>

          <div className={styles.stepHead}>
            <div>
              <p className={styles.stepTitle}>{content.stepTitle}</p>
              <p className={styles.stepSubtitle}>{content.stepSubtitle}</p>
            </div>
            <label className={styles.search}>
              <Icon name="search" size={14} />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={content.searchPlaceholder}
                aria-label={content.searchPlaceholder}
              />
            </label>
          </div>

          <div className={styles.panel}>
            <ul className={styles.categories}>
              {content.categories.map((c) => (
                <li key={c.id}>
                  <button
                    type="button"
                    className={styles.category}
                    aria-pressed={c.id === categoryId}
                    onClick={() => {
                      setCategoryId(c.id);
                      setSelected(0);
                    }}
                  >
                    {c.label}
                  </button>
                </li>
              ))}
            </ul>

            <div className={styles.services} role="radiogroup" aria-label="Services">
              {services.map((i) => (
                <button
                  type="button"
                  role="radio"
                  aria-checked={selected === i}
                  key={`${categoryId}-${i}`}
                  className={styles.service}
                  onClick={() => setSelected(i)}
                >
                  <span className={styles.price}>£££</span>
                  <span className={`${styles.bar} ${styles.barLg}`} />
                  <span className={`${styles.bar} ${styles.barSm}`} />
                  <span className={styles.pill} />
                  <span className={styles.radio} />
                </button>
              ))}
            </div>
          </div>
        </div>

        <aside className={styles.side}>
          <div className={styles.details}>
            <p className={styles.detailsTitle}>{content.detailsTitle}</p>
            <ul className={styles.detailRows}>
              {content.detailsRows.slice(0, step).map((row, i) => (
                <li key={row} className={styles.detailRow}>
                  <span className={styles.detailIcon}>
                    <Icon name={i === 0 ? 'navigation' : 'check'} size={14} />
                  </span>
                  <span className={styles.detailText}>
                    <span className={styles.detailLabel}>{row}</span>
                    <span className={`${styles.dbar} ${styles.dbarLg}`} />
                    <span className={`${styles.dbar} ${styles.dbarSm}`} />
                  </span>
                  <button type="button" className={styles.edit} aria-label={`Edit ${row}`} onClick={() => setStep(i)}>
                    <Icon name="pencil" size={12} />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.actions}>
            <button type="button" className={styles.back} onClick={() => setStep((s) => Math.max(0, s - 1))}>
              {content.back}
            </button>
            <button type="button" className={styles.next} onClick={() => setStep((s) => (s >= lastStep ? 1 : s + 1))}>
              {content.next}
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
