import type { PricingSections } from '@/content/types';
import { Container, Eyebrow, Icon } from '@/components/ui';
import styles from './WebsiteIncluded.module.css';

/** "Your new website? Included." — tamna kartica sa tri prednosti. */
export function WebsiteIncluded({ content }: { content: PricingSections['website'] }) {
  return (
    <section className={styles.section} aria-labelledby="website-title">
      <Container>
        <div className={styles.card}>
          <Eyebrow tone="accent">{content.eyebrow}</Eyebrow>
          <h2 id="website-title" className={styles.title}>
            {content.title} <span className={styles.accent}>{content.titleAccent}</span>
          </h2>
          <p className={styles.description}>{content.description}</p>
          <ul className={styles.features}>
            {content.features.map((f) => (
              <li key={f.title} className={styles.feature}>
                <Icon name={f.icon} size={24} className={styles.icon} />
                <h3 className={styles.featureTitle}>{f.title}</h3>
                <p className={styles.featureText}>{f.text}</p>
              </li>
            ))}
          </ul>
          <p className={styles.note}>{content.note}</p>
        </div>
      </Container>
    </section>
  );
}
