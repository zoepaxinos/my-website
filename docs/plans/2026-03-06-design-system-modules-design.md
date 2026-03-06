# Design System Modules Implementation

## Goal

Implement all modules from the Figma design system as Sanity CMS blocks with corresponding React components.

## Architecture

Each module follows the established pattern:
1. Sanity schema in `sanity/schemaTypes/blocks/{module}.ts`
2. React component in `components/blocks/{Module}.tsx`
3. Registration in `BlockRenderer.tsx`

## Module List by Tier

### Tier 1 - Simple Static

| Module | Schema Fields |
|--------|---------------|
| Image | image, size (small/medium/large), alt |
| Banner | image, headline, subheadline, cta, hoverImage |
| Stats | stats[] (value, label, description) |
| Trust Badges | badges[] (image, name) |
| FAQ | items[] (question, answer) - accordion style |
| Pricing | cards[] (title, price, features[], cta) - component only, schema exists |

### Tier 2 - Card-based Layouts

| Module | Schema Fields |
|--------|---------------|
| Bento Cards | cards[] (title, description, image, style) |
| Feature Grids | features[] (icon, title, description) |
| Feature Grid Layout 2 | cards[] (title, description, image, alignment) |
| Simple Grid Cards | cards[] (title, description, size, style) |
| Partners | partners[] (logo, name, url) |
| Leadership | members[] (photo, name, role, bio) |

### Tier 3 - Content Blocks

| Module | Schema Fields |
|--------|---------------|
| CTA Banner | image, headline, subheadline, cta |
| Global Social Proof | headline, stats[], logos[] |
| Enquiries | headline, subheadline, form config |
| Popular Help Topics | topics[] (title, description, url) |
| Testimonial 4 | testimonials[] (quote, author, company, logo) |

### Tier 4 - Interactive/Complex

| Module | Schema Fields |
|--------|---------------|
| Media Carousel | items[] (image/video, caption), alignment |
| News Carousel | cards[] (image, title, description, url) |
| Cards Carousel | cards[] (image, title, description, url) |
| Made with Programa | projects[] (image, title, designer) |
| Form Subscribe | headline, placeholder, buttonText |
| Grid Learn Posts | cards[] (image, title, description, url) |

## Shared Components

Creating reusable UI pieces:
- `components/ui/Card.tsx` - Base card with variants
- `components/ui/Carousel.tsx` - Reusable carousel wrapper
- `components/ui/Accordion.tsx` - For FAQ

## Design Decisions

1. **News/Learn grids use images** - Manually configured image cards instead of auto-fetching posts
2. **Simpler modules first** - Tier 1 before Tier 4 for faster initial progress
3. **Responsive by default** - All components support desktop and mobile variants from Figma
4. **CSS variables** - Use existing design tokens from globals.css

## Figma Source

Design system: https://www.figma.com/design/XBijmUzlHgM1s6dQmupKl4/Website-Design-System?node-id=27-70
