import type { Metadata } from 'next';
import { getPricingPage } from '@/lib/content';
import { Pricing } from '@/components/pricing/Pricing';

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPricingPage();
  return { title: page.meta.title, description: page.meta.description };
}

export default async function PricingPage() {
  const page = await getPricingPage();
  return <Pricing content={page} />;
}
