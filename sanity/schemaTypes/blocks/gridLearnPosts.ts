import { defineType, defineField } from 'sanity';

export const gridLearnPosts = defineType({
  name: 'gridLearnPosts',
  title: 'Grid Learn Posts Block',
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
          name: 'learnPost',
          fields: [
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {
                hotspot: true,
              },
              validation: (Rule) => Rule.required(),
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
              description: 'Link to full post',
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
        title: headline || 'Grid Learn Posts',
        subtitle: `${cards?.length || 0} posts`,
      };
    },
  },
});
