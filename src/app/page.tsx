import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPage, getSiteContent } from '@/lib/content';
import { SectionRenderer } from '@/components/sections/SectionRenderer';

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage('/');
  return page ? { title: { absolute: page.meta.title }, description: page.meta.description } : {};
}

export default async function HomePage() {
  const [page, site] = await Promise.all([getPage('/'), getSiteContent()]);
  if (!page) notFound();
  return <SectionRenderer sections={page.sections} site={site} />;
}
