/**
 * Jedina tačka pristupa sadržaju. Komponente nikad ne uvoze sadržaj direktno.
 * Danas čita lokalne TS fajlove; sutra ovde ide fetch ka CMS-u ili bazi
 * (potpis funkcija ostaje isti, pa se ostatak aplikacije ne menja).
 */
import type { BookingPageContent, Locale, PageContent, PricingPageContent, Salon, SalonProfile, SiteContent } from '@/content/types';
import { site as siteEn } from '@/content/en/site';
import { home as homeEn } from '@/content/en/home';
import { booking as bookingEn, salons as salonsEn } from '@/content/en/booking';
import { salonProfiles as salonProfilesEn } from '@/content/en/salon-profiles';
import { pricing as pricingEn } from '@/content/en/pricing';

export const defaultLocale: Locale = 'en';

const sites: Partial<Record<Locale, SiteContent>> = { en: siteEn };
const pages: Partial<Record<Locale, Record<string, PageContent>>> = {
  en: { [homeEn.slug]: homeEn },
};
const bookingPages: Partial<Record<Locale, BookingPageContent>> = { en: bookingEn };

export async function getSiteContent(locale: Locale = defaultLocale): Promise<SiteContent> {
  return sites[locale] ?? siteEn;
}

export async function getPage(slug: string, locale: Locale = defaultLocale): Promise<PageContent | null> {
  return pages[locale]?.[slug] ?? pages[defaultLocale]?.[slug] ?? null;
}

export async function getBookingPage(locale: Locale = defaultLocale): Promise<BookingPageContent> {
  return bookingPages[locale] ?? bookingEn;
}

/** Lista salona. Kada postoji backend, ovde ide `fetch('/api/salons')` ili upit ka bazi. */
export async function getSalons(_locale: Locale = defaultLocale): Promise<Salon[]> {
  return salonsEn;
}

/** Jedan salon sa detaljima za njegovu stranicu, ili `null` ako ne postoji. */
export async function getSalon(
  slug: string,
  locale: Locale = defaultLocale,
): Promise<{ salon: Salon; profile: SalonProfile } | null> {
  const salon = (await getSalons(locale)).find((s) => s.slug === slug);
  const profile = salon && salonProfilesEn.find((p) => p.salonId === salon.id);
  return salon && profile ? { salon, profile } : null;
}

export async function getPricingPage(_locale: Locale = defaultLocale): Promise<PricingPageContent> {
  return pricingEn;
}
