import { defineType, defineField } from 'sanity';

export const newsCarousel = defineType({
  name: 'newsCarousel',
  title: 'News Carousel Block',
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
          name: 'newsCard',
          fields: [
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {
                hotspot: true,
              },
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
              rows: 3,
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'url',
              description: 'Link to full article',
            }),
          ],
          preview: {
            select: {
              title: 'title',
              media: 'image',
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      headline: 'headline',
      cards: 'cards',
    },
    prepare({ headline, cards }) {
      return {
        title: headline || 'News Carousel',
        subtitle: `${cards?.length || 0} articles`,
      };
    },
  },
});
