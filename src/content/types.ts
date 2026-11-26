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
