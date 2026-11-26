# Lumix Book — web sajt

Next.js 16 (App Router) + React 19 + TypeScript + CSS Modules. Bez UI frameworka:
sve vrednosti iz Figme su u dizajn tokenima, pa nema „magičnih brojeva“ po komponentama.

## Pokretanje

```bash
npm install
npm run dev            # http://localhost:3000
npm run build          # produkcija (Node server: Vercel, Netlify, VPS...)
npm run build:static   # čist statički sajt u /out (bilo koji hosting)
npm run typecheck
```

## Struktura

```
src/
  app/                    rute (layout.tsx = header + footer, page.tsx = početna)
  content/
    types.ts              model sadržaja (stranica = lista sekcija)
    en/site.ts            globalni sadržaj: navigacija, footer, društvene mreže
    en/home.ts            sadržaj početne stranice
  lib/content.ts          JEDINI pristup sadržaju (ovde se kasnije uključuje CMS)
  styles/tokens.css       boje, tipografija, razmaci, senke (nazivi prate Figmu)
  components/
    ui/                   Button, Eyebrow, Container, Icon
    layout/               Header (mobilni meni, izbor jezika), Footer
    sections/             Hero, Steps, Audience, Showcase, ClosingCta + SectionRenderer
    booking/              interaktivni demo booking widgeta
scripts/build-icons.mjs   generiše SVG ikonice iz Iconify setova
public/images/            slike iz Figme
```

## Kako se sajt menja i proširuje

**Izmena teksta** — samo `src/content/en/*.ts`. Komponente se ne diraju.

**Promena redosleda / uklanjanje sekcije** — premestite ili obrišite blok u `sections` nizu u `home.ts`.

**Nova sekcija**
1. tip u `content/types.ts` (i dodajte ga u `Section` uniju),
2. komponenta u `components/sections/NovaSekcija/`,
3. jedan `case` u `SectionRenderer.tsx` — TypeScript prijavljuje grešku dok ga ne dodate.

**Nova stranica** — novi fajl sadržaja (npr. `content/en/pricing.ts`), registracija u `lib/content.ts`
i ruta `app/pricing/page.tsx` koja radi isto što i `app/page.tsx`.

**Drugi jezik** — `content/sr/site.ts` + `content/sr/home.ts`, pa registracija u `lib/content.ts`.
Sledeći korak je ruta `app/[locale]/...`, a izbor jezika u headeru je već tu.

**CMS** (Sanity, Strapi, Payload...) — model sadržaja je već u formi blokova, kao u CMS-u.
Menja se samo telo funkcija `getPage` i `getSiteContent` u `lib/content.ts`.

**Nova ikonica** — dodajte je u listu u `scripts/build-icons.mjs` (bilo koja Iconify ikonica), pa `npm run icons`.

**Brend boje / font** — `src/styles/tokens.css`.

## Napomene

- Slike (`public/images`) su izvezene iz Figme u 1x rezoluciji. Za oštar prikaz na retina ekranima
  izvezite ih iz Figme u 2x (PNG/WebP) i zamenite fajlove pod istim imenima. Logo najbolje kao SVG.
- Ikonice su ekvivalenti iz Iconify setova (tabler, mdi, lucide, fluent, weui, remix). Imena Figma
  slojeva (`tabler:check`, `weui:arrow-filled`, `fluent:cursor-click-24-filled`) odgovaraju 1:1, a za
  ostale je izabran najbliži ekvivalent.
- Linkovi ka stranicama koje još ne postoje (`/pricing`, `/login`, `/signup`...) su već u sadržaju i
  počeće da rade čim te stranice budu dodate.
