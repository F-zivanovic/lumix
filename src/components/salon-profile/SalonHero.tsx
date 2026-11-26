import Link from 'next/link';
import type { Salon, SalonPageContent } from '@/content/types';
import { Container, Icon } from '@/components/ui';
import { formatOpeningHours } from '@/lib/salon-format';
import styles from './SalonHero.module.css';

interface SalonHeroProps {
  salon: Salon;
  t: SalonPageContent;
  backHref: string;
  bookHref: string;
}

/** Figma: "Salon identity" — breadcrumb, naziv, adresa, radno vreme, ocena i CTA. */
export function SalonHero({ salon, t, backHref, bookHref }: SalonHeroProps) {
  return (
    <section className={styles.hero} aria-labelledby="salon-title">
      <Container className={styles.inner}>
        <nav aria-label="Breadcrumb">
          <ol className={styles.breadcrumb}>
            <li>
              <Link href={backHref} className={styles.back}>
                <Icon name="arrow-left" size={16} className={styles.icon} />
                {t.breadcrumb}
              </Link>
            </li>
            <li aria-hidden className={styles.sep}>
              /
            </li>
            <li aria-current="page" className={styles.currentCrumb}>
              {salon.name}
            </li>
          </ol>
        </nav>

        <div className={styles.overview}>
          <div className={styles.identity}>
            <h1 id="salon-title" className={styles.title}>
              {salon.name}
            </h1>
            <ul className={styles.details}>
              <li className={styles.detail}>
                <Icon name="map-pin" size={18} className={styles.icon} />
                <span>{salon.address}</span>
              </li>
              <li className={styles.divider} aria-hidden />
              <li className={styles.detail}>
                <Icon name="clock" size={18} className={styles.icon} />
                <span>{formatOpeningHours(salon.hours, t)}</span>
              </li>
              <li className={styles.divider} aria-hidden />
              <li className={styles.rating}>
                <span className={styles.star} aria-hidden>
                  ★
                </span>
                <strong>{salon.rating.toFixed(1)}</strong>
                <span className="visually-hidden"> / 5 ({salon.reviews})</span>
              </li>
            </ul>
          </div>

          <Link href={bookHref} className={styles.book}>
            <span>{t.bookCta}</span>
            <Icon name="arrow-up-right" size={18} className={styles.icon} />
          </Link>
        </div>
      </Container>
    </section>
  );
}
