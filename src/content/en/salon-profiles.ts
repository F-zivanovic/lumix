import type { ImageAsset, SalonProfile, SalonServiceItem } from '../types';

/**
 * Detalji salona za stranicu /booking/[slug] (usluge, cene, galerija).
 * U produkciji: API salona / CMS. Studio Aurora prati Figma ekran „Salon profile“.
 */

const img = (path: string, alt: string, width: number, height: number): ImageAsset => ({
  src: `/images/salons/${path}.jpg`,
  alt,
  width,
  height,
});
const interior = (path: string, alt: string) => img(path, alt, 1152, 928);
const work = (path: string, alt: string) => img(path, alt, 1376, 768);
const cover = (slug: string, alt: string) => img(slug, alt, 1264, 848);

/** Kratak zapis usluga: [naziv, trajanje u min, cena]. ID se pravi iz naziva. */
const list = (category: string, items: [string, number, number][]): SalonServiceItem[] =>
  items.map(([name, durationMin, price]) => ({
    id: `${category}-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`,
    name,
    category,
    durationMin,
    price,
  }));

const manicurePhotos = [
  work('studio-aurora/manicure-1', 'Close-up of hands with a fresh nude manicure'),
  work('studio-aurora/manicure-2', 'Nail technician painting a client’s nails'),
];

export const salonProfiles: SalonProfile[] = [
  {
    salonId: 'studio-aurora',
    currency: 'RSD',
    categories: [
      { id: 'manicure', label: 'Manicure' },
      { id: 'pedicure', label: 'Pedicure' },
      { id: 'hair', label: 'Hair' },
      { id: 'massage', label: 'Massage' },
    ],
    services: [
      ...list('manicure', [
        ['Classic manicure', 30, 1500],
        ['Gel polish', 45, 2200],
        ['Gel nail extensions', 90, 3500],
        ['Nail extensions', 60, 1800],
        ['Nail art (per nail)', 10, 200],
      ]),
      ...list('pedicure', [
        ['Pedicure', 50, 2500],
        ['Gel polish for toes', 40, 2000],
      ]),
      ...list('hair', [
        ['Women’s haircut', 45, 2000],
        ['Men’s haircut', 30, 1200],
        ['Blow-dry', 30, 1500],
        ['Hair coloring', 90, 4500],
        ['Balayage', 180, 9000],
        ['Occasion styling', 60, 4000],
        ['Keratin treatment', 120, 7000],
      ]),
      ...list('massage', [
        ['Relaxation massage', 60, 3000],
        ['Sports massage', 60, 3500],
      ]),
    ],
    gallery: {
      salon: [
        interior('studio-aurora/reception', 'Salon reception with a wooden desk and arched doorway'),
        interior('studio-aurora/styling-area', 'Styling area with arched mirrors and chairs'),
        interior('studio-aurora/nail-studio', 'Nail studio with round mirrors and shelves'),
        interior('studio-aurora/treatment-room', 'Treatment room with a massage bed'),
      ],
      photos: manicurePhotos.map((image) => ({ category: 'manicure', image })),
      videos: [],
    },
  },
  {
    salonId: 'pink-nails-lounge',
    currency: 'RSD',
    categories: [
      { id: 'manicure', label: 'Manicure' },
      { id: 'pedicure', label: 'Pedicure' },
    ],
    services: [
      ...list('manicure', [
        ['Classic manicure', 30, 1400],
        ['Gel polish', 45, 2000],
        ['Gel nail extensions', 90, 3300],
      ]),
      ...list('pedicure', [
        ['Pedicure', 50, 2300],
        ['Spa pedicure', 70, 3000],
      ]),
    ],
    gallery: {
      salon: [cover('pink-nails-lounge', 'Light nail lounge with white armchairs and plants')],
      photos: manicurePhotos.map((image) => ({ category: 'manicure', image })),
      videos: [],
    },
  },
  {
    salonId: 'barber-kralj',
    currency: 'RSD',
    categories: [
      { id: 'haircut', label: 'Haircut' },
      { id: 'beard', label: 'Beard' },
    ],
    services: [
      ...list('haircut', [
        ['Classic haircut', 30, 1200],
        ['Skin fade', 40, 1500],
        ['Kids haircut', 25, 900],
      ]),
      ...list('beard', [
        ['Beard trim', 20, 800],
        ['Straight-razor shave', 30, 1300],
      ]),
    ],
    gallery: {
      salon: [cover('barber-kralj', 'Dark wood barbershop with leather barber chairs')],
      photos: [],
      videos: [],
    },
  },
  {
    salonId: 'lotus-spa',
    currency: 'RSD',
    categories: [
      { id: 'massage', label: 'Massage' },
      { id: 'facial', label: 'Facial' },
    ],
    services: [
      ...list('massage', [
        ['Relaxation massage', 60, 3200],
        ['Deep tissue massage', 60, 3800],
        ['Hot stone massage', 75, 4200],
      ]),
      ...list('facial', [
        ['Hydrating facial', 50, 3500],
        ['Anti-age facial', 70, 4800],
      ]),
    ],
    gallery: {
      salon: [cover('lotus-spa', 'Candlelit spa room with a massage table')],
      photos: [],
      videos: [],
    },
  },
  {
    salonId: 'hair-atelier',
    currency: 'RSD',
    categories: [
      { id: 'hair', label: 'Hair' },
      { id: 'treatments', label: 'Treatments' },
    ],
    services: [
      ...list('hair', [
        ['Women’s haircut', 45, 2200],
        ['Men’s haircut', 30, 1300],
        ['Blow-dry', 30, 1500],
        ['Hair coloring', 90, 4800],
      ]),
      ...list('treatments', [
        ['Keratin treatment', 120, 7500],
        ['Scalp treatment', 40, 2500],
      ]),
    ],
    gallery: {
      salon: [cover('hair-atelier', 'Hair salon with round mirrors and cognac leather chairs')],
      photos: [],
      videos: [],
    },
  },
  {
    salonId: 'glow-beauty-bar',
    currency: 'RSD',
    categories: [
      { id: 'makeup', label: 'Makeup' },
      { id: 'brows-lashes', label: 'Brows & lashes' },
    ],
    services: [
      ...list('makeup', [
        ['Day makeup', 45, 2500],
        ['Evening makeup', 60, 3500],
      ]),
      ...list('brows-lashes', [
        ['Brow shaping', 20, 900],
        ['Lash lift', 50, 2800],
        ['Lash extensions', 90, 4500],
      ]),
    ],
    gallery: {
      salon: [cover('glow-beauty-bar', 'Beauty bar with illuminated mirrors and makeup stations')],
      photos: [],
      videos: [],
    },
  },
];
