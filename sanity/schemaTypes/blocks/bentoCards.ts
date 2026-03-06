import { defineType, defineField } from 'sanity';

export const bentoCards = defineType({
  name: 'bentoCards',
  title: 'Bento Cards Block',
  type: 'object',
  fields: [
    defineField({
      name: 'cards',
      title: 'Cards',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'card',
          fields: [
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
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {
                hotspot: true,
              },
            }),
            defineField({
              name: 'style',
              title: 'Style',
              type: 'string',
              options: {
                list: [
                  { title: 'Default', value: 'default' },
                  { title: 'Contrast', value: 'contrast' },
                ],
                layout: 'radio',
              },
              initialValue: 'default',
            }),
          ],
          preview: {
            select: {
              title: 'title',
              style: 'style',
              media: 'image',
            },
            prepare({ title, style, media }) {
              return {
                title: title || 'Card',
                subtitle: `Style: ${style || 'default'}`,
                media,
              };
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      cards: 'cards',
    },
    prepare({ cards }) {
      return {
        title: 'Bento Cards',
        subtitle: `${cards?.length || 0} cards`,
      };
    },
  },
});
