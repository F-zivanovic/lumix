import Image from 'next/image';
import Link from 'next/link';
import type { BookingPageContent, Salon } from '@/content/types';
import { Icon } from '@/components/ui';
import styles from './SalonCard.module.css';

interface SalonCardProps {
  salon: Salon;
  distanceKm: number | null;
  serviceLabels: Record<string, string>;
  t: BookingPageContent['results'];
  priority?: boolean;
}

export function SalonCard({ salon, distanceKm, serviceLabels, t, priority }: SalonCardProps) {
  return (
    <article className={styles.card} aria-labelledby={`salon-${salon.id}`}>
      <div className={styles.photo}>
        <Image
          src={salon.image.src}
          alt={salon.image.alt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 370px"
          className={styles.image}
          priority={priority}
        />
        {salon.isNew && <span className={styles.newBadge}>{t.newBadge}</span>}
        <span className={styles.rating}>
          <span className={styles.star} aria-hidden>
            ★
          </span>
          <strong>{salon.rating.toFixed(1)}</strong>
          <span className={styles.reviews}>({salon.reviews})</span>
        </span>
      </div>

      <div className={styles.info}>
        <div className={styles.identity}>
          <h3 id={`salon-${salon.id}`} className={styles.name}>
            {salon.name}
          </h3>
          <p className={styles.address}>
            {salon.address}
            {distanceKm !== null && (
              <span className={styles.distance}>
                {' · '}
                {distanceKm < 10 ? distanceKm.toFixed(1) : Math.round(distanceKm)} km {t.away}
              </span>
            )}
          </p>
        </div>
        <p className={styles.description}>{salon.description}</p>
        <ul className={styles.tags}>
          {salon.services.map((s) => (
            <li key={s} className={styles.tag}>
              {serviceLabels[s] ?? s}
            </li>
          ))}
        </ul>
        <Link href={`/booking/${salon.slug}`} className={styles.book}>
          <span>{t.book}</span>
          <span className="visually-hidden"> {salon.name}</span>
          <Icon name="chevron-right" size={16} className={styles.bookIcon} />
        </Link>
      </div>
    </article>
  );
}
