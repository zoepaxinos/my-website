# Programa Marketing Site Design

## Overview

Build a prototyping sandbox at **pax.design** for the Programa marketing site. Enables visual page building with Sanity CMS, production-ready blocks from Figma, and a Figma → Code workflow for rapid iteration.

## Goals

1. Visual page building with Sanity Presentation tool
2. Production-ready blocks that developers can ship to programa.design
3. Figma → Code workflow: point at Figma component, generate React + Sanity schema
4. Design system tokens extracted from Figma

## Architecture

### Two Separate Projects

1. **Sanity Studio** - Hosted by Sanity at `programa.sanity.studio`
2. **Next.js Frontend** - Deployed to Vercel at `pax.design`

### Project Structure (Next.js)

```
/app
  /(site)
    /page.tsx                    → Homepage
    /[...slug]/page.tsx          → Dynamic pages from Sanity
  /api
    /draft-mode/enable/route.ts  → Enable preview for visual editing
    /draft-mode/disable/route.ts → Disable preview

/components
  /blocks                        → Page builder blocks (27 total)
    /CTA.tsx
    /BentoCard.tsx
    /Pricing.tsx
    /Testimonial.tsx
    /FeatureGrid.tsx
    /SimpleCardGrid.tsx
    /MediaCarousel.tsx
    /Stats.tsx
    /FAQ.tsx
    /Banner.tsx
    /TrustBadges.tsx
    /Image.tsx
    /GlobalSocialProof.tsx
    /Enquiries.tsx
    /Leadership.tsx
    /Partners.tsx
    /GridLearnPosts.tsx
    /CardsCarousel.tsx
    /FormSubscribe.tsx
    /CTABanner.tsx
    /NewsCarousel.tsx
    /FeatureSet.tsx
    /MadeWithPrograma.tsx
    /PopularHelpTopics.tsx
    /Testimonial4.tsx
    /FeatureGridLayout2.tsx
    /MainCTA.tsx
  /ui                            → Design system primitives
    /Button.tsx
    /IconButton.tsx
    /Link.tsx
    /Logo.tsx
    /Icon.tsx
  /layout
    /Header.tsx
    /Footer.tsx

/sanity
  /lib
    /client.ts                   → Sanity client config
    /queries.ts                  → GROQ queries
    /live.ts                     → Live content for visual editing

/lib
  /design-tokens.ts              → Tokens from Figma
```

### Sanity Project Structure

```
/schemas
  /documents
    /page.ts                     → Page document with blocks array
    /siteSettings.ts             → Global site settings
  /blocks
    /cta.ts
    /bentoCard.ts
    /pricing.ts
    /testimonial.ts
    ... (all 27 blocks)
  /objects
    /seo.ts
    /link.ts
    /image.ts
/sanity.config.ts                → Studio + Presentation tool config
```

## Design Tokens (from Figma)

### Colors

```typescript
colors: {
  foregrounds: {
    base: '#1a1916',
    subtle: '#7b736c',
    onColor: '#ffffff',
  },
  backgrounds: {
    muted: '#fcfbf9',
    tertiary: '#eeece6',
  },
  borders: {
    base: '#eeece6',
  },
  buttons: {
    yellow: '#fdffa2',
  }
}
```

### Typography

```typescript
typography: {
  families: {
    sans: 'Inter',
    display: 'Rhymes Display',
    mono: 'Roboto Mono',
  },
  sizes: {
    xs: '14px',
    'body-2': '16px',
    'body-1': '18px',
    l: '24px',
    h5: '37px',
    h3: '62px',
  },
  weights: {
    regular: 400,
    medium: 500,
  },
  lineHeights: {
    xs: '20px',
    s: '24px',
    l: '30px',
    h5: '37px',
    h3: '56px',
  }
}
```

### Spacing

```typescript
spacing: {
  4: '4px',
  12: '12px',
  20: '20px',
  32: '32px',
  60: '60px',
}
```

### Radius

```typescript
radius: {
  8: '8px',
  12: '12px',
  16: '16px',
}
```

### Effects

```typescript
effects: {
  'button-primary': 'shadow-[0px_0px_0px_1px_rgba(0,0,0,0.08),0px_1px_2px_rgba(0,0,0,0.12)]',
  'button-yellow': 'shadow-[0px_0px_0px_1px_rgba(229,225,146,0.8),0px_1px_2px_rgba(0,0,0,0.2)]',
  'bg-blur': 'backdrop-blur-[20px]',
}
```

