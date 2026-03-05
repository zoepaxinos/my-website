# Programa Marketing Site Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a visual page builder sandbox at pax.design using Sanity CMS with 27 Figma-matched blocks.

**Architecture:** Next.js 16 frontend with Sanity as headless CMS. Sanity Studio hosted separately at programa.sanity.studio. Visual editing via @sanity/visual-editing for live preview. Design tokens extracted from Figma as CSS variables.

**Tech Stack:** Next.js 16, React 19, Tailwind v4, Sanity v3, TypeScript

**Design Doc:** `docs/plans/2026-03-06-programa-marketing-site-design.md`

**Figma Reference:** https://www.figma.com/design/XBijmUzlHgM1s6dQmupKl4/Website-Design-System

---

## Phase 1: Project Setup

### Task 1: Install Sanity Dependencies

**Files:**
- Modify: `package.json`

**Step 1: Install Sanity packages**

Run:
```bash
npm install @sanity/client @sanity/visual-editing next-sanity
```

**Step 2: Verify installation**

Run: `npm ls @sanity/client`
Expected: Shows installed version

**Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: install Sanity dependencies"
```

---

### Task 2: Create Design Tokens

**Files:**
- Create: `lib/design-tokens.ts`
- Modify: `app/globals.css`

**Step 1: Create design tokens file**

Create `lib/design-tokens.ts`:
```typescript
export const tokens = {
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
    },
  },
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
    },
  },
  spacing: {
    4: '4px',
    12: '12px',
    20: '20px',
    32: '32px',
    60: '60px',
  },
  radius: {
    8: '8px',
    12: '12px',
    16: '16px',
  },
} as const;

export type Tokens = typeof tokens;
```

**Step 2: Add CSS variables to globals.css**

Add to top of `app/globals.css`:
```css
:root {
  /* Colors */
  --color-foreground-base: #1a1916;
  --color-foreground-subtle: #7b736c;
  --color-foreground-on-color: #ffffff;
  --color-background-muted: #fcfbf9;
  --color-background-tertiary: #eeece6;
  --color-border-base: #eeece6;
  --color-button-yellow: #fdffa2;

  /* Typography */
  --font-sans: 'Inter', sans-serif;
  --font-display: 'Rhymes Display', serif;
  --font-mono: 'Roboto Mono', monospace;

  /* Font Sizes */
  --text-xs: 14px;
  --text-body-2: 16px;
  --text-body-1: 18px;
  --text-l: 24px;
  --text-h5: 37px;
  --text-h3: 62px;

  /* Line Heights */
  --leading-xs: 20px;
  --leading-s: 24px;
  --leading-l: 30px;
  --leading-h5: 37px;
  --leading-h3: 56px;

  /* Spacing */
  --spacing-4: 4px;
  --spacing-12: 12px;
  --spacing-20: 20px;
  --spacing-32: 32px;
  --spacing-60: 60px;

  /* Radius */
  --radius-8: 8px;
  --radius-12: 12px;
  --radius-16: 16px;
}
```

**Step 3: Commit**

```bash
git add lib/design-tokens.ts app/globals.css
git commit -m "feat: add design tokens from Figma"
```

---

### Task 3: Setup Sanity Client

**Files:**
- Create: `sanity/lib/client.ts`
- Create: `sanity/lib/queries.ts`
- Create: `sanity/env.ts`

**Step 1: Create environment config**

Create `sanity/env.ts`:
```typescript
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01';
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '';

export const useCdn = false;
```

**Step 2: Create Sanity client**

Create `sanity/lib/client.ts`:
```typescript
import { createClient } from '@sanity/client';
import { apiVersion, dataset, projectId, useCdn } from '../env';

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn,
  perspective: 'published',
});

export const previewClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  perspective: 'previewDrafts',
  token: process.env.SANITY_API_READ_TOKEN,
});

export function getClient(preview = false) {
  return preview ? previewClient : client;
}
```

**Step 3: Create base queries**

Create `sanity/lib/queries.ts`:
```typescript
import { groq } from 'next-sanity';

export const pageBySlugQuery = groq`
  *[_type == "page" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    blocks[] {
      _type,
      _key,
      ...
    },
    seo
  }
`;

