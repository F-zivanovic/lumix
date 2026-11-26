import Image from 'next/image';
import type { HeroSection } from '@/content/types';
import { Button, Container } from '@/components/ui';
import styles from './Hero.module.css';

export function Hero({ id, title, description, ctas, image }: HeroSection) {
  return (
    <section id={id} className={styles.hero} aria-labelledby={`${id}-title`}>
      <span className={`${styles.glow} ${styles.glowLg}`} aria-hidden />
      <span className={`${styles.glow} ${styles.glowSm}`} aria-hidden />
      <Container className={styles.inner}>
        <div className={styles.copy}>
          <h1 id={`${id}-title`} className={styles.title}>
            {title}
          </h1>
          <p className={styles.description}>{description}</p>
          <div className={styles.ctas}>
            {ctas.map((c) => (
              <Button key={c.label} href={c.href} variant={c.variant} icon={c.icon} tone="hero">
                {c.label}
              </Button>
            ))}
          </div>
        </div>
        <div className={styles.media}>
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            priority
            sizes="(max-width: 960px) 92vw, 650px"
          />
        </div>
      </Container>
    </section>
  );
}
