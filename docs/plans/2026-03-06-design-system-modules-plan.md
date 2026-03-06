# Design System Modules Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Implement all design system modules from Figma as Sanity CMS blocks with React components.

**Architecture:** Each module has a Sanity schema (defines CMS fields) and React component (renders the block). BlockRenderer maps `_type` to components. Uses existing CSS variables from globals.css.

**Tech Stack:** Next.js 16, Sanity CMS v3, TypeScript, Tailwind CSS v4, CSS variables for design tokens

**Figma Source:** https://www.figma.com/design/XBijmUzlHgM1s6dQmupKl4/Website-Design-System?node-id=27-70

---

## Tier 1: Simple Static Modules

### Task 1: Image Block

**Files:**
- Create: `sanity/schemaTypes/blocks/image.ts`
- Create: `components/blocks/ImageBlock.tsx`
- Modify: `sanity/schemaTypes/index.ts`
- Modify: `components/blocks/BlockRenderer.tsx`

**Step 1: Create Sanity schema**

```typescript
// sanity/schemaTypes/blocks/image.ts
import { defineType, defineField } from 'sanity';

export const imageBlock = defineType({
  name: 'imageBlock',
  title: 'Image Block',
  type: 'object',
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'alt',
      title: 'Alt Text',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'size',
      title: 'Size',
      type: 'string',
      options: {
        list: [
          { title: 'Small', value: 'small' },
          { title: 'Medium', value: 'medium' },
          { title: 'Large', value: 'large' },
        ],
        layout: 'radio',
      },
      initialValue: 'medium',
    }),
  ],
  preview: {
    select: { title: 'alt', media: 'image' },
    prepare({ title, media }) {
      return { title: title || 'Image Block', media };
    },
  },
});
```

**Step 2: Create React component**

```typescript
// components/blocks/ImageBlock.tsx
import Image from 'next/image';
import { urlForImage } from '@/sanity/lib/image';

interface ImageBlockProps {
  image: { asset: { _ref: string } };
  alt: string;
  size?: 'small' | 'medium' | 'large';
}

const sizeConfig = {
  small: { width: 800, height: 480, maxWidth: '800px' },
  medium: { width: 1000, height: 600, maxWidth: '1000px' },
  large: { width: 1200, height: 720, maxWidth: '1200px' },
};

export function ImageBlock({ image, alt, size = 'medium' }: ImageBlockProps) {
  const config = sizeConfig[size];

  return (
    <section className="w-full px-[var(--spacing-20)] py-[var(--spacing-32)]">
      <div className="mx-auto" style={{ maxWidth: config.maxWidth }}>
        <div className="relative overflow-hidden rounded-[var(--radius-12)]" style={{ aspectRatio: `${config.width}/${config.height}` }}>
          <Image
            src={urlForImage(image)?.width(config.width).height(config.height).url() || ''}
            alt={alt}
            fill
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
```

**Step 3: Register in schema index**

Add to `sanity/schemaTypes/index.ts`:
```typescript
import { imageBlock } from './blocks/image';
// Add to types array: imageBlock,
```

**Step 4: Register in BlockRenderer**

Add to `components/blocks/BlockRenderer.tsx`:
```typescript
import { ImageBlock } from './ImageBlock';
// Add to blockComponents: imageBlock: ImageBlock,
```

**Step 5: Commit**

```bash
git add -A && git commit -m "feat: add Image block module"
```

---

### Task 2: Stats Block

**Files:**
- Create: `sanity/schemaTypes/blocks/stats.ts`
- Create: `components/blocks/Stats.tsx`
- Modify: `sanity/schemaTypes/index.ts`
- Modify: `components/blocks/BlockRenderer.tsx`

**Step 1: Create Sanity schema**

```typescript
// sanity/schemaTypes/blocks/stats.ts
import { defineType, defineField } from 'sanity';

export const stats = defineType({
  name: 'stats',
  title: 'Stats Block',
  type: 'object',
  fields: [
    defineField({
      name: 'showDescription',
      title: 'Show Description',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      hidden: ({ parent }) => !parent?.showDescription,
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
      hidden: ({ parent }) => !parent?.showDescription,
    }),
    defineField({
      name: 'stats',
      title: 'Stats',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'value', title: 'Value', type: 'string', validation: (Rule) => Rule.required() },
            { name: 'label', title: 'Label', type: 'string', validation: (Rule) => Rule.required() },
          ],
          preview: {
            select: { title: 'value', subtitle: 'label' },
          },
        },
      ],
      validation: (Rule) => Rule.min(1).max(4),
    }),
  ],
  preview: {
    select: { title: 'title' },
    prepare({ title }) {
      return { title: title || 'Stats Block' };
    },
  },
});
```

**Step 2: Create React component**

```typescript
// components/blocks/Stats.tsx
interface Stat {
  _key: string;
  value: string;
  label: string;
}

interface StatsProps {
  showDescription?: boolean;
  title?: string;
  description?: string;
  stats: Stat[];
}

export function Stats({ showDescription = true, title, description, stats }: StatsProps) {
  return (
    <section className="w-full px-[var(--spacing-12)] py-[var(--spacing-32)]">
      <div className="mx-auto flex max-w-[1000px] gap-[var(--spacing-20)] overflow-x-auto">
        {showDescription && (title || description) && (
          <div className="w-[235px] shrink-0 space-y-[var(--spacing-8)]">
            {title && (
              <p className="text-[16px] font-medium leading-[24px] text-[var(--color-foreground-base)]">
                {title}
              </p>
            )}
            {description && (
              <p className="text-[16px] leading-[24px] text-[var(--color-foreground-subtle)]">
                {description}
              </p>
            )}
          </div>
        )}
        {stats.map((stat) => (
          <div
            key={stat._key}
            className="flex size-[235px] shrink-0 flex-col justify-between rounded-[var(--radius-12)] border border-[var(--color-border-base)] bg-[var(--color-background-muted)] p-[var(--spacing-20)]"
          >
            <p className="font-[var(--font-display)] text-[104px] leading-[120px] text-[var(--color-foreground-base)]">
              {stat.value}
            </p>
            <p className="text-[16px] font-medium leading-[24px] text-[var(--color-foreground-base)]">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
```

**Step 3: Register in schema index and BlockRenderer**

**Step 4: Commit**

```bash
git add -A && git commit -m "feat: add Stats block module"
```

---

### Task 3: Trust Badges Block

**Files:**
- Create: `sanity/schemaTypes/blocks/trustBadges.ts`
- Create: `components/blocks/TrustBadges.tsx`
- Modify: `sanity/schemaTypes/index.ts`
- Modify: `components/blocks/BlockRenderer.tsx`

