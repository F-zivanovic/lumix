import type { SiteContent } from '../types';

export const site: SiteContent = {
  name: 'Lumix Book',
  logo: { src: '/images/lumix-logo.png', alt: 'Lumix Book', width: 129, height: 37 },
  nav: [
    { label: 'How It Works', href: '/#how-it-works' },
    { label: 'Who It’s For', href: '/#who-its-for' },
    { label: 'Product', href: '/#product' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Booking', href: '/booking' },
  ],
  languages: [
    { code: 'en', label: 'English' },
    { code: 'sr', label: 'Srpski' },
  ],
  login: { label: 'Login', href: '/login' },
  businessLogin: { label: 'Login for Businesses', href: '/business/login' },
  footer: {
    links: [
      { label: 'Who It’s For', href: '/#who-its-for' },
      { label: 'How It Works', href: '/#how-it-works' },
      { label: 'Product', href: '/#product' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Booking', href: '/booking' },
    ],
    activeHref: '/booking',
    social: [
      { label: 'X', href: 'https://x.com', icon: 'x' },
      { label: 'Facebook', href: 'https://facebook.com', icon: 'facebook' },
      { label: 'LinkedIn', href: 'https://linkedin.com', icon: 'linkedin' },
      { label: 'Instagram', href: 'https://instagram.com', icon: 'instagram' },
    ],
    legal: [
      { label: 'Privacy Policy', href: '/privacy-policy' },
      { label: 'Terms & Conditions', href: '/terms' },
    ],
  },
};
