import type { ClosingCtaSection } from '@/content/types';
import { Button, Container } from '@/components/ui';
import { SectionHeading } from '../shared/SectionHeading';
import styles from './ClosingCta.module.css';

export function ClosingCta({ id, title, description, ctas }: ClosingCtaSection) {
  return (
    <section id={id} className={styles.section} aria-labelledby={`${id}-title`}>
      <Container className={styles.inner}>
        <SectionHeading id={`${id}-title`} gradient="dark">
          {title}
        </SectionHeading>
        <p className={styles.description}>{description}</p>
        <div className={styles.ctas}>
          {ctas.map((c) => (
            <Button key={c.label} href={c.href} variant={c.variant} icon={c.icon} size="md" tone="footer">
              {c.label}
            </Button>
          ))}
        </div>
      </Container>
    </section>
  );
}
