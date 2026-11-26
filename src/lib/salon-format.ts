import type { OpeningHours, SalonPageContent } from '@/content/types';

/** "09:00" → "9 am", "21:30" → "9:30 pm" */
function formatTime(hhmm: string): string {
  const [h, m] = hhmm.split(':').map(Number);
  const suffix = h >= 12 && h < 24 ? 'pm' : 'am';
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}${m ? `:${String(m).padStart(2, '0')}` : ''} ${suffix}`;
}

/**
 * Sažetak radnog vremena: uzastopni dani sa istim vremenom se spajaju.
 * Npr. "Mon–Sat, 9 am–9 pm" ili "Mon–Fri, 10 am–6 pm · Sat, 10 am–3 pm".
 */
export function formatOpeningHours(hours: OpeningHours, t: Pick<SalonPageContent, 'weekdaysShort' | 'closed'>): string {
  const order = [1, 2, 3, 4, 5, 6, 0] as const; // nedelja počinje ponedeljkom
  const groups: { from: number; to: number; key: string }[] = [];
  for (const day of order) {
    const h = hours[day];
    const key = h ? `${h.open}-${h.close}` : '';
    const last = groups[groups.length - 1];
    if (last && last.key === key) last.to = day;
    else groups.push({ from: day, to: day, key });
  }
  const open = groups.filter((g) => g.key);
  if (!open.length) return t.closed;
  return open
    .map((g) => {
      const [o, c] = g.key.split('-');
      const days = g.from === g.to ? t.weekdaysShort[g.from] : `${t.weekdaysShort[g.from]}–${t.weekdaysShort[g.to]}`;
      return `${days}, ${formatTime(o)}–${formatTime(c)}`;
    })
    .join(' · ');
}

const priceFmt = new Intl.NumberFormat('en-US');
export const formatPrice = (value: number) => priceFmt.format(value);