## Sanity Schemas

### Page Document

```typescript
{
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    { name: 'title', type: 'string' },
    { name: 'slug', type: 'slug', options: { source: 'title' } },
    {
      name: 'blocks',
      type: 'array',
      of: [
        { type: 'cta' },
        { type: 'bentoCard' },
        { type: 'pricing' },
        { type: 'testimonial' },
        // ... all 27 block types
      ]
    },
    { name: 'seo', type: 'seo' }
  ]
}
```

### Block Schemas (Figma Variants → Sanity Fields)

| Block | Sanity Fields |
|-------|---------------|
| **CTA** | size (display/default), alignment (center/left), headline, subheadline, primaryCta, secondaryCta |
| **Bento Card** | style (default/contrast), cards[] with title, description, image |
| **Pricing** | type (default/enterprise), title, description, features[], price, billingPeriod, cta |
| **Testimonial** | quote, authorName, authorRole, location, video (optional) |
| **Feature Grid** | alignment (left/center), imagePosition (top/bottom), heading, features[] |
| **Simple Card Grid** | style (default/contrast), size (small/big), cards[] |
| **Media Carousel** | alignment (left/center), style (default/contrast), heading, items[] |
| **Stats** | stats[] with value, label |
| **FAQ** | heading, questions[] with question, answer |
| **Banner** | title, description, cta, backgroundImage, state (default/hover) |
| **Trust Badges** | heading, badges[] (predefined types) |
| **Image** | image, size (small/medium/large), alt |

## UI Components (from Figma)

| Component | Props |
|-----------|-------|
| **Button** | type (yellow/dark/white/dark-blur/white-blur/outline), size (xs/s/m/l) |
| **Icon Button** | type (primary/secondary), size (small-36/base-42/large-50), radius (rounded/full) |
| **Link** | type (primary/secondary) |
| **Logo** | style (primary/inverse/wordmark), type (full/icon), size (small-36/base-42/large-56) |
| **Icon** | size (xsmall-16/small-20/base-24/large-32) |
| **Header** | style (solid/blur) |

## Visual Editing Setup

### Required Packages

**Frontend (Next.js):**
- `@sanity/visual-editing` - Click-to-edit overlays
- `@sanity/client` - Fetch content
- `next-sanity` - Next.js integration

**Sanity Studio:**
- `sanity` - Core studio
- `@sanity/presentation` - Visual page builder

### Draft Mode Flow

1. Editor opens page in Presentation tool
2. Studio loads site in iframe with `?preview=true`
3. `@sanity/visual-editing` adds click-to-edit overlays
4. Edits in Studio → instant preview updates

### Presentation Tool Config

```typescript
// sanity.config.ts
import { presentationTool } from '@sanity/presentation'

export default defineConfig({
  plugins: [
    presentationTool({
      previewUrl: {
        draftMode: {
          enable: 'https://pax.design/api/draft-mode/enable',
        },
      },
    }),
  ],
})
```

## Figma → Code Workflow

```
User: "Build the Stats block"
           ↓
Claude: 1. Fetch design from Figma
        2. Extract variants, tokens, responsive behavior
        3. Generate:
           - /components/blocks/Stats.tsx
           - /sanity/schemas/blocks/stats.ts
        4. Block appears in Sanity Studio
           ↓
User: Compose pages in Sanity Studio
           ↓
Developers: Ship to programa.design
```

## Figma References

- **Design System**: https://www.figma.com/design/XBijmUzlHgM1s6dQmupKl4/Website-Design-System
  - Components page (node 0:1): UI primitives
  - Blocks page (node 27:70): Page builder blocks

## Tech Stack

| Layer | Technology |
|-------|------------|
| CMS | Sanity (hosted at programa.sanity.studio) |
| Frontend | Next.js 16 + React 19 + Tailwind v4 |
| Visual Editing | Sanity Presentation + @sanity/visual-editing |
| Design Tokens | CSS variables from Figma |
| Hosting | Vercel (pax.design) |

## Success Criteria

1. Editors can build pages visually without touching code
2. Blocks match Figma designs with 1:1 fidelity
3. All Figma variants are exposed as Sanity fields
4. Design tokens are consistent across all components
5. Code is production-ready for handoff to developers
