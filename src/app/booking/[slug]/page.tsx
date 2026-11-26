import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getBookingPage, getSalon, getSalons } from '@/lib/content';
import { SalonHero } from '@/components/salon-profile/SalonHero';
import { SalonServices } from '@/components/salon-profile/SalonServices';
import { ClosingCta } from '@/components/sections/ClosingCta/ClosingCta';

type Params = { slug: string };

/** Sve stranice salona se generišu unapred (radi i sa statičkim exportom). */
export async function generateStaticParams(): Promise<Params[]> {
  return (await getSalons()).map((s) => ({ slug: s.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const data = await getSalon((await params).slug);
  if (!data) return {};
  return { title: data.salon.name, description: `${data.salon.description} ${data.salon.address}.` };
}

export default async function SalonPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const [data, page] = await Promise.all([getSalon(slug), getBookingPage()]);
  if (!data) notFound();
  const { salon, profile } = data;
  // Sledeći korak (zakazivanje) — stranica još ne postoji
  const bookHref = `/booking/${salon.slug}/book`;

  return (
    <>
      <SalonHero salon={salon} t={page.salonPage} backHref="/booking" bookHref={bookHref} />
      <SalonServices salonName={salon.name} profile={profile} t={page.salonPage} bookHref={bookHref} />
      <ClosingCta {...page.closing} />
    </>
  );
}
