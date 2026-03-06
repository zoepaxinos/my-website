import { type SchemaTypeDefinition } from 'sanity'

// Documents
import { page } from './documents/page';

// Objects
import { seo } from './objects/seo';

// Blocks
import { cta } from './blocks/cta';
import { testimonial } from './blocks/testimonial';
import { pricing } from './blocks/pricing';
import { faq } from './blocks/faq';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Documents
    page,
    // Objects
    seo,
    // Blocks
    cta,
    testimonial,
    pricing,
    faq,
  ],
}
