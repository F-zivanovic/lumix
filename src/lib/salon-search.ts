/**
 * Logika pretrage salona — čiste funkcije bez React-a, pa se ista pravila mogu
 * koristiti i na serveru (API ruta) kada saloni budu dolazili iz baze.
 */
import type { BookingPageContent, CityId, DayPartId, QuickFilterId, Salon, ServiceId } from '@/content/types';

export interface Coords {
  lat: number;
  lng: number;
}

export type LocationCriterion = { kind: 'current' } | { kind: 'anywhere' } | { kind: 'city'; city: CityId };

export interface SearchCriteria {
  services: ServiceId[];
  location: LocationCriterion;
  /** Lokalni datum u formatu YYYY-MM-DD, ili `null` za bilo koji dan. */
  date: string | null;
  part: DayPartId;
}

export const defaultCriteria: SearchCriteria = {
  services: [],
  location: { kind: 'current' },
  date: null,
  part: 'any',
};

export interface SalonResult {
  salon: Salon;
  /** Udaljenost u km kada je poznata lokacija korisnika. */
  distanceKm: number | null;
}

interface FilterContext {
  coords: Coords | null;
  now: Date;
  dayParts: BookingPageContent['dayParts'];
  nearbyRadiusKm: number;
}

/* ---------- Datumi ---------- */

export function toISODate(d: Date): string {
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${m}-${day}`;
}

export function fromISODate(iso: string): Date {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d);
}

export function addDays(d: Date, days: number): Date {
  const copy = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  copy.setDate(copy.getDate() + days);
  return copy;
}

const toHours = (hhmm: string) => {
  const [h, m] = hhmm.split(':').map(Number);
  return h + m / 60;
};

/* ---------- Udaljenost ---------- */

export function distanceKm(a: Coords, b: Coords): number {
  const R = 6371;
  const rad = (x: number) => (x * Math.PI) / 180;
  const dLat = rad(b.lat - a.lat);
  const dLng = rad(b.lng - a.lng);
  const s = Math.sin(dLat / 2) ** 2 + Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(s));
}

/* ---------- Pravila ---------- */

/** Da li salon radi u izabranom terminu (dan i/ili doba dana). */
export function isOpenAt(salon: Salon, date: string | null, part: DayPartId, ctx: Pick<FilterContext, 'now' | 'dayParts'>): boolean {
  if (!date && part === 'any') return true;

  const range = part === 'any' ? { from: 0, to: 24 } : ctx.dayParts.find((p) => p.id === part) ?? { from: 0, to: 24 };
  const days = date ? [fromISODate(date).getDay()] : [0, 1, 2, 3, 4, 5, 6];
  const isToday = date === toISODate(ctx.now);
  const nowH = ctx.now.getHours() + ctx.now.getMinutes() / 60;

  return days.some((day) => {
    const hours = salon.hours[day as keyof Salon['hours']];
    if (!hours) return false;
    // Preklapanje radnog vremena i izabranog doba dana (za danas — samo ono što je još ispred nas)
    const from = Math.max(range.from, isToday ? nowH : 0);
    return toHours(hours.open) < range.to && toHours(hours.close) > from && from < range.to;
  });
}

export function filterSalons(
  salons: Salon[],
  criteria: SearchCriteria,
  quick: QuickFilterId,
  ctx: FilterContext,
): SalonResult[] {
  let results: SalonResult[] = salons.map((salon) => ({
    salon,
    distanceKm: ctx.coords ? distanceKm(ctx.coords, salon.coords) : null,
  }));

  // Pretraga (search bar)
  if (criteria.services.length) {
    results = results.filter(({ salon }) => salon.services.some((s) => criteria.services.includes(s)));
  }
  if (criteria.location.kind === 'city') {
    const { city } = criteria.location;
    results = results.filter(({ salon }) => salon.city === city);
  }
  results = results.filter(({ salon }) => isOpenAt(salon, criteria.date, criteria.part, ctx));

  // Brzi filteri
  switch (quick) {
    case 'nearby':
      if (ctx.coords) {
        results = results.filter((r) => r.distanceKm !== null && r.distanceKm <= ctx.nearbyRadiusKm);
      }
      break;
    case 'new':
      results = results.filter(({ salon }) => salon.isNew);
      break;
    case 'top':
      results = results.filter(({ salon }) => salon.rating >= 5);
      break;
    case 'reviewed':
      results = [...results].sort((a, b) => b.salon.reviews - a.salon.reviews);
      break;
  }

  // "Trenutna lokacija" i "U blizini": najbliži saloni prvi
  const byDistance = quick === 'nearby' || (quick !== 'reviewed' && criteria.location.kind === 'current');
  if (byDistance && ctx.coords) {
    results = [...results].sort((a, b) => (a.distanceKm ?? 0) - (b.distanceKm ?? 0));
  }
  return results;
}

export function hasActiveCriteria(c: SearchCriteria): boolean {
  return c.services.length > 0 || c.location.kind === 'city' || c.date !== null || c.part !== 'any';
}

/* ---------- URL (?services=hair,color&city=belgrade&date=2026-11-27&time=morning&filter=new) ---------- */

export function criteriaToSearchParams(c: SearchCriteria, quick: QuickFilterId): URLSearchParams {
  const p = new URLSearchParams();
  if (c.services.length) p.set('services', c.services.join(','));
  if (c.location.kind === 'city') p.set('city', c.location.city);
  if (c.location.kind === 'anywhere') p.set('location', 'anywhere');
  if (c.date) p.set('date', c.date);
  if (c.part !== 'any') p.set('time', c.part);
  if (quick !== 'all') p.set('filter', quick);
  return p;
}

export function criteriaFromSearchParams(
  p: URLSearchParams,
  content: Pick<BookingPageContent, 'services' | 'cities' | 'dayParts' | 'quickFilters'>,
): { criteria: SearchCriteria; quick: QuickFilterId } {
  const serviceIds = new Set(content.services.map((s) => s.id));
  const services = (p.get('services') ?? '').split(',').filter((s) => serviceIds.has(s));
  const city = p.get('city');
  const location: LocationCriterion =
    city && content.cities.some((c) => c.id === city)
      ? { kind: 'city', city }
      : p.get('location') === 'anywhere'
        ? { kind: 'anywhere' }
        : { kind: 'current' };
  const dateParam = p.get('date');
  const date = dateParam && /^\d{4}-\d{2}-\d{2}$/.test(dateParam) ? dateParam : null;
  const time = p.get('time');
  const part = (content.dayParts.find((d) => d.id === time)?.id ?? 'any') as DayPartId;
  const filter = p.get('filter');
  const quick = (content.quickFilters.find((q) => q.id === filter)?.id ?? 'all') as QuickFilterId;
  return { criteria: { services, location, date, part }, quick };
}

export function plural(forms: { one: string; other: string }, count: number): string {
  return (count === 1 ? forms.one : forms.other).replace('{count}', String(count));
}