**Step 1: Create Sanity schema**

```typescript
// sanity/schemaTypes/blocks/trustBadges.ts
import { defineType, defineField } from 'sanity';

export const trustBadges = defineType({
  name: 'trustBadges',
  title: 'Trust Badges',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'Trusted by thousands of designers',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      initialValue: 'Across 85+ countries',
    }),
    defineField({
      name: 'badges',
      title: 'Badges',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'image', title: 'Badge Image', type: 'image', validation: (Rule) => Rule.required() },
            { name: 'name', title: 'Badge Name', type: 'string' },
          ],
          preview: {
            select: { title: 'name', media: 'image' },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Trust Badges' };
    },
  },
});
```

**Step 2: Create React component**

```typescript
// components/blocks/TrustBadges.tsx
import Image from 'next/image';
import { urlForImage } from '@/sanity/lib/image';

interface Badge {
  _key: string;
  image: { asset: { _ref: string } };
  name?: string;
}

interface TrustBadgesProps {
  title?: string;
  subtitle?: string;
  badges: Badge[];
}

export function TrustBadges({ title, subtitle, badges }: TrustBadgesProps) {
  return (
    <section className="w-full bg-[var(--color-background-base)] px-[var(--spacing-12)] py-[var(--spacing-60)]">
      <div className="mx-auto flex max-w-[1000px] flex-col items-center gap-[32px]">
        {(title || subtitle) && (
          <div className="space-y-[var(--spacing-8)] text-center">
            {title && (
              <p className="text-[24px] font-medium leading-[30px] text-[var(--color-foreground-base)]">
                {title}
              </p>
            )}
            {subtitle && (
              <p className="text-[16px] leading-[24px] text-[var(--color-foreground-subtle)]">
                {subtitle}
              </p>
            )}
          </div>
        )}
        <div className="flex flex-wrap justify-center gap-[var(--spacing-32)]">
          {badges?.map((badge) => (
            <div key={badge._key} className="relative size-[100px]">
              <Image
                src={urlForImage(badge.image)?.width(100).height(100).url() || ''}
                alt={badge.name || 'Trust badge'}
                fill
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

**Step 3: Register in schema index and BlockRenderer**

**Step 4: Commit**

```bash
git add -A && git commit -m "feat: add Trust Badges block module"
```

---

### Task 4: Banner Block

**Files:**
- Create: `sanity/schemaTypes/blocks/banner.ts`
- Create: `components/blocks/Banner.tsx`

**Step 1: Create Sanity schema**

```typescript
// sanity/schemaTypes/blocks/banner.ts
import { defineType, defineField } from 'sanity';

export const banner = defineType({
  name: 'banner',
  title: 'Banner',
  type: 'object',
  fields: [
    defineField({
      name: 'image',
      title: 'Background Image',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'hoverImage',
      title: 'Hover Image (optional)',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
    }),
    defineField({
      name: 'subheadline',
      title: 'Subheadline',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'cta',
      title: 'Call to Action',
      type: 'object',
      fields: [
        { name: 'label', title: 'Label', type: 'string' },
        { name: 'href', title: 'Link', type: 'url' },
      ],
    }),
  ],
  preview: {
    select: { title: 'headline', media: 'image' },
    prepare({ title, media }) {
      return { title: title || 'Banner', media };
    },
  },
});
```

**Step 2: Create React component**

```typescript
// components/blocks/Banner.tsx
'use client';
import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { urlForImage } from '@/sanity/lib/image';

interface BannerProps {
  image: { asset: { _ref: string } };
  hoverImage?: { asset: { _ref: string } };
  headline?: string;
  subheadline?: string;
  cta?: { label: string; href: string };
}

