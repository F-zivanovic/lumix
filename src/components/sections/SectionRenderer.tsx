import type { Section, SiteContent } from '@/content/types';
import { Hero } from './Hero/Hero';
import { Steps } from './Steps/Steps';
import { Audience } from './Audience/Audience';
import { Showcase } from './Showcase/Showcase';
import { ClosingCta } from './ClosingCta/ClosingCta';

/**
 * Mapira blokove sadržaja na komponente. Redosled sekcija na stranici
 * određuje sadržaj (CMS), a ne kod.
 */
export function SectionRenderer({ sections, site }: { sections: Section[]; site: SiteContent }) {
  return (
    <>
      {sections.map((section) => {
        switch (section.type) {
          case 'hero':
            return <Hero key={section.id} {...section} />;
          case 'steps':
            return <Steps key={section.id} {...section} />;
          case 'audience':
            return <Audience key={section.id} {...section} />;
          case 'showcase':
            return <Showcase key={section.id} {...section} logo={site.logo} />;
          case 'closingCta':
            return <ClosingCta key={section.id} {...section} />;
          default: {
            const exhaustive: never = section;
            return exhaustive;
          }
        }
      })}
    </>
  );
}
