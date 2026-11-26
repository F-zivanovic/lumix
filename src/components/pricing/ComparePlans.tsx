import Link from 'next/link';
import type { BillingPeriod, CompareValue, PricingPageContent } from '@/content/types';
import { Container, Icon } from '@/components/ui';
import styles from './ComparePlans.module.css';

interface ComparePlansProps {
  content: PricingPageContent;
  period: BillingPeriod;
}

/** "Compare plans and find your fit." — tabela svih stavki po paketu. */
export function ComparePlans({ content, period }: ComparePlansProps) {
  const t = content.sections.compare;
  const { plans } = content;
  const featuredIndex = plans.findIndex((p) => p.highlighted);

  const cell = (v: CompareValue) =>
    v === true ? (
      <>
        <Icon name="check-lucide" size={16} className={styles.check} />
        <span className="visually-hidden">{t.included}</span>
      </>
    ) : v === false ? (
      <>
        <span className={styles.dash} aria-hidden>
          —
        </span>
        <span className="visually-hidden">{t.notIncluded}</span>
      </>
    ) : (
      <span className={v.toLowerCase().includes('add-on') ? styles.addon : styles.value}>{v}</span>
    );

  const colClass = (i: number) => (i === featuredIndex ? styles.featuredCol : '');

  return (
    <section className={styles.section} aria-labelledby="compare-title">
      <Container>
        <div className={styles.intro}>
          <h2 id="compare-title" className={styles.title}>
            {t.title}
          </h2>
          <p className={styles.description}>{t.description}</p>
        </div>

        <div className={styles.scroller}>
          <table className={styles.table}>
            <colgroup>
              <col className={styles.labelCol} />
              {plans.map((p) => (
                <col key={p.id} />
              ))}
            </colgroup>
            <thead>
              <tr>
                <th scope="col" className={styles.headLabel}>
                  {t.featuresLabel}
                </th>
                {plans.map((p, i) => (
                  <th key={p.id} scope="col" className={`${styles.headPlan} ${i === featuredIndex ? styles.headFeatured : ''}`}>
                    {p.name}
                  </th>
                ))}
              </tr>
            </thead>
            {t.groups.map((g) => (
              <tbody key={g.title}>
                <tr className={styles.groupRow}>
                  <th scope="colgroup" colSpan={plans.length + 1}>
                    {g.title}
                  </th>
                </tr>
                {g.rows.map((r) => (
                  <tr key={r.label} className={styles.row}>
                    <th scope="row" className={styles.rowLabel}>
                      {r.label}
                    </th>
                    {plans.map((p, i) => (
                      <td key={p.id} className={colClass(i)}>
                        {cell(r.values[i])}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            ))}
            <tfoot>
              <tr>
                <td />
                {plans.map((p, i) => (
                  <td key={p.id} className={styles.ctaCell}>
                    <Link
                      href={`${content.signupHref}?plan=${p.id}&billing=${period}`}
                      className={`${styles.cta} ${i === featuredIndex ? styles.ctaPrimary : ''}`}
                    >
                      <span>{p.cta}</span>
                      {i === featuredIndex && <Icon name="chevron-right" size={16} className={styles.ctaIcon} />}
                    </Link>
                  </td>
                ))}
              </tr>
            </tfoot>
          </table>
        </div>
      </Container>
    </section>
  );
}
