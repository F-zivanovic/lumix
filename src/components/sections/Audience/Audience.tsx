import Image from 'next/image';
import type { AudienceSection } from '@/content/types';
import { Button, Container, Eyebrow, Icon } from '@/components/ui';
import { SectionHeading } from '../shared/SectionHeading';
import styles from './Audience.module.css';

export function Audience({ id, eyebrow, title, description, bullets, ctas, image }: AudienceSection) {
  return (
    <section id={id} className={styles.section} aria-labelledby={`${id}-title`}>
      <span className={`${styles.glow} ${styles.glowBl}`} aria-hidden />
      <span className={`${styles.glow} ${styles.glowTr}`} aria-hidden />
      <Container className={styles.inner}>
        <div className={styles.copy}>
          <Eyebrow tone="dark">{eyebrow}</Eyebrow>
          <SectionHeading id={`${id}-title`} className={styles.title}>
            {title}
          </SectionHeading>
          <div className={styles.card}>
            <p className={styles.description}>{description}</p>
            <ul className={styles.bullets}>
              {bullets.map((b) => (
                <li key={b}>
                  <Icon name="check" size={19.25} className={styles.check} />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <div className={styles.ctas}>
              {ctas.map((c) => (
                <Button key={c.label} href={c.href} variant={c.variant} icon={c.icon}>
                  {c.label}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.media}>
          <div className={styles.frame}>
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              sizes="(max-width: 960px) 92vw, 638px"
              className={styles.shot}
            />
            <Icon name="cursor-click" size={24} className={styles.cursor} />
          </div>
        </div>
      </Container>
    </section>
  );
}
