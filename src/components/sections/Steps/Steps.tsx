import type { StepsSection } from '@/content/types';
import { Container, Eyebrow, Icon } from '@/components/ui';
import { SectionHeading } from '../shared/SectionHeading';
import styles from './Steps.module.css';

export function Steps({ id, eyebrow, title, items }: StepsSection) {
  return (
    <section id={id} className={styles.section} aria-labelledby={`${id}-title`}>
      <Container>
        <header className={styles.head}>
          <Eyebrow>{eyebrow}</Eyebrow>
          <SectionHeading id={`${id}-title`} gradient="light">
            {title}
          </SectionHeading>
        </header>
        <ol className={styles.grid}>
          {items.map((item) => (
            <li key={item.title} className={styles.card}>
              <Icon name={item.icon} size={40} className={styles.icon} />
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardText}>{item.description}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