export const allPagesQuery = groq`
  *[_type == "page"] {
    _id,
    title,
    slug
  }
`;
```

**Step 4: Create .env.local template**

Create `.env.local.example`:
```
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_API_READ_TOKEN=
```

**Step 5: Add .env.local to .gitignore**

Verify `.env.local` is in `.gitignore` (it should be by default in Next.js).

**Step 6: Commit**

```bash
git add sanity/env.ts sanity/lib/client.ts sanity/lib/queries.ts .env.local.example
git commit -m "feat: setup Sanity client configuration"
```

---

### Task 4: Create Sanity Project

**Note:** This task requires manual Sanity account setup.

**Step 1: Create Sanity project (manual)**

Run:
```bash
npm create sanity@latest -- --project-name="programa" --dataset=production --output-path=sanity-studio
```

Select:
- Create new project
- Project name: programa
- Use default dataset configuration (production)
- TypeScript
- Clean project with no predefined schemas

**Step 2: Note the project ID**

After creation, note the project ID from the output. Add it to `.env.local`:
```
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
```

**Step 3: Commit studio scaffolding**

```bash
cd sanity-studio
git add .
git commit -m "chore: scaffold Sanity studio project"
```

---

## Phase 2: Sanity Schemas

### Task 5: Create Page Document Schema

**Files:**
- Create: `sanity-studio/schemaTypes/documents/page.ts`
- Modify: `sanity-studio/schemaTypes/index.ts`

**Step 1: Create page schema**

Create `sanity-studio/schemaTypes/documents/page.ts`:
```typescript
import { defineType, defineField } from 'sanity';

export const page = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'blocks',
      title: 'Page Blocks',
      type: 'array',
      of: [
        { type: 'cta' },
        { type: 'testimonial' },
        { type: 'pricing' },
        { type: 'faq' },
        // Add more block types as we create them
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug.current',
    },
    prepare({ title, slug }) {
      return {
        title,
        subtitle: `/${slug || ''}`,
      };
    },
  },
});
```

**Step 2: Create SEO object schema**

Create `sanity-studio/schemaTypes/objects/seo.ts`:
```typescript
import { defineType, defineField } from 'sanity';

export const seo = defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      description: 'Title for search engines (50-60 characters)',
      validation: (Rule) => Rule.max(60),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      description: 'Description for search engines (150-160 characters)',
      validation: (Rule) => Rule.max(160),
    }),
    defineField({
      name: 'ogImage',
      title: 'Social Share Image',
      type: 'image',
      description: 'Image for social media sharing (1200x630px recommended)',
    }),
  ],
});
```

**Step 3: Commit**

```bash
git add sanity-studio/schemaTypes/
git commit -m "feat: add page document and SEO schemas"
```

---

### Task 6: Create CTA Block Schema

**Files:**
- Create: `sanity-studio/schemaTypes/blocks/cta.ts`

**Step 1: Create CTA schema matching Figma variants**

Create `sanity-studio/schemaTypes/blocks/cta.ts`:
```typescript
import { defineType, defineField } from 'sanity';

