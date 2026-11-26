import type { PageContent } from '../types';

export const home: PageContent = {
  slug: '/',
  meta: {
    title: 'Lumix Book — Booking System, For Your Business',
    description:
      'The elegant way to schedule meetings & appointments, 24/7. Embed our smart scheduling widget and let your clients book online.',
  },
  sections: [
    {
      type: 'hero',
      id: 'hero',
      title: 'Booking System, For Your Business',
      description:
        'The elegant way to schedule meetings & appointments, 24/7. Embed our smart scheduling widget and let your clients book the right service, with the right provider, at the right time - make it easier for your clients.',
      ctas: [
        { label: 'Start Your One-Month Free Trial', href: '/signup', variant: 'primary' },
        { label: 'Request a Demo', href: '/demo', variant: 'outline' },
      ],
      image: {
        src: '/images/hero-laptop.png',
        alt: 'Laptop showing a beauty salon website with the Lumix Book booking widget open',
        width: 650,
        height: 433,
      },
    },
    {
      type: 'steps',
      id: 'how-it-works',
      eyebrow: 'How It Works',
      title: 'Simplify Your Scheduling. Elevate Your Brand.',
      items: [
        {
          icon: 'tools',
          title: 'Customize Your Setup',
          description:
            'Set up your locations, staff, and services, and adjust availability to fit your team’s workflow.',
        },
        {
          icon: 'link',
          title: 'Add the Widget or Grab a Link',
          description:
            'Embed a simple code snippet into your website and instantly enable online booking for your clients.',
        },
        {
          icon: 'calendar',
          title: 'Start Getting Bookings\n& Manage Your Clients',
          description:
            'Clients choose their location, provider, service, date & time, enter their details and your schedule updates automatically.',
        },
      ],
    },
    {
      type: 'audience',
      id: 'who-its-for',
      eyebrow: 'Who it’s for',
      title: 'Built for Businesses That Depend on Appointments',
      description:
        'Embed our booking widget or create a booking link and let clients schedule the right service, with the right provider, right on your phone or computer. Save time, reduce no-shows, and keep your team and clients organized.',
      bullets: [
        'Any business that needs scheduling',
        'Clinics, salons, restaurants, gyms, coaches, and more',
        'Multi-location and multi-staff organizations',
        'Customizable to your branding & needs',
      ],
      ctas: [
        { label: 'Start Free Trial', href: '/signup', variant: 'primary', icon: 'arrow-filled' },
        { label: 'Request a Demo', href: '/demo', variant: 'outline' },
      ],
      image: {
        src: '/images/dashboard-calendar.png',
        alt: 'Lumix Book booking widget — selecting a date and time',
        width: 638,
        height: 383,
      },
    },
    {
      type: 'showcase',
      id: 'product',
      eyebrow: 'connect it everywhere',
      title: 'Let Clients Book Your Services Anywhere They Go',
      description:
        'Booking should feel like a natural part of your business - not a use of the 3rd party platforms that are not suited for your business. Our widget embeds seamlessly into your existing web pages, and other platforms you want to use the booking link. Simple to set up, flexible for growing teams, and built to scale across locations and staff.',
      widget: {
        title: 'Book My Appointment',
        steps: ['Location', 'Service', 'Employee', 'Calendar', 'Details', 'Payment'],
        stepTitle: 'Select a Service',
        stepSubtitle: 'Choose the service you would like',
        searchPlaceholder: 'Search services',
        categories: [
          { id: 's1', label: 'Service 1', services: 3 },
          { id: 's2', label: 'Service 2', services: 2 },
          { id: 's3', label: 'Service 3', services: 4 },
        ],
        detailsTitle: 'Appointment Details',
        detailsRows: ['Location', 'Service', 'Employee', 'Date & Time', 'Details', 'Payment'],
        back: 'Back',
        next: 'Select',
      },
    },
    {
      type: 'closingCta',
      id: 'get-started',
      title: 'Ready to Simplify Your Scheduling?',
      description:
        'Set up your booking widget in minutes and start accepting appointments directly on your website.',
      ctas: [
        { label: 'Start Free Trial', href: '/signup', variant: 'primary', icon: 'chevron-right' },
        { label: 'Request a Demo', href: '/demo', variant: 'outline' },
      ],
    },
  ],
};
