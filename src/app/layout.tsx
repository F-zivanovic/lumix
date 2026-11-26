import type { Metadata, Viewport } from 'next';
import '@fontsource-variable/inter';
import './globals.css';
import { getSiteContent } from '@/lib/content';
import { Header } from '@/components/layout/Header/Header';
import { Footer } from '@/components/layout/Footer/Footer';

export const metadata: Metadata = {
  title: { default: 'Lumix Book', template: '%s — Lumix Book' },
  description: 'Online booking system for businesses that depend on appointments.',
};

export const viewport: Viewport = { themeColor: '#01121c' };

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const site = await getSiteContent();
  return (
    <html lang="en">
      <body>
        <Header site={site} />
        <main>{children}</main>
        <Footer site={site} />
      </body>
    </html>
  );
}
