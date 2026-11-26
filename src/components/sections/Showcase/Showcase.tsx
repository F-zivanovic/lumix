import type { ShowcaseSection } from '@/content/types';
import { Container, Eyebrow } from '@/components/ui';
import { BookingWidgetPreview } from '@/components/booking/BookingWidgetPreview';
import { ScaleToFit } from '@/components/booking/ScaleToFit';
import { SectionHeading } from '../shared/SectionHeading';
import styles from './Showcase.module.css';

interface Props extends ShowcaseSection {
  logo: { src: string; alt: string };
}

export function Showcase({ id, eyebrow, title, description, widget, logo }: Props) {
  return (
    <section id={id} className={styles.section} aria-labelledby={`${id}-title`}>
      <Container className={styles.head}>
        <Eyebrow>{eyebrow}</Eyebrow>
        <SectionHeading id={`${id}-title`} gradient="light" size="lg" className={styles.title}>
          {title}
        </SectionHeading>
        <p className={styles.description}>{description}</p>
      </Container>

      <div className={styles.stage}>
        <Container>
          <ScaleToFit width={1153} height={675}>
            <BookingWidgetPreview content={widget} logo={logo} />
          </ScaleToFit>
        </Container>
      </div>
    </section>
  );
}