export const cta = defineType({
  name: 'cta',
  title: 'CTA Block',
  type: 'object',
  fields: [
    defineField({
      name: 'size',
      title: 'Size',
      type: 'string',
      options: {
        list: [
          { title: 'Default', value: 'default' },
          { title: 'Display (Large)', value: 'display' },
        ],
        layout: 'radio',
      },
      initialValue: 'default',
    }),
    defineField({
      name: 'alignment',
      title: 'Alignment',
      type: 'string',
      options: {
        list: [
          { title: 'Center', value: 'center' },
          { title: 'Left', value: 'left' },
        ],
        layout: 'radio',
      },
      initialValue: 'center',
    }),
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subheadline',
      title: 'Subheadline',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'primaryCta',
      title: 'Primary Button',
      type: 'object',
      fields: [
        { name: 'label', title: 'Label', type: 'string' },
        { name: 'href', title: 'Link', type: 'url' },
      ],
    }),
    defineField({
      name: 'secondaryCta',
      title: 'Secondary Button',
      type: 'object',
      fields: [
        { name: 'label', title: 'Label', type: 'string' },
        { name: 'href', title: 'Link', type: 'url' },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'headline',
      size: 'size',
    },
    prepare({ title, size }) {
      return {
        title: title || 'CTA Block',
        subtitle: `Size: ${size || 'default'}`,
      };
    },
  },
});
```

**Step 2: Commit**

```bash
git add sanity-studio/schemaTypes/blocks/cta.ts
git commit -m "feat: add CTA block schema with Figma variants"
```

---

### Task 7: Create Testimonial Block Schema

**Files:**
- Create: `sanity-studio/schemaTypes/blocks/testimonial.ts`

**Step 1: Create testimonial schema**

Create `sanity-studio/schemaTypes/blocks/testimonial.ts`:
```typescript
import { defineType, defineField } from 'sanity';

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial Block',
  type: 'object',
  fields: [
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'authorName',
      title: 'Author Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'authorRole',
      title: 'Author Role',
      type: 'string',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'City, Country',
    }),
    defineField({
      name: 'video',
      title: 'Video',
      type: 'object',
      fields: [
        { name: 'thumbnail', title: 'Thumbnail', type: 'image' },
        { name: 'url', title: 'Video URL', type: 'url' },
      ],
    }),
  ],
  preview: {
    select: {
      quote: 'quote',
      author: 'authorName',
    },
    prepare({ quote, author }) {
      return {
        title: author || 'Testimonial',
        subtitle: quote?.substring(0, 50) + '...',
      };
    },
  },
});
```

**Step 2: Commit**

```bash
git add sanity-studio/schemaTypes/blocks/testimonial.ts
git commit -m "feat: add testimonial block schema"
```

---

### Task 8: Create Pricing Block Schema

**Files:**
- Create: `sanity-studio/schemaTypes/blocks/pricing.ts`

**Step 1: Create pricing schema matching Figma**

Create `sanity-studio/schemaTypes/blocks/pricing.ts`:
```typescript
import { defineType, defineField } from 'sanity';

export const pricing = defineType({
  name: 'pricing',
  title: 'Pricing Block',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Section Heading',
      type: 'string',
    }),
    defineField({
      name: 'tiers',
      title: 'Pricing Tiers',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'pricingTier',
          fields: [
            defineField({
              name: 'type',
              title: 'Tier Type',
              type: 'string',
              options: {
                list: [
                  { title: 'Default', value: 'default' },
                  { title: 'Enterprise', value: 'enterprise' },
                ],
              },
              initialValue: 'default',
            }),
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 2,
            }),
            defineField({
              name: 'price',
              title: 'Price',
              type: 'string',
              description: 'e.g., "$149" or "Custom"',
            }),
            defineField({
              name: 'billingPeriod',
              title: 'Billing Period',
              type: 'string',
              description: 'e.g., "per month"',
            }),
            defineField({
              name: 'features',
              title: 'Features',
              type: 'array',
              of: [{ type: 'string' }],
            }),
            defineField({
              name: 'cta',
              title: 'CTA Button',
              type: 'object',
              fields: [
                { name: 'label', title: 'Label', type: 'string' },
                { name: 'href', title: 'Link', type: 'url' },
              ],
            }),
            defineField({
              name: 'highlighted',
              title: 'Highlight This Tier',
              type: 'boolean',
              initialValue: false,
            }),
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      heading: 'heading',
      tiers: 'tiers',
    },
    prepare({ heading, tiers }) {
      return {
        title: heading || 'Pricing',
        subtitle: `${tiers?.length || 0} tiers`,
      };
    },
  },
});
```

**Step 2: Commit**

```bash
git add sanity-studio/schemaTypes/blocks/pricing.ts
git commit -m "feat: add pricing block schema with tier variants"
```

---

### Task 9: Create FAQ Block Schema

**Files:**
- Create: `sanity-studio/schemaTypes/blocks/faq.ts`

**Step 1: Create FAQ schema**

Create `sanity-studio/schemaTypes/blocks/faq.ts`:
```typescript
import { defineType, defineField } from 'sanity';

