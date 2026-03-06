import { type SchemaTypeDefinition } from 'sanity'

// Documents
import { page } from './documents/page';

// Objects
import { seo } from './objects/seo';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [page, seo],
}
