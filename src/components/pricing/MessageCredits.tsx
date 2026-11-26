import type { PricingSections } from '@/content/types';
import { Container, Icon } from '@/components/ui';
import styles from './MessageCredits.module.css';

/** "Only pay for messages you send." — paketi SMS / WhatsApp kredita. */
export function MessageCredits({ content }: { content: PricingSections['messages'] }) {
  return (
    <section className={styles.section} aria-labelledby="messages-title">
      <Container className={styles.inner}>
        <div className={styles.copy}>
          <Icon name="message-square" size={24} className={styles.icon} />
          <h2 id="messages-title" className={styles.title}>
            {content.title}
          </h2>
          <p className={styles.description}>{content.description}</p>
          <p className={styles.note}>{content.note}</p>
        </div>
        <ul className={styles.packs}>
          {content.packs.map((p) => (
            <li key={p.messages} className={`${styles.pack} ${p.popular ? styles.popular : ''}`}>
              <div className={styles.packHead}>
                <span className={styles.amount}>
                  {p.messages} {content.unit}
                </span>
                {p.popular && <span className={styles.badge}>{content.popularLabel}</span>}
              </div>
              <p className={styles.price}>
                {p.price} <span className={styles.currency}>{content.currency}</span>
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