export function Banner({ image, hoverImage, headline, subheadline, cta }: BannerProps) {
  const [isHovered, setIsHovered] = useState(false);
  const currentImage = isHovered && hoverImage ? hoverImage : image;

  return (
    <section className="w-full px-[var(--spacing-20)] py-[var(--spacing-32)]">
      <div
        className="group relative mx-auto h-[480px] max-w-[1440px] overflow-hidden rounded-[var(--radius-16)]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Image
          src={urlForImage(currentImage)?.width(1440).height(480).url() || ''}
          alt={headline || 'Banner'}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {(headline || subheadline || cta) && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 p-[var(--spacing-20)] text-center text-white">
            {headline && (
              <h2 className="font-[var(--font-display)] text-[var(--text-h3)] leading-[var(--leading-h3)]">
                {headline}
              </h2>
            )}
            {subheadline && (
              <p className="mt-[var(--spacing-12)] max-w-[600px] text-[var(--text-body-1)] leading-[var(--leading-l)]">
                {subheadline}
              </p>
            )}
            {cta && (
              <div className="mt-[var(--spacing-32)]">
                <Button variant="white" size="l" href={cta.href}>
                  {cta.label}
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

**Step 3: Register in schema index and BlockRenderer**

**Step 4: Commit**

```bash
git add -A && git commit -m "feat: add Banner block module"
```

---

### Task 5: FAQ Block Component

The FAQ schema already exists. Create the component.

**Files:**
- Create: `components/blocks/FAQ.tsx`
- Create: `components/ui/Accordion.tsx`

**Step 1: Create Accordion UI component**

```typescript
// components/ui/Accordion.tsx
'use client';
import { useState } from 'react';

interface AccordionItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

function AccordionItem({ question, answer, isOpen, onToggle }: AccordionItemProps) {
  return (
    <div className="border-b border-[var(--color-border-base)]">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between py-[var(--spacing-20)] text-left"
      >
        <span className="text-[18px] font-medium text-[var(--color-foreground-base)]">
          {question}
        </span>
        <span className="ml-4 text-[24px] text-[var(--color-foreground-subtle)]">
          {isOpen ? '−' : '+'}
        </span>
      </button>
      {isOpen && (
        <div className="pb-[var(--spacing-20)] text-[16px] leading-[24px] text-[var(--color-foreground-subtle)]">
          {answer}
        </div>
      )}
    </div>
  );
}

interface AccordionProps {
  items: { _key: string; question: string; answer: string }[];
}

export function Accordion({ items }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div>
      {items.map((item, index) => (
        <AccordionItem
          key={item._key}
          question={item.question}
          answer={item.answer}
          isOpen={openIndex === index}
          onToggle={() => setOpenIndex(openIndex === index ? null : index)}
        />
      ))}
    </div>
  );
}
```

**Step 2: Create FAQ component**

```typescript
// components/blocks/FAQ.tsx
import { Accordion } from '@/components/ui/Accordion';

interface FAQItem {
  _key: string;
  question: string;
  answer: string;
}

interface FAQProps {
  headline?: string;
  items: FAQItem[];
}

export function FAQ({ headline, items }: FAQProps) {
  return (
    <section className="w-full px-[var(--spacing-12)] py-[var(--spacing-60)]">
      <div className="mx-auto max-w-[800px]">
        {headline && (
          <h2 className="mb-[var(--spacing-32)] text-center font-[var(--font-display)] text-[var(--text-h4)] leading-[var(--leading-h4)] text-[var(--color-foreground-base)]">
            {headline}
          </h2>
        )}
        <Accordion items={items} />
      </div>
    </section>
  );
}
```

**Step 3: Register in BlockRenderer**

**Step 4: Commit**

```bash
git add -A && git commit -m "feat: add FAQ block component with Accordion"
```

---

### Task 6: Pricing Block Component

The Pricing schema already exists. Create the component.

**Files:**
- Create: `components/blocks/Pricing.tsx`

**Step 1: Create Pricing component**

```typescript
// components/blocks/Pricing.tsx
import { Button } from '@/components/ui/Button';

interface PricingFeature {
  _key: string;
  text: string;
}

interface PricingCard {
  _key: string;
  title: string;
  price: string;
  period?: string;
  description?: string;
  features: PricingFeature[];
  cta?: { label: string; href: string };
  highlighted?: boolean;
}

interface PricingProps {
  headline?: string;
  subheadline?: string;
  cards: PricingCard[];
}

export function Pricing({ headline, subheadline, cards }: PricingProps) {
  return (
    <section className="w-full px-[var(--spacing-12)] py-[var(--spacing-60)]">
      <div className="mx-auto max-w-[1200px]">
        {(headline || subheadline) && (
          <div className="mb-[var(--spacing-32)] text-center">
            {headline && (
              <h2 className="font-[var(--font-display)] text-[var(--text-h4)] leading-[var(--leading-h4)] text-[var(--color-foreground-base)]">
                {headline}
              </h2>
            )}
            {subheadline && (
              <p className="mt-[var(--spacing-12)] text-[var(--text-body-1)] leading-[var(--leading-l)] text-[var(--color-foreground-subtle)]">
                {subheadline}
              </p>
            )}
          </div>
        )}
        <div className="grid gap-[var(--spacing-20)] md:grid-cols-3">
          {cards?.map((card) => (
            <div
              key={card._key}
              className={`flex flex-col rounded-[var(--radius-16)] border p-[var(--spacing-32)] ${
                card.highlighted
                  ? 'border-[var(--color-button-yellow)] bg-[var(--color-background-muted)]'
                  : 'border-[var(--color-border-base)]'
              }`}
            >
              <h3 className="text-[20px] font-medium text-[var(--color-foreground-base)]">
                {card.title}
              </h3>
              <div className="mt-[var(--spacing-12)]">
                <span className="font-[var(--font-display)] text-[48px] text-[var(--color-foreground-base)]">
                  {card.price}
                </span>
                {card.period && (
                  <span className="text-[var(--color-foreground-subtle)]">/{card.period}</span>
                )}
              </div>
              {card.description && (
                <p className="mt-[var(--spacing-8)] text-[var(--color-foreground-subtle)]">
                  {card.description}
                </p>
              )}
              <ul className="mt-[var(--spacing-20)] flex-1 space-y-[var(--spacing-12)]">
                {card.features?.map((feature) => (
                  <li key={feature._key} className="flex items-start gap-2 text-[var(--color-foreground-base)]">
                    <span className="text-[var(--color-button-yellow)]">✓</span>
                    {feature.text}
                  </li>
                ))}
              </ul>
              {card.cta && (
                <div className="mt-[var(--spacing-32)]">
                  <Button
                    variant={card.highlighted ? 'yellow' : 'outline'}
                    size="l"
                    href={card.cta.href}
                    className="w-full"
                  >
                    {card.cta.label}
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Register in BlockRenderer**

**Step 3: Commit**

```bash
git add -A && git commit -m "feat: add Pricing block component"
```

---

## Tier 2: Card-based Layouts

### Task 7: Feature Grid Block

**Files:**
- Create: `sanity/schemaTypes/blocks/featureGrid.ts`
- Create: `components/blocks/FeatureGrid.tsx`

**Step 1: Create Sanity schema**

```typescript
// sanity/schemaTypes/blocks/featureGrid.ts
import { defineType, defineField } from 'sanity';

export const featureGrid = defineType({
  name: 'featureGrid',
  title: 'Feature Grid',
  type: 'object',
  fields: [
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'icon', title: 'Icon', type: 'image' },
            { name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() },
            { name: 'description', title: 'Description', type: 'text', rows: 2 },
          ],
          preview: {
            select: { title: 'title', media: 'icon' },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Feature Grid' };
    },
  },
});
```

**Step 2: Create React component**

```typescript
// components/blocks/FeatureGrid.tsx
import Image from 'next/image';
import { urlForImage } from '@/sanity/lib/image';

interface Feature {
  _key: string;
  icon?: { asset: { _ref: string } };
  title: string;
  description?: string;
}

interface FeatureGridProps {
  features: Feature[];
}

export function FeatureGrid({ features }: FeatureGridProps) {
  return (
    <section className="w-full px-[var(--spacing-12)] py-[var(--spacing-60)]">
      <div className="mx-auto grid max-w-[1200px] gap-[var(--spacing-20)] sm:grid-cols-2 lg:grid-cols-4">
        {features?.map((feature) => (
          <div key={feature._key} className="flex flex-col items-center text-center">
            {feature.icon && (
              <div className="relative mb-[var(--spacing-12)] size-[48px]">
                <Image
                  src={urlForImage(feature.icon)?.width(48).height(48).url() || ''}
                  alt=""
                  fill
                  className="object-contain"
                />
              </div>
            )}
            <h3 className="text-[18px] font-medium text-[var(--color-foreground-base)]">
              {feature.title}
            </h3>
            {feature.description && (
              <p className="mt-[var(--spacing-8)] text-[14px] leading-[20px] text-[var(--color-foreground-subtle)]">
                {feature.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
```

**Step 3: Register and commit**

```bash
git add -A && git commit -m "feat: add Feature Grid block module"
```

---

### Task 8: Bento Cards Block

**Files:**
- Create: `sanity/schemaTypes/blocks/bentoCards.ts`
- Create: `components/blocks/BentoCards.tsx`

**Step 1: Create Sanity schema**

```typescript
// sanity/schemaTypes/blocks/bentoCards.ts
import { defineType, defineField } from 'sanity';

export const bentoCards = defineType({
  name: 'bentoCards',
  title: 'Bento Cards',
  type: 'object',
  fields: [
    defineField({
      name: 'cards',
      title: 'Cards',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() },
            { name: 'description', title: 'Description', type: 'text', rows: 2 },
            { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
            {
              name: 'style',
              title: 'Style',
              type: 'string',
              options: { list: ['default', 'contrast'], layout: 'radio' },
              initialValue: 'default',
            },
          ],
          preview: {
            select: { title: 'title', media: 'image' },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Bento Cards' };
    },
  },
});
```

**Step 2: Create React component**

```typescript
// components/blocks/BentoCards.tsx
import Image from 'next/image';
import { urlForImage } from '@/sanity/lib/image';

interface BentoCard {
  _key: string;
  title: string;
  description?: string;
  image?: { asset: { _ref: string } };
  style?: 'default' | 'contrast';
}

interface BentoCardsProps {
  cards: BentoCard[];
}

export function BentoCards({ cards }: BentoCardsProps) {
  return (
    <section className="w-full px-[var(--spacing-12)] py-[var(--spacing-60)]">
      <div className="mx-auto grid max-w-[1200px] gap-[var(--spacing-20)] sm:grid-cols-2 lg:grid-cols-3">
        {cards?.map((card) => (
          <div
            key={card._key}
            className={`overflow-hidden rounded-[var(--radius-16)] p-[var(--spacing-20)] ${
              card.style === 'contrast'
                ? 'bg-[var(--color-foreground-base)] text-white'
                : 'bg-[var(--color-background-muted)] text-[var(--color-foreground-base)]'
            }`}
          >
            {card.image && (
              <div className="relative mb-[var(--spacing-16)] aspect-[4/3] overflow-hidden rounded-[var(--radius-8)]">
                <Image
                  src={urlForImage(card.image)?.width(400).height(300).url() || ''}
                  alt={card.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <h3 className="text-[18px] font-medium">{card.title}</h3>
            {card.description && (
              <p className={`mt-[var(--spacing-8)] text-[14px] leading-[20px] ${
                card.style === 'contrast' ? 'text-white/70' : 'text-[var(--color-foreground-subtle)]'
              }`}>
                {card.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
```

**Step 3: Register and commit**

```bash
git add -A && git commit -m "feat: add Bento Cards block module"
```

---

### Task 9: Partners Block

**Files:**
- Create: `sanity/schemaTypes/blocks/partners.ts`
- Create: `components/blocks/Partners.tsx`

**Step 1: Create Sanity schema**

```typescript
// sanity/schemaTypes/blocks/partners.ts
import { defineType, defineField } from 'sanity';

export const partners = defineType({
  name: 'partners',
  title: 'Partners',
  type: 'object',
  fields: [
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
    }),
    defineField({
      name: 'partners',
      title: 'Partners',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'logo', title: 'Logo', type: 'image', validation: (Rule) => Rule.required() },
            { name: 'name', title: 'Name', type: 'string', validation: (Rule) => Rule.required() },
            { name: 'url', title: 'Website URL', type: 'url' },
          ],
          preview: {
            select: { title: 'name', media: 'logo' },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Partners' };
    },
  },
});
```

**Step 2: Create React component**

```typescript
// components/blocks/Partners.tsx
import Image from 'next/image';
import { urlForImage } from '@/sanity/lib/image';

interface Partner {
  _key: string;
  logo: { asset: { _ref: string } };
  name: string;
  url?: string;
}

interface PartnersProps {
  headline?: string;
  partners: Partner[];
}

export function Partners({ headline, partners }: PartnersProps) {
  return (
    <section className="w-full px-[var(--spacing-12)] py-[var(--spacing-60)]">
      <div className="mx-auto max-w-[1200px]">
        {headline && (
          <h2 className="mb-[var(--spacing-32)] text-center text-[24px] font-medium text-[var(--color-foreground-base)]">
            {headline}
          </h2>
        )}
        <div className="flex flex-wrap items-center justify-center gap-[var(--spacing-32)]">
          {partners?.map((partner) => {
            const logoElement = (
              <div className="relative h-[60px] w-[120px] grayscale transition-all hover:grayscale-0">
                <Image
                  src={urlForImage(partner.logo)?.width(120).height(60).url() || ''}
                  alt={partner.name}
                  fill
                  className="object-contain"
                />
              </div>
            );
            return partner.url ? (
              <a key={partner._key} href={partner.url} target="_blank" rel="noopener noreferrer">
                {logoElement}
              </a>
            ) : (
              <div key={partner._key}>{logoElement}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
```

**Step 3: Register and commit**

```bash
git add -A && git commit -m "feat: add Partners block module"
```

---

### Task 10: Leadership Block

**Files:**
- Create: `sanity/schemaTypes/blocks/leadership.ts`
- Create: `components/blocks/Leadership.tsx`

**Step 1: Create Sanity schema**

```typescript
// sanity/schemaTypes/blocks/leadership.ts
import { defineType, defineField } from 'sanity';

export const leadership = defineType({
  name: 'leadership',
  title: 'Leadership',
  type: 'object',
  fields: [
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
    }),
    defineField({
      name: 'members',
      title: 'Team Members',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'photo', title: 'Photo', type: 'image', options: { hotspot: true }, validation: (Rule) => Rule.required() },
            { name: 'name', title: 'Name', type: 'string', validation: (Rule) => Rule.required() },
            { name: 'role', title: 'Role', type: 'string', validation: (Rule) => Rule.required() },
            { name: 'bio', title: 'Bio', type: 'text', rows: 3 },
          ],
          preview: {
            select: { title: 'name', subtitle: 'role', media: 'photo' },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Leadership' };
    },
  },
});
```

**Step 2: Create React component**

```typescript
// components/blocks/Leadership.tsx
import Image from 'next/image';
import { urlForImage } from '@/sanity/lib/image';

interface Member {
  _key: string;
  photo: { asset: { _ref: string } };
  name: string;
  role: string;
  bio?: string;
}

interface LeadershipProps {
  headline?: string;
  members: Member[];
}

export function Leadership({ headline, members }: LeadershipProps) {
  return (
    <section className="w-full px-[var(--spacing-12)] py-[var(--spacing-60)]">
      <div className="mx-auto max-w-[1200px]">
        {headline && (
          <h2 className="mb-[var(--spacing-32)] text-center font-[var(--font-display)] text-[var(--text-h4)] leading-[var(--leading-h4)] text-[var(--color-foreground-base)]">
            {headline}
          </h2>
        )}
        <div className="grid gap-[var(--spacing-32)] sm:grid-cols-2 lg:grid-cols-4">
          {members?.map((member) => (
            <div key={member._key} className="text-center">
              <div className="relative mx-auto mb-[var(--spacing-16)] aspect-square w-full max-w-[280px] overflow-hidden rounded-[var(--radius-12)]">
                <Image
                  src={urlForImage(member.photo)?.width(280).height(280).url() || ''}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-[18px] font-medium text-[var(--color-foreground-base)]">
                {member.name}
              </h3>
              <p className="mt-[var(--spacing-4)] text-[14px] text-[var(--color-foreground-subtle)]">
                {member.role}
              </p>
              {member.bio && (
                <p className="mt-[var(--spacing-8)] text-[14px] leading-[20px] text-[var(--color-foreground-subtle)]">
                  {member.bio}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

**Step 3: Register and commit**

```bash
git add -A && git commit -m "feat: add Leadership block module"
```

---

## Tier 3: Content Blocks

### Task 11: CTA Banner Block

**Files:**
- Create: `sanity/schemaTypes/blocks/ctaBanner.ts`
- Create: `components/blocks/CTABanner.tsx`

**Step 1: Create Sanity schema**

```typescript
// sanity/schemaTypes/blocks/ctaBanner.ts
import { defineType, defineField } from 'sanity';

export const ctaBanner = defineType({
  name: 'ctaBanner',
  title: 'CTA Banner',
  type: 'object',
  fields: [
    defineField({
      name: 'image',
      title: 'Background Image',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
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
      name: 'cta',
      title: 'Call to Action',
      type: 'object',
      fields: [
        { name: 'label', title: 'Label', type: 'string' },
        { name: 'href', title: 'Link', type: 'url' },
      ],
    }),
  ],
  preview: {
    select: { title: 'headline', media: 'image' },
  },
});
```

**Step 2: Create React component**

```typescript
// components/blocks/CTABanner.tsx
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { urlForImage } from '@/sanity/lib/image';

interface CTABannerProps {
  image: { asset: { _ref: string } };
  headline: string;
  subheadline?: string;
  cta?: { label: string; href: string };
}

export function CTABanner({ image, headline, subheadline, cta }: CTABannerProps) {
  return (
    <section className="w-full px-[var(--spacing-20)] py-[var(--spacing-32)]">
      <div className="relative mx-auto h-[500px] max-w-[1440px] overflow-hidden rounded-[var(--radius-16)]">
        <Image
          src={urlForImage(image)?.width(1440).height(500).url() || ''}
          alt=""
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 p-[var(--spacing-20)] text-center text-white">
          <h2 className="max-w-[800px] font-[var(--font-display)] text-[var(--text-h3)] leading-[var(--leading-h3)]">
            {headline}
          </h2>
          {subheadline && (
            <p className="mt-[var(--spacing-12)] max-w-[600px] text-[var(--text-body-1)] leading-[var(--leading-l)] text-white/90">
              {subheadline}
            </p>
          )}
          {cta && (
            <div className="mt-[var(--spacing-32)]">
              <Button variant="yellow" size="l" href={cta.href}>
                {cta.label}
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
```

**Step 3: Register and commit**

```bash
git add -A && git commit -m "feat: add CTA Banner block module"
```

---

### Task 12: Global Social Proof Block

**Files:**
- Create: `sanity/schemaTypes/blocks/socialProof.ts`
- Create: `components/blocks/SocialProof.tsx`

**Step 1: Create Sanity schema**

```typescript
// sanity/schemaTypes/blocks/socialProof.ts
import { defineType, defineField } from 'sanity';

export const socialProof = defineType({
  name: 'socialProof',
  title: 'Social Proof',
  type: 'object',
  fields: [
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
    }),
    defineField({
      name: 'stats',
      title: 'Stats',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'value', title: 'Value', type: 'string' },
            { name: 'label', title: 'Label', type: 'string' },
          ],
        },
      ],
    }),
    defineField({
      name: 'logos',
      title: 'Company Logos',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'logo', title: 'Logo', type: 'image' },
            { name: 'name', title: 'Company Name', type: 'string' },
          ],
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Social Proof' };
    },
  },
});
```

**Step 2: Create React component**

```typescript
// components/blocks/SocialProof.tsx
import Image from 'next/image';
import { urlForImage } from '@/sanity/lib/image';

interface Stat {
  _key: string;
  value: string;
  label: string;
}

interface Logo {
  _key: string;
  logo: { asset: { _ref: string } };
  name: string;
}

interface SocialProofProps {
  headline?: string;
  stats?: Stat[];
  logos?: Logo[];
}

export function SocialProof({ headline, stats, logos }: SocialProofProps) {
  return (
    <section className="w-full px-[var(--spacing-12)] py-[var(--spacing-60)]">
      <div className="mx-auto max-w-[1200px]">
        {headline && (
          <h2 className="mb-[var(--spacing-32)] text-center text-[24px] font-medium text-[var(--color-foreground-base)]">
            {headline}
          </h2>
        )}
        {stats && stats.length > 0 && (
          <div className="mb-[var(--spacing-32)] flex flex-wrap justify-center gap-[var(--spacing-32)]">
            {stats.map((stat) => (
              <div key={stat._key} className="text-center">
                <p className="font-[var(--font-display)] text-[48px] text-[var(--color-foreground-base)]">
                  {stat.value}
                </p>
                <p className="text-[14px] text-[var(--color-foreground-subtle)]">{stat.label}</p>
              </div>
            ))}
          </div>
        )}
        {logos && logos.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-[var(--spacing-20)]">
            {logos.map((logo) => (
              <div key={logo._key} className="relative h-[40px] w-[100px] grayscale">
                <Image
                  src={urlForImage(logo.logo)?.width(100).height(40).url() || ''}
                  alt={logo.name}
                  fill
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
```

**Step 3: Register and commit**

```bash
git add -A && git commit -m "feat: add Social Proof block module"
```

---

### Task 13: Enquiries Block

**Files:**
- Create: `sanity/schemaTypes/blocks/enquiries.ts`
- Create: `components/blocks/Enquiries.tsx`

**Step 1: Create Sanity schema**

```typescript
// sanity/schemaTypes/blocks/enquiries.ts
import { defineType, defineField } from 'sanity';

export const enquiries = defineType({
  name: 'enquiries',
  title: 'Enquiries',
  type: 'object',
  fields: [
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      initialValue: 'Get in touch',
    }),
    defineField({
      name: 'subheadline',
      title: 'Subheadline',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'email',
      title: 'Contact Email',
      type: 'email',
    }),
    defineField({
      name: 'showForm',
      title: 'Show Contact Form',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Enquiries' };
    },
  },
});
```

**Step 2: Create React component**

```typescript
// components/blocks/Enquiries.tsx
import { Button } from '@/components/ui/Button';

interface EnquiriesProps {
  headline?: string;
  subheadline?: string;
  email?: string;
  showForm?: boolean;
}

export function Enquiries({ headline, subheadline, email, showForm = true }: EnquiriesProps) {
  return (
    <section className="w-full px-[var(--spacing-12)] py-[var(--spacing-60)]">
      <div className="mx-auto max-w-[600px] text-center">
        {headline && (
          <h2 className="font-[var(--font-display)] text-[var(--text-h4)] leading-[var(--leading-h4)] text-[var(--color-foreground-base)]">
            {headline}
          </h2>
        )}
        {subheadline && (
          <p className="mt-[var(--spacing-12)] text-[var(--text-body-1)] leading-[var(--leading-l)] text-[var(--color-foreground-subtle)]">
            {subheadline}
          </p>
        )}
        {showForm && (
          <form className="mt-[var(--spacing-32)] space-y-[var(--spacing-16)] text-left">
            <div>
              <label className="mb-2 block text-sm font-medium text-[var(--color-foreground-base)]">
                Name
              </label>
              <input
                type="text"
                className="w-full rounded-[var(--radius-8)] border border-[var(--color-border-base)] px-4 py-3"
                required
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-[var(--color-foreground-base)]">
                Email
              </label>
              <input
                type="email"
                className="w-full rounded-[var(--radius-8)] border border-[var(--color-border-base)] px-4 py-3"
                required
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-[var(--color-foreground-base)]">
                Message
              </label>
              <textarea
                className="w-full rounded-[var(--radius-8)] border border-[var(--color-border-base)] px-4 py-3"
                rows={4}
                required
              />
            </div>
            <Button variant="yellow" size="l" className="w-full">
              Send Message
            </Button>
          </form>
        )}
        {email && !showForm && (
          <div className="mt-[var(--spacing-32)]">
            <Button variant="yellow" size="l" href={`mailto:${email}`}>
              Email Us
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
```

**Step 3: Register and commit**

```bash
git add -A && git commit -m "feat: add Enquiries block module"
```

---

### Task 14: Popular Help Topics Block

**Files:**
- Create: `sanity/schemaTypes/blocks/helpTopics.ts`
- Create: `components/blocks/HelpTopics.tsx`

**Step 1: Create Sanity schema**

```typescript
// sanity/schemaTypes/blocks/helpTopics.ts
import { defineType, defineField } from 'sanity';

export const helpTopics = defineType({
  name: 'helpTopics',
  title: 'Popular Help Topics',
  type: 'object',
  fields: [
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      initialValue: 'Popular help topics',
    }),
    defineField({
      name: 'topics',
      title: 'Topics',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() },
            { name: 'description', title: 'Description', type: 'text', rows: 2 },
            { name: 'url', title: 'Link', type: 'url' },
          ],
          preview: {
            select: { title: 'title' },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Help Topics' };
    },
  },
});
```

**Step 2: Create React component**

```typescript
// components/blocks/HelpTopics.tsx
interface Topic {
  _key: string;
  title: string;
  description?: string;
  url?: string;
}

interface HelpTopicsProps {
  headline?: string;
  topics: Topic[];
}

export function HelpTopics({ headline, topics }: HelpTopicsProps) {
  return (
    <section className="w-full px-[var(--spacing-12)] py-[var(--spacing-60)]">
      <div className="mx-auto max-w-[1200px]">
        {headline && (
          <h2 className="mb-[var(--spacing-32)] text-center text-[24px] font-medium text-[var(--color-foreground-base)]">
            {headline}
          </h2>
        )}
        <div className="grid gap-[var(--spacing-16)] sm:grid-cols-2 lg:grid-cols-3">
          {topics?.map((topic) => {
            const content = (
              <div className="group rounded-[var(--radius-12)] border border-[var(--color-border-base)] p-[var(--spacing-20)] transition-colors hover:border-[var(--color-foreground-base)]">
                <h3 className="text-[18px] font-medium text-[var(--color-foreground-base)]">
                  {topic.title}
                </h3>
                {topic.description && (
                  <p className="mt-[var(--spacing-8)] text-[14px] leading-[20px] text-[var(--color-foreground-subtle)]">
                    {topic.description}
                  </p>
                )}
              </div>
            );
            return topic.url ? (
              <a key={topic._key} href={topic.url}>
                {content}
              </a>
            ) : (
              <div key={topic._key}>{content}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
```

**Step 3: Register and commit**

```bash
git add -A && git commit -m "feat: add Help Topics block module"
```

---

## Tier 4: Interactive/Complex Modules

### Task 15: Create Carousel UI Component

**Files:**
- Create: `components/ui/Carousel.tsx`

**Step 1: Create reusable Carousel component**

```typescript
// components/ui/Carousel.tsx
'use client';
import { useState, useRef, useCallback } from 'react';

interface CarouselProps {
  children: React.ReactNode[];
  showDots?: boolean;
  showArrows?: boolean;
}

export function Carousel({ children, showDots = true, showArrows = true }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollTo = useCallback((index: number) => {
    if (containerRef.current) {
      const child = containerRef.current.children[index] as HTMLElement;
      if (child) {
        child.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
        setCurrentIndex(index);
      }
    }
  }, []);

  const prev = () => scrollTo(Math.max(0, currentIndex - 1));
  const next = () => scrollTo(Math.min(children.length - 1, currentIndex + 1));

  return (
    <div className="relative">
      <div
        ref={containerRef}
        className="flex snap-x snap-mandatory gap-[var(--spacing-20)] overflow-x-auto scrollbar-hide"
        onScroll={(e) => {
          const target = e.target as HTMLElement;
          const index = Math.round(target.scrollLeft / target.offsetWidth);
          setCurrentIndex(index);
        }}
      >
        {children.map((child, index) => (
          <div key={index} className="shrink-0 snap-start">
            {child}
          </div>
        ))}
      </div>
      {showArrows && children.length > 1 && (
        <>
          <button
            onClick={prev}
            disabled={currentIndex === 0}
            className="absolute left-0 top-1/2 -translate-y-1/2 rounded-full bg-white p-2 shadow-md disabled:opacity-50"
          >
            ←
          </button>
          <button
            onClick={next}
            disabled={currentIndex === children.length - 1}
            className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full bg-white p-2 shadow-md disabled:opacity-50"
          >
            →
          </button>
        </>
      )}
      {showDots && children.length > 1 && (
        <div className="mt-[var(--spacing-16)] flex justify-center gap-2">
          {children.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`size-2 rounded-full transition-colors ${
                index === currentIndex ? 'bg-[var(--color-foreground-base)]' : 'bg-[var(--color-border-base)]'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
```

**Step 2: Commit**

```bash
git add -A && git commit -m "feat: add reusable Carousel UI component"
```

---

### Task 16: Media Carousel Block

**Files:**
- Create: `sanity/schemaTypes/blocks/mediaCarousel.ts`
- Create: `components/blocks/MediaCarousel.tsx`

**Step 1: Create Sanity schema**

```typescript
// sanity/schemaTypes/blocks/mediaCarousel.ts
import { defineType, defineField } from 'sanity';

export const mediaCarousel = defineType({
  name: 'mediaCarousel',
  title: 'Media Carousel',
  type: 'object',
  fields: [
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
    }),
    defineField({
      name: 'alignment',
      title: 'Alignment',
      type: 'string',
      options: { list: ['left', 'center'], layout: 'radio' },
      initialValue: 'left',
    }),
    defineField({
      name: 'items',
      title: 'Media Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
            { name: 'video', title: 'Video URL', type: 'url' },
            { name: 'caption', title: 'Caption', type: 'string' },
          ],
          preview: {
            select: { title: 'caption', media: 'image' },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Media Carousel' };
    },
  },
});
```

**Step 2: Create React component**

```typescript
// components/blocks/MediaCarousel.tsx
import Image from 'next/image';
import { Carousel } from '@/components/ui/Carousel';
import { urlForImage } from '@/sanity/lib/image';

interface MediaItem {
  _key: string;
  image?: { asset: { _ref: string } };
  video?: string;
  caption?: string;
}

interface MediaCarouselProps {
  headline?: string;
  alignment?: 'left' | 'center';
  items: MediaItem[];
}

export function MediaCarousel({ headline, alignment = 'left', items }: MediaCarouselProps) {
  return (
    <section className="w-full px-[var(--spacing-12)] py-[var(--spacing-60)]">
      <div className={`mx-auto max-w-[1200px] ${alignment === 'center' ? 'text-center' : ''}`}>
        {headline && (
          <h2 className="mb-[var(--spacing-32)] text-[24px] font-medium text-[var(--color-foreground-base)]">
            {headline}
          </h2>
        )}
        <Carousel>
          {items?.map((item) => (
            <div key={item._key} className="w-[600px]">
              {item.image && (
                <div className="relative aspect-video overflow-hidden rounded-[var(--radius-12)]">
                  <Image
                    src={urlForImage(item.image)?.width(600).height(340).url() || ''}
                    alt={item.caption || ''}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              {item.video && (
                <div className="aspect-video overflow-hidden rounded-[var(--radius-12)]">
                  <iframe
                    src={item.video}
                    className="size-full"
                    allowFullScreen
                  />
                </div>
              )}
              {item.caption && (
                <p className="mt-[var(--spacing-12)] text-[14px] text-[var(--color-foreground-subtle)]">
                  {item.caption}
                </p>
              )}
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
}
```

**Step 3: Register and commit**

```bash
git add -A && git commit -m "feat: add Media Carousel block module"
```

---

### Task 17: Cards Carousel Block

**Files:**
- Create: `sanity/schemaTypes/blocks/cardsCarousel.ts`
- Create: `components/blocks/CardsCarousel.tsx`

**Step 1: Create Sanity schema**

```typescript
// sanity/schemaTypes/blocks/cardsCarousel.ts
import { defineType, defineField } from 'sanity';

export const cardsCarousel = defineType({
  name: 'cardsCarousel',
  title: 'Cards Carousel',
  type: 'object',
  fields: [
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
    }),
    defineField({
      name: 'cards',
      title: 'Cards',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
            { name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() },
            { name: 'description', title: 'Description', type: 'text', rows: 2 },
            { name: 'url', title: 'Link', type: 'url' },
          ],
          preview: {
            select: { title: 'title', media: 'image' },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Cards Carousel' };
    },
  },
});
```

**Step 2: Create React component**

```typescript
// components/blocks/CardsCarousel.tsx
import Image from 'next/image';
import { Carousel } from '@/components/ui/Carousel';
import { urlForImage } from '@/sanity/lib/image';

interface Card {
  _key: string;
  image?: { asset: { _ref: string } };
  title: string;
  description?: string;
  url?: string;
}

interface CardsCarouselProps {
  headline?: string;
  cards: Card[];
}

export function CardsCarousel({ headline, cards }: CardsCarouselProps) {
  return (
    <section className="w-full px-[var(--spacing-12)] py-[var(--spacing-60)]">
      <div className="mx-auto max-w-[1200px]">
        {headline && (
          <h2 className="mb-[var(--spacing-32)] text-[24px] font-medium text-[var(--color-foreground-base)]">
            {headline}
          </h2>
        )}
        <Carousel>
          {cards?.map((card) => {
            const content = (
              <div className="w-[320px] overflow-hidden rounded-[var(--radius-12)] border border-[var(--color-border-base)]">
                {card.image && (
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={urlForImage(card.image)?.width(320).height(240).url() || ''}
                      alt={card.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="p-[var(--spacing-16)]">
                  <h3 className="text-[16px] font-medium text-[var(--color-foreground-base)]">
                    {card.title}
                  </h3>
                  {card.description && (
                    <p className="mt-[var(--spacing-8)] text-[14px] leading-[20px] text-[var(--color-foreground-subtle)]">
                      {card.description}
                    </p>
                  )}
                </div>
              </div>
            );
            return card.url ? (
              <a key={card._key} href={card.url}>
                {content}
              </a>
            ) : (
              <div key={card._key}>{content}</div>
            );
          })}
        </Carousel>
      </div>
    </section>
  );
}
```

**Step 3: Register and commit**

```bash
git add -A && git commit -m "feat: add Cards Carousel block module"
```

---

### Task 18: News Carousel Block

**Files:**
- Create: `sanity/schemaTypes/blocks/newsCarousel.ts`
- Create: `components/blocks/NewsCarousel.tsx`

Uses same structure as Cards Carousel but with news-specific styling.

**Step 1: Create schema (same as cardsCarousel but named newsCarousel)**

**Step 2: Create component (same as CardsCarousel but with news styling)**

**Step 3: Register and commit**

```bash
git add -A && git commit -m "feat: add News Carousel block module"
```

---

### Task 19: Grid Learn Posts Block

**Files:**
- Create: `sanity/schemaTypes/blocks/gridLearnPosts.ts`
- Create: `components/blocks/GridLearnPosts.tsx`

**Step 1: Create Sanity schema**

```typescript
// sanity/schemaTypes/blocks/gridLearnPosts.ts
import { defineType, defineField } from 'sanity';

export const gridLearnPosts = defineType({
  name: 'gridLearnPosts',
  title: 'Grid Learn Posts',
  type: 'object',
  fields: [
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
    }),
    defineField({
      name: 'cards',
      title: 'Cards',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'image', title: 'Image', type: 'image', options: { hotspot: true }, validation: (Rule) => Rule.required() },
            { name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() },
            { name: 'description', title: 'Description', type: 'text', rows: 2 },
            { name: 'url', title: 'Link', type: 'url' },
          ],
          preview: {
            select: { title: 'title', media: 'image' },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Grid Learn Posts' };
    },
  },
});
```

**Step 2: Create React component**

```typescript
// components/blocks/GridLearnPosts.tsx
import Image from 'next/image';
import { urlForImage } from '@/sanity/lib/image';

interface LearnCard {
  _key: string;
  image: { asset: { _ref: string } };
  title: string;
  description?: string;
  url?: string;
}

interface GridLearnPostsProps {
  headline?: string;
  cards: LearnCard[];
}

export function GridLearnPosts({ headline, cards }: GridLearnPostsProps) {
  return (
    <section className="w-full px-[var(--spacing-12)] py-[var(--spacing-60)]">
      <div className="mx-auto max-w-[1200px]">
        {headline && (
          <h2 className="mb-[var(--spacing-32)] text-center text-[24px] font-medium text-[var(--color-foreground-base)]">
            {headline}
          </h2>
        )}
        <div className="grid gap-[var(--spacing-20)] sm:grid-cols-2 lg:grid-cols-4">
          {cards?.map((card) => {
            const content = (
              <div className="group overflow-hidden rounded-[var(--radius-12)]">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={urlForImage(card.image)?.width(320).height(240).url() || ''}
                    alt={card.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="py-[var(--spacing-12)]">
                  <h3 className="text-[16px] font-medium text-[var(--color-foreground-base)]">
                    {card.title}
                  </h3>
                  {card.description && (
                    <p className="mt-[var(--spacing-4)] text-[14px] leading-[20px] text-[var(--color-foreground-subtle)]">
                      {card.description}
                    </p>
                  )}
                </div>
              </div>
            );
            return card.url ? (
              <a key={card._key} href={card.url}>
                {content}
              </a>
            ) : (
              <div key={card._key}>{content}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
```

**Step 3: Register and commit**

```bash
git add -A && git commit -m "feat: add Grid Learn Posts block module"
```

---

### Task 20: Made with Programa Block

**Files:**
- Create: `sanity/schemaTypes/blocks/madeWithPrograma.ts`
- Create: `components/blocks/MadeWithPrograma.tsx`

Similar to Cards Carousel with project-specific fields.

**Step 1-3: Create schema, component, register, commit**

```bash
git add -A && git commit -m "feat: add Made with Programa block module"
```

---

### Task 21: Form Subscribe Block

**Files:**
- Create: `sanity/schemaTypes/blocks/formSubscribe.ts`
- Create: `components/blocks/FormSubscribe.tsx`

**Step 1: Create Sanity schema**

```typescript
// sanity/schemaTypes/blocks/formSubscribe.ts
import { defineType, defineField } from 'sanity';

export const formSubscribe = defineType({
  name: 'formSubscribe',
  title: 'Subscribe Form',
  type: 'object',
  fields: [
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      initialValue: 'Stay updated',
    }),
    defineField({
      name: 'placeholder',
      title: 'Input Placeholder',
      type: 'string',
      initialValue: 'Enter your email',
    }),
    defineField({
      name: 'buttonText',
      title: 'Button Text',
      type: 'string',
      initialValue: 'Subscribe',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Subscribe Form' };
    },
  },
});
```

**Step 2: Create React component**

```typescript
// components/blocks/FormSubscribe.tsx
import { Button } from '@/components/ui/Button';

interface FormSubscribeProps {
  headline?: string;
  placeholder?: string;
  buttonText?: string;
}

export function FormSubscribe({
  headline = 'Stay updated',
  placeholder = 'Enter your email',
  buttonText = 'Subscribe',
}: FormSubscribeProps) {
  return (
    <section className="w-full px-[var(--spacing-12)] py-[var(--spacing-60)]">
      <div className="mx-auto max-w-[600px] text-center">
        {headline && (
          <h2 className="mb-[var(--spacing-20)] text-[24px] font-medium text-[var(--color-foreground-base)]">
            {headline}
          </h2>
        )}
        <form className="flex gap-[var(--spacing-12)]">
          <input
            type="email"
            placeholder={placeholder}
            className="flex-1 rounded-[var(--radius-12)] border border-[var(--color-border-base)] px-4 py-3"
            required
          />
          <Button variant="yellow" size="l">
            {buttonText}
          </Button>
        </form>
      </div>
    </section>
  );
}
```

**Step 3: Register and commit**

```bash
git add -A && git commit -m "feat: add Form Subscribe block module"
```

---

## Final Task: Update Schema Index and BlockRenderer

### Task 22: Register All Modules

**Files:**
- Modify: `sanity/schemaTypes/index.ts`
- Modify: `components/blocks/BlockRenderer.tsx`

**Step 1: Update schema index with all new blocks**

**Step 2: Update BlockRenderer with all new components**

**Step 3: Build and test**

```bash
npm run build
```

**Step 4: Commit and deploy**

```bash
git add -A && git commit -m "feat: register all design system modules"
git push
vercel --prod --yes
```

---

## Summary

**Total: 22 tasks**
- Tier 1: 6 modules (Image, Stats, Trust Badges, Banner, FAQ, Pricing)
- Tier 2: 4 modules (Feature Grid, Bento Cards, Partners, Leadership)
- Tier 3: 4 modules (CTA Banner, Social Proof, Enquiries, Help Topics)
- Tier 4: 7 modules (Carousel UI, Media Carousel, Cards Carousel, News Carousel, Grid Learn, Made with Programa, Form Subscribe)
- Final: 1 task (Register all)
