/**
 * Jedina tačka pristupa sadržaju. Komponente nikad ne uvoze sadržaj direktno.
 * Danas čita lokalne TS fajlove; sutra ovde ide fetch ka CMS-u ili bazi
 * (potpis funkcija ostaje isti, pa se ostatak aplikacije ne menja).
 */
import type { Locale, PageContent, SiteContent } from '@/content/types';
import { site as siteEn } from '@/content/en/site';
import { home as homeEn } from '@/content/en/home';

export const defaultLocale: Locale = 'en';

const sites: Partial<Record<Locale, SiteContent>> = { en: siteEn };
const pages: Partial<Record<Locale, Record<string, PageContent>>> = {
  en: { [homeEn.slug]: homeEn },
};

export async function getSiteContent(locale: Locale = defaultLocale): Promise<SiteContent> {
  return sites[locale] ?? siteEn;
}

export async function getPage(slug: string, locale: Locale = defaultLocale): Promise<PageContent | null> {
  return pages[locale]?.[slug] ?? pages[defaultLocale]?.[slug] ?? null;
}