export const faq = defineType({
  name: 'faq',
  title: 'FAQ Block',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Section Heading',
      type: 'string',
    }),
    defineField({
      name: 'questions',
      title: 'Questions',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'faqItem',
          fields: [
            defineField({
              name: 'question',
              title: 'Question',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'answer',
              title: 'Answer',
              type: 'text',
              rows: 4,
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { title: 'question' },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      heading: 'heading',
      questions: 'questions',
    },
    prepare({ heading, questions }) {
      return {
        title: heading || 'FAQ',
        subtitle: `${questions?.length || 0} questions`,
      };
    },
  },
});
```

**Step 2: Commit**

```bash
git add sanity-studio/schemaTypes/blocks/faq.ts
git commit -m "feat: add FAQ block schema"
```

---

### Task 10: Register All Schemas

**Files:**
- Modify: `sanity-studio/schemaTypes/index.ts`

**Step 1: Export all schemas**

Update `sanity-studio/schemaTypes/index.ts`:
```typescript
// Documents
import { page } from './documents/page';

// Objects
import { seo } from './objects/seo';

// Blocks
import { cta } from './blocks/cta';
import { testimonial } from './blocks/testimonial';
import { pricing } from './blocks/pricing';
import { faq } from './blocks/faq';

export const schemaTypes = [
  // Documents
  page,
  // Objects
  seo,
  // Blocks
  cta,
  testimonial,
  pricing,
  faq,
];
```

**Step 2: Commit**

```bash
git add sanity-studio/schemaTypes/index.ts
git commit -m "feat: register all Sanity schemas"
```

---

## Phase 3: UI Components

### Task 11: Create Button Component

**Files:**
- Create: `components/ui/Button.tsx`

**Step 1: Create Button matching Figma variants**

Create `components/ui/Button.tsx`:
```typescript
import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef } from 'react';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      type: {
        yellow: 'bg-[var(--color-button-yellow)] text-[var(--color-foreground-base)] shadow-[0px_0px_0px_1px_rgba(229,225,146,0.8),0px_1px_2px_rgba(0,0,0,0.2),inset_0px_0.75px_0px_rgba(255,255,255,0.2)] hover:brightness-95',
        dark: 'bg-[var(--color-foreground-base)] text-white shadow-[0px_0px_0px_1px_rgba(0,0,0,0.08),0px_1px_2px_rgba(0,0,0,0.12)] hover:bg-[#2a2924]',
        white: 'bg-white text-[var(--color-foreground-base)] shadow-[0px_0px_0px_1px_rgba(0,0,0,0.08),0px_1px_2px_rgba(0,0,0,0.12)] hover:bg-gray-50',
        'dark-blur': 'bg-[var(--color-foreground-base)]/80 backdrop-blur-[20px] text-white hover:bg-[var(--color-foreground-base)]/90',
        'white-blur': 'bg-white/80 backdrop-blur-[20px] text-[var(--color-foreground-base)] hover:bg-white/90',
        outline: 'border border-[var(--color-border-base)] bg-transparent text-[var(--color-foreground-base)] hover:bg-[var(--color-background-muted)]',
      },
      size: {
        xs: 'h-[30px] px-3 text-xs rounded-[var(--radius-8)]',
        s: 'h-9 px-4 text-sm rounded-[var(--radius-8)]',
        m: 'h-[42px] px-5 text-base rounded-[var(--radius-12)]',
        l: 'h-[50px] px-6 text-base rounded-[var(--radius-12)]',
      },
    },
    defaultVariants: {
      type: 'yellow',
      size: 'm',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  href?: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, type, size, href, children, ...props }, ref) => {
    if (href) {
      return (
        <a
          href={href}
          className={buttonVariants({ type, size, className })}
        >
          {children}
        </a>
      );
    }

    return (
      <button
        className={buttonVariants({ type, size, className })}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
```

**Step 2: Install class-variance-authority**

Run:
```bash
npm install class-variance-authority
```

**Step 3: Commit**

```bash
git add components/ui/Button.tsx package.json package-lock.json
git commit -m "feat: add Button component with Figma variants"
```

---

### Task 12: Create CTA Block Component

**Files:**
- Create: `components/blocks/CTA.tsx`

**Step 1: Create CTA block**

Create `components/blocks/CTA.tsx`:
```typescript
import { Button } from '@/components/ui/Button';

interface CTAProps {
  size?: 'default' | 'display';
  alignment?: 'center' | 'left';
  headline: string;
  subheadline?: string;
  primaryCta?: {
    label: string;
    href: string;
  };
  secondaryCta?: {
    label: string;
    href: string;
  };
}

export function CTA({
  size = 'default',
  alignment = 'center',
  headline,
  subheadline,
  primaryCta,
  secondaryCta,
}: CTAProps) {
  const isDisplay = size === 'display';
  const isCenter = alignment === 'center';

  return (
    <section
      className={`w-full px-[var(--spacing-20)] py-[var(--spacing-60)] ${
        isCenter ? 'text-center' : 'text-left'
      }`}
    >
      <div className={`mx-auto max-w-[1440px] ${isCenter ? 'flex flex-col items-center' : ''}`}>
        <h2
          className={`font-[var(--font-display)] text-[var(--color-foreground-base)] ${
            isDisplay
              ? 'text-[var(--text-h3)] leading-[var(--leading-h3)]'
              : 'text-[var(--text-h5)] leading-[var(--leading-h5)]'
          }`}
        >
          {headline}
        </h2>

        {subheadline && (
          <p
            className={`mt-[var(--spacing-12)] text-[var(--text-body-1)] leading-[var(--leading-l)] text-[var(--color-foreground-subtle)] ${
              isCenter ? 'max-w-[600px]' : 'max-w-[800px]'
            }`}
          >
            {subheadline}
          </p>
        )}

        {(primaryCta || secondaryCta) && (
          <div className={`mt-[var(--spacing-32)] flex gap-[var(--spacing-12)] ${isCenter ? 'justify-center' : ''}`}>
            {primaryCta && (
              <Button type="yellow" size="l" href={primaryCta.href}>
                {primaryCta.label}
              </Button>
            )}
            {secondaryCta && (
              <Button type="outline" size="l" href={secondaryCta.href}>
                {secondaryCta.label}
              </Button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
```

**Step 2: Commit**

```bash
git add components/blocks/CTA.tsx
git commit -m "feat: add CTA block component"
```

---

### Task 13: Create Testimonial Block Component

**Files:**
- Create: `components/blocks/Testimonial.tsx`

**Step 1: Create Testimonial block**

Create `components/blocks/Testimonial.tsx`:
```typescript
import { Button } from '@/components/ui/Button';
import Image from 'next/image';

interface TestimonialProps {
  quote: string;
  authorName: string;
  authorRole?: string;
  location?: string;
  video?: {
    thumbnail?: { asset: { url: string } };
    url?: string;
  };
}

export function Testimonial({
  quote,
  authorName,
  authorRole,
  location,
  video,
}: TestimonialProps) {
  return (
    <section className="w-full px-[var(--spacing-12)] py-[var(--spacing-60)]">
      <div className="mx-auto flex max-w-[838px] items-center justify-between gap-[var(--spacing-20)] rounded-[var(--radius-16)] bg-[var(--color-background-tertiary)] p-[var(--spacing-20)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_0px_rgba(0,0,0,0.08)]">
        {/* Quote */}
        <div className="flex w-[498px] flex-col justify-between">
          <p className="font-[var(--font-sans)] text-[var(--text-l)] leading-[var(--leading-l)] text-[var(--color-foreground-base)]">
            "{quote}"
          </p>

          <div className="mt-auto pt-[var(--spacing-20)]">
            <p className="font-[var(--font-mono)] text-[12px] font-medium uppercase leading-[16px] text-[var(--color-foreground-subtle)]">
              {authorName}
            </p>
            {(authorRole || location) && (
              <p className="font-[var(--font-mono)] text-[12px] uppercase leading-[16px] text-[var(--color-foreground-subtle)]">
                {[authorRole, location].filter(Boolean).join(', ')}
              </p>
            )}
          </div>
        </div>

        {/* Video thumbnail */}
        {video?.thumbnail && (
          <div className="relative h-[240px] w-[240px] overflow-hidden rounded-[var(--radius-8)]">
            <Image
              src={video.thumbnail.asset.url}
              alt={`${authorName} testimonial`}
              fill
              className="object-cover"
            />
            {video.url && (
              <div className="absolute bottom-[10px] left-[10px]">
                <Button type="white-blur" size="xs" href={video.url}>
                  Watch now
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
```

**Step 2: Commit**

```bash
git add components/blocks/Testimonial.tsx
git commit -m "feat: add Testimonial block component"
```

---

### Task 14: Create Block Renderer

**Files:**
- Create: `components/blocks/BlockRenderer.tsx`

**Step 1: Create block renderer**

Create `components/blocks/BlockRenderer.tsx`:
```typescript
import { CTA } from './CTA';
import { Testimonial } from './Testimonial';
// Import more blocks as they're created

interface Block {
  _type: string;
  _key: string;
  [key: string]: unknown;
}

interface BlockRendererProps {
  blocks: Block[];
}

const blockComponents: Record<string, React.ComponentType<any>> = {
  cta: CTA,
  testimonial: Testimonial,
  // Add more blocks as they're created
};

export function BlockRenderer({ blocks }: BlockRendererProps) {
  if (!blocks || blocks.length === 0) {
    return null;
  }

  return (
    <>
      {blocks.map((block) => {
        const Component = blockComponents[block._type];

        if (!Component) {
          console.warn(`Unknown block type: ${block._type}`);
          return null;
        }

        return <Component key={block._key} {...block} />;
      })}
    </>
  );
}
```

**Step 2: Commit**

```bash
git add components/blocks/BlockRenderer.tsx
git commit -m "feat: add BlockRenderer for dynamic page building"
```

---

## Phase 4: Visual Editing Setup

### Task 15: Setup Draft Mode API Routes

**Files:**
- Create: `app/api/draft-mode/enable/route.ts`
- Create: `app/api/draft-mode/disable/route.ts`

**Step 1: Create enable route**

Create `app/api/draft-mode/enable/route.ts`:
```typescript
import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const redirectTo = searchParams.get('redirect') || '/';

  (await draftMode()).enable();

  redirect(redirectTo);
}
```

**Step 2: Create disable route**

Create `app/api/draft-mode/disable/route.ts`:
```typescript
import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const redirectTo = searchParams.get('redirect') || '/';

  (await draftMode()).disable();

  redirect(redirectTo);
}
```

**Step 3: Commit**

```bash
git add app/api/draft-mode/
git commit -m "feat: add draft mode API routes for visual editing"
```

---

### Task 16: Setup Visual Editing Provider

**Files:**
- Create: `components/VisualEditing.tsx`
- Modify: `app/layout.tsx`

**Step 1: Create VisualEditing component**

Create `components/VisualEditing.tsx`:
```typescript
'use client';

import { enableVisualEditing } from '@sanity/visual-editing';
import { useEffect } from 'react';

export function VisualEditing() {
  useEffect(() => {
    enableVisualEditing();
  }, []);

  return null;
}
```

**Step 2: Add to layout**

Update `app/layout.tsx`:
```typescript
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { draftMode } from "next/headers";
import { VisualEditing } from "@/components/VisualEditing";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Programa",
  description: "Interior design project management software",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isEnabled: isDraftMode } = await draftMode();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        {isDraftMode && <VisualEditing />}
      </body>
    </html>
  );
}
```

**Step 3: Commit**

```bash
git add components/VisualEditing.tsx app/layout.tsx
git commit -m "feat: add visual editing support for Sanity"
```

---

### Task 17: Create Dynamic Page Route

**Files:**
- Create: `app/(site)/[...slug]/page.tsx`

**Step 1: Create dynamic page**

Create `app/(site)/[...slug]/page.tsx`:
```typescript
import { notFound } from 'next/navigation';
import { draftMode } from 'next/headers';
import { getClient } from '@/sanity/lib/client';
import { pageBySlugQuery } from '@/sanity/lib/queries';
import { BlockRenderer } from '@/components/blocks/BlockRenderer';

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const slugPath = slug?.join('/') || '';
  const { isEnabled: preview } = await draftMode();

  const client = getClient(preview);
  const page = await client.fetch(pageBySlugQuery, { slug: slugPath });

  if (!page) {
    notFound();
  }

  return (
    <main>
      <BlockRenderer blocks={page.blocks} />
    </main>
  );
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const slugPath = slug?.join('/') || '';
  const client = getClient();
  const page = await client.fetch(pageBySlugQuery, { slug: slugPath });

  if (!page) {
    return {};
  }

  return {
    title: page.seo?.metaTitle || page.title,
    description: page.seo?.metaDescription,
  };
}
```

**Step 2: Commit**

```bash
git add "app/(site)/[...slug]/page.tsx"
git commit -m "feat: add dynamic page route with Sanity content"
```

---

## Phase 5: Sanity Studio Configuration

### Task 18: Configure Presentation Tool

**Files:**
- Modify: `sanity-studio/sanity.config.ts`

**Step 1: Install presentation tool**

Run in `sanity-studio` directory:
```bash
npm install @sanity/presentation
```

**Step 2: Configure studio**

Update `sanity-studio/sanity.config.ts`:
```typescript
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { presentationTool } from '@sanity/presentation';
import { schemaTypes } from './schemaTypes';

export default defineConfig({
  name: 'default',
  title: 'Programa',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID!,
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',

  plugins: [
    structureTool(),
    presentationTool({
      previewUrl: {
        draftMode: {
          enable: process.env.SANITY_STUDIO_PREVIEW_URL || 'http://localhost:3000/api/draft-mode/enable',
        },
      },
    }),
  ],

  schema: {
    types: schemaTypes,
  },
});
```

**Step 3: Commit**

```bash
cd sanity-studio
git add sanity.config.ts package.json package-lock.json
git commit -m "feat: configure Sanity Presentation tool for visual editing"
```

---

## Remaining Blocks (Future Tasks)

The following blocks should be implemented following the same pattern as Tasks 12-13:

1. **Bento Card** - `components/blocks/BentoCard.tsx` + `sanity-studio/schemaTypes/blocks/bentoCard.ts`
2. **Stats** - `components/blocks/Stats.tsx` + schema
3. **Feature Grid** - `components/blocks/FeatureGrid.tsx` + schema
4. **Simple Card Grid** - `components/blocks/SimpleCardGrid.tsx` + schema
5. **Media Carousel** - `components/blocks/MediaCarousel.tsx` + schema
6. **Banner** - `components/blocks/Banner.tsx` + schema
7. **Trust Badges** - `components/blocks/TrustBadges.tsx` + schema
8. **Image** - `components/blocks/ImageBlock.tsx` + schema
9. **Global Social Proof** - `components/blocks/GlobalSocialProof.tsx` + schema
10. **Enquiries** - `components/blocks/Enquiries.tsx` + schema
11. **Leadership** - `components/blocks/Leadership.tsx` + schema
12. **Partners** - `components/blocks/Partners.tsx` + schema
13. **Grid Learn Posts** - `components/blocks/GridLearnPosts.tsx` + schema
14. **Cards Carousel** - `components/blocks/CardsCarousel.tsx` + schema
15. **Form Subscribe** - `components/blocks/FormSubscribe.tsx` + schema
16. **CTA Banner** - `components/blocks/CTABanner.tsx` + schema
17. **News Carousel** - `components/blocks/NewsCarousel.tsx` + schema
18. **Feature Set** - `components/blocks/FeatureSet.tsx` + schema
19. **Made With Programa** - `components/blocks/MadeWithPrograma.tsx` + schema
20. **Popular Help Topics** - `components/blocks/PopularHelpTopics.tsx` + schema
21. **Testimonial 4** - `components/blocks/Testimonial4.tsx` + schema
22. **Feature Grid Layout 2** - `components/blocks/FeatureGridLayout2.tsx` + schema
23. **Main CTA** - `components/blocks/MainCTA.tsx` + schema

For each block:
1. Fetch design context from Figma using `get_design_context`
2. Extract variants, tokens, and responsive behavior
3. Create React component matching Figma exactly
4. Create Sanity schema with matching fields
5. Register in BlockRenderer and schema index
6. Commit

---

## Testing Checklist

After completing all tasks:

- [ ] Run `npm run dev` - site loads without errors
- [ ] Run `npm run build` - builds successfully
- [ ] Create test page in Sanity Studio
- [ ] Add blocks to page in Presentation tool
- [ ] Verify visual editing click-to-edit works
- [ ] Verify blocks render correctly on frontend
- [ ] Test responsive behavior (desktop/mobile)
