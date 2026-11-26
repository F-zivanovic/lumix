import type { NextConfig } from 'next';

// NEXT_OUTPUT=export → statički build (demo hosting, bez servera).
// Bez te promenljive → standardni Next.js server (API rute, CMS, ISR...).
const isStaticExport = process.env.NEXT_OUTPUT === 'export';

const nextConfig: NextConfig = {
  output: isStaticExport ? 'export' : undefined,
  images: { unoptimized: isStaticExport },
  reactStrictMode: true,
};

export default nextConfig;
