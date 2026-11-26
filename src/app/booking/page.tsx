import type { Metadata } from 'next';
import { getBookingPage, getSalons } from '@/lib/content';
import { SalonFinder } from '@/components/salons/SalonFinder';
import { ClosingCta } from '@/components/sections/ClosingCta/ClosingCta';

export async function generateMetadata(): Promise<Metadata> {
  const page = await getBookingPage();
  return { title: page.meta.title, description: page.meta.description };
}

export default async function BookingPage() {
  const [page, salons] = await Promise.all([getBookingPage(), getSalons()]);
  return (
    <>
      <SalonFinder content={page} salons={salons} />
      <ClosingCta {...page.closing} />
    </>
  );
}
