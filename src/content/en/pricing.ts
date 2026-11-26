import type { PricingPageContent } from '../types';

export const pricing: PricingPageContent = {
  slug: '/pricing',
  meta: {
    title: 'Pricing',
    description:
      'Simple, transparent pricing for salons. Every plan includes online booking, a professionally designed salon website, domain and hosting.',
  },
  eyebrow: 'Simple, transparent pricing',
  title: 'Everything your salon needs.',
  titleAccent: 'One simple price.',
  description:
    'Manage appointments, staff and clients in one place. Every plan includes a professionally designed salon website, with no extra setup fee.',
  currency: 'RSD',
  billing: {
    label: 'Billing period',
    monthly: 'Monthly',
    annual: 'Annually',
    annualBadge: '2 months FREE',
    perMonth: '/ mo',
    billedAnnually: '{amount} billed annually',
    billedMonthly: 'Billed monthly',
    saveAnnual: 'Save {amount} per year',
  },
  signupHref: '/signup',
  plans: [
    {
      id: 'starter',
      name: 'Starter',
      description: 'For independent professionals and small salons.',
      monthlyPrice: 3000,
      annualPrice: 30000,
      cta: 'Choose Starter',
      features: [
        '1 employee',
        '1 location',
        'Unlimited bookings',
        '24/7 online booking',
        'Calendar and appointment management',
        'Client database',
        'Website booking widget',
        'Professionally designed one-page website',
        'Domain and hosting included',
        'Basic analytics',
      ],
    },
    {
      id: 'growth',
      name: 'Growth',
      description: 'For growing salons that want better organization.',
      monthlyPrice: 5000,
      annualPrice: 50000,
      cta: 'Choose Growth',
      highlighted: true,
      badge: 'Most popular',
      features: [
        'Everything in Starter',
        'Up to 5 employees',
        '1 location',
        'Individual staff calendars',
        'Advanced analytics and reports',
        'Loyalty program',
        'Gift cards',
        'Professionally designed website',
        'Domain and hosting included',
      ],
    },
    {
      id: 'business',
      name: 'Business',
      description: 'For larger salons, clinics and multi-location businesses.',
      monthlyPrice: 8000,
      annualPrice: 80000,
      cta: 'Choose Business',
      features: [
        'Everything in Growth',
        'Up to 15 employees',
        'Up to 3 locations',
        'Multi-staff calendar management',
        'Analytics by location',
        'Advanced reports',
        'Loyalty program and gift cards',
        'Professionally designed website',
        'Domain and hosting included',
      ],
    },
  ],
  sections: {
    website: {
      eyebrow: 'More than booking software',
      title: 'Your new website?',
      titleAccent: 'Included.',
      description:
        'Every plan includes a professionally designed website tailored to your salon. Clients can explore your services and book directly on your site.',
      features: [
        { icon: 'palette', title: 'Designed for your salon', text: 'A website that reflects your brand.' },
        { icon: 'calendar-clock', title: '24/7 online booking', text: 'Clients can book an appointment at any time.' },
        {
          icon: 'badge-check',
          title: 'No extra website setup fee',
          text: 'Website development is included in your subscription, with a minimum 12-month commitment.',
        },
      ],
      note: 'Website scope depends on your chosen plan. Additional changes and features may be charged separately.',
    },
    compare: {
      title: 'Compare plans and find your fit.',
      description: 'All features in one place, making it easier to choose the right plan for your business.',
      featuresLabel: 'Features',
      included: 'Included',
      notIncluded: 'Not included',
      // Kolone: Starter, Growth, Business
      groups: [
        {
          title: 'Core features',
          rows: [
            { label: '24/7 online booking', values: [true, true, true] },
            { label: 'Unlimited bookings', values: [true, true, true] },
            { label: 'Appointment calendar', values: [true, true, true] },
            { label: 'Client database', values: [true, true, true] },
            { label: 'Booking widget', values: [true, true, true] },
          ],
        },
        {
          title: 'Staff and locations',
          rows: [
            { label: 'Number of employees', values: ['1', 'Up to 5', 'Up to 15'] },
            { label: 'Number of locations', values: ['1', '1', 'Up to 3'] },
            { label: 'Individual staff calendars', values: [false, true, true] },
          ],
        },
        {
          title: 'Analytics and loyalty',
          rows: [
            { label: 'Basic analytics', values: [true, true, true] },
            { label: 'Advanced reports', values: [false, true, true] },
            { label: 'Analytics by location', values: [false, false, true] },
            { label: 'Loyalty program', values: [false, true, true] },
            { label: 'Gift cards', values: [false, true, true] },
          ],
        },
        {
          title: 'Website',
          rows: [
            { label: 'Professionally designed website', values: [true, true, true] },
            { label: 'Domain and hosting', values: [true, true, true] },
            { label: 'Online booking integration', values: [true, true, true] },
            { label: 'Mobile optimization', values: [true, true, true] },
          ],
        },
        {
          title: 'Communication',
          rows: [
            { label: 'SMS reminders', values: ['Paid add-on', 'Paid add-on', 'Paid add-on'] },
            { label: 'WhatsApp reminders', values: ['Paid add-on', 'Paid add-on', 'Paid add-on'] },
          ],
        },
      ],
    },
    messages: {
      title: 'Only pay for messages you send.',
      description:
        'SMS and WhatsApp reminders are available with every plan and billed separately based on usage. Choose how many credits you want to buy.',
      note: 'Optional add-on, not included in your subscription. Message availability and pricing may vary by communication channel.',
      unit: 'messages',
      currency: '€',
      popularLabel: 'Popular',
      packs: [
        { messages: 50, price: 15 },
        { messages: 100, price: 29, popular: true },
        { messages: 250, price: 69 },
        { messages: 500, price: 129 },
      ],
    },
    faq: {
      eyebrow: 'FAQ',
      title: 'Frequently Asked Questions',
      // Odgovori nisu bili u dizajnu — tekst treba da potvrdi vlasnik proizvoda.
      items: [
        {
          question: 'Is website development really included?',
          answer:
            'Yes. Every plan includes a professionally designed website for your salon, with no extra setup fee. Starter includes a one-page website, while Growth and Business include a full salon website. Website development is included with a minimum 12-month commitment.',
        },
        {
          question: 'Is there a minimum contract commitment?',
          answer:
            'Yes. Because website development is included in every plan, subscriptions have a minimum commitment of 12 months.',
        },
        {
          question: 'Can I change my plan?',
          answer:
            'Yes. You can move to a larger plan at any time as your salon grows. Contact us and we will help you switch without losing your bookings or client data.',
        },
        {
          question: 'Do SMS and WhatsApp messages cost extra?',
          answer:
            'Yes. SMS and WhatsApp reminders are an optional add-on, billed separately based on usage. You buy message credits in packs, starting at 15 € for 50 messages.',
        },
        {
          question: 'What if I have more employees?',
          answer:
            'Business supports up to 15 employees and 3 locations. If your team is larger, contact us and we will prepare a plan that fits your business.',
        },
        {
          question: 'Are the domain and hosting included?',
          answer: 'Yes. Domain and hosting are included in every plan, so there is nothing extra to set up or pay for.',
        },
        {
          question: 'What happens after 12 months?',
          answer:
            'After the minimum 12-month period, your subscription continues on the same plan and billing period. You can change your plan at that point.',
        },
      ],
    },
    closing: {
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
  },
};
