/**
 * Tipovi sadržaja. Svaka stranica je lista "blokova" (sekcija) — isti model
 * koji koriste headless CMS-ovi (Sanity, Strapi, Payload, Storyblok).
 * Novu sekciju dodajete: 1) tip ovde, 2) komponentu, 3) red u SectionRenderer-u.
 */
import type { IconName } from '@/components/ui/Icon/icons.generated';

export type Locale = 'en' | 'sr';

export interface Link {
  label: string;
  href: string;
}

export interface CtaLink extends Link {
  variant: 'primary' | 'outline';
  icon?: IconName;
}

export interface ImageAsset {
  src: string;
  alt: string;
  width: number;
  height: number;
}

/* ---------- Globalni sadržaj (header / footer) ---------- */

export interface SiteContent {
  name: string;
  logo: ImageAsset;
  nav: Link[];
  languages: { code: Locale; label: string }[];
  login: Link;
  businessLogin: Link;
  footer: {
    links: Link[];
    activeHref?: string;
    social: { label: string; href: string; icon: IconName }[];
    legal: Link[];
  };
}

/* ---------- Sekcije ---------- */

export interface HeroSection {
  type: 'hero';
  id: string;
  title: string;
  description: string;
  ctas: CtaLink[];
  image: ImageAsset;
}

export interface StepsSection {
  type: 'steps';
  id: string;
  eyebrow: string;
  title: string;
  items: { icon: IconName; title: string; description: string }[];
}

export interface AudienceSection {
  type: 'audience';
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  bullets: string[];
  ctas: CtaLink[];
  image: ImageAsset;
}

export interface ShowcaseSection {
  type: 'showcase';
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  widget: BookingWidgetContent;
}

export interface ClosingCtaSection {
  type: 'closingCta';
  id: string;
  title: string;
  description: string;
  ctas: CtaLink[];
}

export type Section =
  | HeroSection
  | StepsSection
  | AudienceSection
  | ShowcaseSection
  | ClosingCtaSection;

export interface PageContent {
  slug: string;
  meta: { title: string; description: string };
  sections: Section[];
}

/* ---------- Booking widget (demo) ---------- */

export interface BookingWidgetContent {
  title: string;
  steps: string[];
  stepTitle: string;
  stepSubtitle: string;
  searchPlaceholder: string;
  categories: { id: string; label: string; services: number }[];
  detailsTitle: string;
  detailsRows: string[];
  back: string;
  next: string;
}

/* ---------- Booking stranica (lista salona) ---------- */

export type ServiceId = string;
export type CityId = string;

/** Radno vreme po danu u nedelji: 0 = nedelja ... 6 = subota. `null` = zatvoreno. */
export type OpeningHours = Record<0 | 1 | 2 | 3 | 4 | 5 | 6, { open: string; close: string } | null>;

export interface Salon {
  id: string;
  slug: string;
  name: string;
  address: string;
  city: CityId;
  description: string;
  services: ServiceId[];
  rating: number;
  reviews: number;
  isNew: boolean;
  image: ImageAsset;
  coords: { lat: number; lng: number };
  hours: OpeningHours;
}

export type QuickFilterId = 'all' | 'nearby' | 'new' | 'top' | 'reviewed';
export type DayPartId = 'any' | 'morning' | 'afternoon' | 'evening';

export interface BookingPageContent {
  slug: string;
  meta: { title: string; description: string };
  intro: { eyebrow: string; title: string; description: string };
  search: {
    label: string;
    submit: string;
    services: {
      label: string;
      all: string;
      filterPlaceholder: string;
      noMatch: string;
      clear: string;
      done: string;
    };
    location: {
      label: string;
      current: string;
      currentHint: string;
      locating: string;
      denied: string;
      anywhere: string;
      citiesTitle: string;
    };
    time: {
      label: string;
      any: string;
      today: string;
      tomorrow: string;
      dateTitle: string;
      partTitle: string;
      clear: string;
      done: string;
      prevMonth: string;
      nextMonth: string;
    };
  };
  activity: { start: number; suffix: string; stepMs: number; steps: number };
  /** Usluge i gradovi po kojima se pretražuje (u CMS-u bi to bile referentne kolekcije). */
  services: { id: ServiceId; label: string }[];
  cities: { id: CityId; label: string; coords: { lat: number; lng: number } }[];
  dayParts: { id: Exclude<DayPartId, 'any'>; label: string; from: number; to: number; icon: IconName }[];
  quickFilters: { id: QuickFilterId; label: string; icon: IconName }[];
  nearbyRadiusKm: number;
  results: {
    /** `{count}` se menja brojem salona. */
    found: { one: string; other: string };
    hint: string;
    allShown: { one: string; other: string };
    emptyTitle: string;
    emptyText: string;
    clearFilters: string;
    nearbyDenied: string;
    book: string;
    newBadge: string;
    away: string;
  };
  closing: ClosingCtaSection;
  salonPage: SalonPageContent;
}

/* ---------- Stranica salona (/booking/[slug]) ---------- */

export type MediaKind = 'salon' | 'photos' | 'videos';

export interface SalonServiceItem {
  id: string;
  name: string;
  /** ID kategorije iz `SalonProfile.categories`. */
  category: string;
  durationMin: number;
  price: number;
}

export interface VideoAsset {
  src: string;
  poster: ImageAsset;
  title: string;
}

/** Detalji salona koji se prikazuju na njegovoj stranici (lista ga ne učitava). */
export interface SalonProfile {
  salonId: string;
  currency: string;
  categories: { id: string; label: string }[];
  services: SalonServiceItem[];
  gallery: {
    /** Fotografije prostora salona. */
    salon: ImageAsset[];
    /** Fotografije radova, po kategoriji usluge. */
    photos: { category: string; image: ImageAsset }[];
    videos: VideoAsset[];
  };
}

export interface SalonPageContent {
  breadcrumb: string;
  bookCta: string;
  servicesTitle: string;
  allCategory: string;
  allServices: string;
  /** `{count}` se menja brojem usluga. */
  servicesCount: { one: string; other: string };
  minutes: string;
  galleryTitle: string;
  media: Record<MediaKind, string>;
  emptyMedia: Record<MediaKind, string>;
  /** Npr. "Mon–Sat, 9 am–9 pm"; tekst kada je salon zatvoren ceo dan. */
  closed: string;
  weekdaysShort: [string, string, string, string, string, string, string];
}

/* ---------- Pricing stranica ---------- */

export type BillingPeriod = 'monthly' | 'annual';

export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  /** Cena pri mesečnom plaćanju (po mesecu). */
  monthlyPrice: number;
  /** Ukupna cena pri godišnjem plaćanju. */
  annualPrice: number;
  features: string[];
  cta: string;
  highlighted?: boolean;
  badge?: string;
}

export interface PricingPageContent {
  slug: string;
  meta: { title: string; description: string };
  eyebrow: string;
  title: string;
  titleAccent: string;
  description: string;
  currency: string;
  billing: {
    label: string;
    monthly: string;
    annual: string;
    /** Oznaka uz godišnje plaćanje, npr. "2 months FREE". */
    annualBadge: string;
    perMonth: string;
    /** `{amount}` = iznos sa valutom. */
    billedAnnually: string;
    billedMonthly: string;
    saveAnnual: string;
    saveIfAnnual: string;
  };
  signupHref: string;
  plans: PricingPlan[];
}
