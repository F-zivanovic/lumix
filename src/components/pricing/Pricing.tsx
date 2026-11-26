'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import type { BillingPeriod, PricingPageContent, PricingPlan } from '@/content/types';
import { Container, Eyebrow, Icon } from '@/components/ui';
import { formatPrice } from '@/lib/salon-format';
import styles from './Pricing.module.css';

/** Cene za izabrani period: cena po mesecu, ukupno godišnje i ušteda. */
export function planPricing(plan: PricingPlan, period: BillingPeriod) {
  const savings = plan.monthlyPrice * 12 - plan.annualPrice;
  return period === 'annual'
    ? { perMonth: Math.round(plan.annualPrice / 12), total: plan.annualPrice, savings }
    : { perMonth: plan.monthlyPrice, total: plan.monthlyPrice, savings };
}

/**
 * Figma: Pricing. Klizač Monthly / Annually menja cene na svim karticama;
 * izbor se pamti u URL-u (?billing=monthly) i prenosi na registraciju.
 */
export function Pricing({ content }: { content: PricingPageContent }) {
  const [period, setPeriod] = useState<BillingPeriod>('annual');
  const b = content.billing;
  const money = (n: number) => `${formatPrice(n)} ${content.currency}`;

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get('billing') === 'monthly') setPeriod('monthly');
  }, []);

  const choose = (next: BillingPeriod) => {
    setPeriod(next);
    const url = new URL(window.location.href);
    if (next === 'monthly') url.searchParams.set('billing', 'monthly');
    else url.searchParams.delete('billing');
    window.history.replaceState(null, '', url);
  };

  const annual = period === 'annual';

  return (
    <section className={styles.section} aria-labelledby="pricing-title">
      <Container className={styles.inner}>
        <header className={styles.intro}>
          <Eyebrow tone="gradient">{content.eyebrow}</Eyebrow>
          <h1 id="pricing-title" className={styles.title}>
            {content.title}
            <br />
            <span className={styles.accent}>{content.titleAccent}</span>
          </h1>
          <p className={styles.description}>{content.description}</p>

          {/* ---------- Klizač Monthly / Annually ---------- */}
          <div className={styles.billing}>
            <button type="button" className={styles.periodLabel} aria-pressed={!annual} onClick={() => choose('monthly')}>
              {b.monthly}
            </button>
            <button
              type="button"
              role="switch"
              aria-checked={annual}
              aria-label={`${b.label}: ${b.annual}`}
              className={styles.switch}
              onClick={() => choose(annual ? 'monthly' : 'annual')}
            >
              <span className={styles.knob} aria-hidden />
            </button>
            <button type="button" className={styles.periodLabel} aria-pressed={annual} onClick={() => choose('annual')}>
              {b.annual}
            </button>
            <span className={styles.freeBadge}>{b.annualBadge}</span>
          </div>
        </header>

        <ul className={styles.plans}>
          {content.plans.map((plan) => {
            const p = planPricing(plan, period);
            return (
              <li key={plan.id} className={`${styles.card} ${plan.highlighted ? styles.featured : ''}`}>
                <div className={styles.cardHead}>
                  <h2 className={styles.planName}>{plan.name}</h2>
                  {plan.badge && <span className={styles.popular}>{plan.badge}</span>}
                </div>
                <p className={styles.planDescription}>{plan.description}</p>

                {/* key = period → kratka animacija pri promeni cene */}
                <div key={period} className={styles.priceBlock}>
                  <p className={styles.price}>
                    <span className={styles.amount}>{formatPrice(p.perMonth)}</span>
                    <span className={styles.unit}>
                      {' '}
                      {content.currency} {b.perMonth}
                    </span>
                  </p>
                  <p className={styles.billed}>
                    {annual ? b.billedAnnually.replace('{amount}', money(p.total)) : b.billedMonthly}
                  </p>
                  <p className={`${styles.save} ${annual ? '' : styles.saveHint}`}>
                    {(annual ? b.saveAnnual : b.saveIfAnnual).replace('{amount}', money(p.savings))}
                  </p>
                </div>

                <Link
                  href={`${content.signupHref}?plan=${plan.id}&billing=${period}`}
                  className={`${styles.cta} ${plan.highlighted ? styles.ctaPrimary : ''}`}
                >
                  <span>{plan.cta}</span>
                  {plan.highlighted && <Icon name="chevron-right" size={16} className={styles.ctaIcon} />}
                </Link>

                <ul className={styles.features}>
                  {plan.features.map((f) => (
                    <li key={f} className={styles.feature}>
                      <Icon name="check-lucide" size={16} className={styles.check} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
