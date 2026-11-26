'use client';

import { useId, useState } from 'react';
import type { PricingSections } from '@/content/types';
import { Container, Eyebrow, Icon } from '@/components/ui';
import styles from './PricingFaq.module.css';

/** FAQ — harmonika; više pitanja može biti otvoreno istovremeno. */
export function PricingFaq({ content }: { content: PricingSections['faq'] }) {
  const [open, setOpen] = useState<Set<number>>(new Set());
  const baseId = useId();

  const toggle = (i: number) =>
    setOpen((cur) => {
      const next = new Set(cur);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  return (
    <section className={styles.section} aria-labelledby="faq-title">
      <Container className={styles.inner}>
        <div className={styles.intro}>
          <Eyebrow>{content.eyebrow}</Eyebrow>
          <h2 id="faq-title" className={styles.title}>
            {content.title}
          </h2>
        </div>
        <ul className={styles.list}>
          {content.items.map((item, i) => {
            const isOpen = open.has(i);
            return (
              <li key={item.question} className={styles.item}>
                <h3>
                  <button
                    type="button"
                    className={styles.question}
                    aria-expanded={isOpen}
                    aria-controls={`${baseId}-${i}`}
                    onClick={() => toggle(i)}
                  >
                    <span>{item.question}</span>
                    <Icon name="plus" size={16} className={styles.icon} />
                  </button>
                </h3>
                <div id={`${baseId}-${i}`} className={`${styles.answer} ${isOpen ? styles.answerOpen : ''}`} role="region" hidden={!isOpen}>
                  <p>{item.answer}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
