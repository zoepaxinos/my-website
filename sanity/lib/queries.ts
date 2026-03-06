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
