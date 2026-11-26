'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { MediaKind, SalonPageContent, SalonProfile } from '@/content/types';
import { Container, Icon, type IconName } from '@/components/ui';
import { plural } from '@/lib/salon-search';
import { formatPrice } from '@/lib/salon-format';
import styles from './SalonServices.module.css';

interface SalonServicesProps {
  salonName: string;
  profile: SalonProfile;
  t: SalonPageContent;
  /** Link ka zakazivanju; `?service=<id>` se dodaje za izabranu uslugu. */
  bookHref: string;
}

const ALL = 'all';
const mediaIcons: Record<MediaKind, IconName> = { salon: 'building', photos: 'image', videos: 'video' };
const mediaOrder: MediaKind[] = ['salon', 'photos', 'videos'];

/**
 * Figma: "Services and gallery". Kategorija sužava listu usluga, a galerija tada
 * prelazi na fotografije radova iz te kategorije (Figma: "Manicure / Photos").
 * Izbor se upisuje u URL (?category=manicure&media=photos).
 */
export function SalonServices({ salonName, profile, t, bookHref }: SalonServicesProps) {
  const [category, setCategory] = useState<string>(ALL);
  const [media, setMedia] = useState<MediaKind>('salon');
  const hydrated = useRef(false);

  const counts = useMemo(() => {
    const map: Record<string, number> = {};
    for (const s of profile.services) map[s.category] = (map[s.category] ?? 0) + 1;
    return map;
  }, [profile.services]);

  const photosFor = (cat: string) =>
    profile.gallery.photos.filter((p) => cat === ALL || p.category === cat).map((p) => p.image);

  // Početno stanje iz URL-a
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const cat = p.get('category');
    const m = p.get('media') as MediaKind | null;
    if (cat && profile.categories.some((c) => c.id === cat)) setCategory(cat);
    if (m && mediaOrder.includes(m)) setMedia(m);
    hydrated.current = true;
  }, [profile.categories]);

  useEffect(() => {
    if (!hydrated.current) return;
    const p = new URLSearchParams();
    if (category !== ALL) p.set('category', category);
    if (media !== 'salon') p.set('media', media);
    const qs = p.toString();
    window.history.replaceState(null, '', `${window.location.pathname}${qs ? `?${qs}` : ''}`);
  }, [category, media]);

  const selectCategory = (id: string) => {
    setCategory(id);
    // Kao u Figmi: uz kategoriju galerija prikazuje radove iz nje (ako ih ima)
    setMedia(id !== ALL && photosFor(id).length ? 'photos' : 'salon');
  };

  const groups = profile.categories
    .filter((c) => category === ALL || c.id === category)
    .map((c) => ({ ...c, services: profile.services.filter((s) => s.category === c.id) }))
    .filter((g) => g.services.length);
  const visibleCount = groups.reduce((n, g) => n + g.services.length, 0);
  const currentLabel = category === ALL ? t.allServices : profile.categories.find((c) => c.id === category)?.label;

  const images = media === 'salon' ? profile.gallery.salon : media === 'photos' ? photosFor(category) : [];
  const videos = media === 'videos' ? profile.gallery.videos : [];

  const tabs = [{ id: ALL, label: t.allCategory, count: profile.services.length }].concat(
    profile.categories.map((c) => ({ id: c.id, label: c.label, count: counts[c.id] ?? 0 })),
  );

  return (
    <section className={styles.section} aria-labelledby="services-title">
      <Container className={styles.inner}>
        <div className={styles.intro}>
          <h2 id="services-title" className={styles.title}>
            {t.servicesTitle}
          </h2>
          <p className={styles.context}>{salonName}</p>
        </div>

        <div className={styles.tabs} role="group" aria-label={t.servicesTitle}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={styles.tab}
              aria-pressed={category === tab.id}
              onClick={() => selectCategory(tab.id)}
            >
              <span className={styles.tabLabel}>{tab.label}</span>
              <span className={styles.tabCount}>{tab.count}</span>
            </button>
          ))}
        </div>

        <div className={styles.layout}>
          {/* ---------- Usluge ---------- */}
          <div className={styles.directory}>
            <div className={styles.summary}>
              <h3 className={styles.subTitle}>{currentLabel}</h3>
              <p className={styles.meta} aria-live="polite">
                {plural(t.servicesCount, visibleCount)}
              </p>
            </div>

            {groups.map((g) => (
              <div key={g.id} className={styles.group}>
                <p className={styles.groupHeading}>
                  <span className={styles.groupName}>{g.label}</span>
                  <span className={styles.groupCount}>{g.services.length}</span>
                </p>
                <ul className={styles.list}>
                  {g.services.map((s) => (
                    <li key={s.id}>
                      <Link href={`${bookHref}?service=${encodeURIComponent(s.id)}`} className={styles.row}>
                        <span className={styles.serviceText}>
                          <span className={styles.serviceName}>{s.name}</span>
                          <span className={styles.duration}>
                            {s.durationMin} {t.minutes}
                          </span>
                        </span>
                        <span className={styles.price}>
                          {formatPrice(s.price)} <small>{profile.currency}</small>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* ---------- Galerija ---------- */}
          <div className={styles.gallery}>
            <div className={styles.summary}>
              <h3 className={styles.subTitle}>{t.galleryTitle}</h3>
              <div className={styles.media} role="group" aria-label={t.galleryTitle}>
                {mediaOrder.map((m) => (
                  <button
                    key={m}
                    type="button"
                    className={styles.mediaOption}
                    aria-pressed={media === m}
                    onClick={() => setMedia(m)}
                  >
                    <Icon name={mediaIcons[m]} size={15} />
                    {t.media[m]}
                  </button>
                ))}
              </div>
            </div>

            {images.length > 0 || videos.length > 0 ? (
              <ul className={styles.mediaList}>
                {images.map((image) => (
                  <li key={image.src} className={`${styles.frame} ${media === 'salon' ? styles.frameTall : ''}`}>
                    <Image src={image.src} alt={image.alt} fill sizes="(max-width: 1024px) 100vw, 420px" className={styles.photo} />
                  </li>
                ))}
                {videos.map((v) => (
                  <li key={v.src} className={styles.frame}>
                    <video className={styles.photo} src={v.src} poster={v.poster.src} controls preload="none" aria-label={v.title} />
                  </li>
                ))}
              </ul>
            ) : (
              <p className={styles.emptyMedia}>
                <Icon name={mediaIcons[media]} size={22} />
                {t.emptyMedia[media]}
              </p>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
