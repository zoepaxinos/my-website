import { defineType, defineField } from 'sanity';

export const partners = defineType({
  name: 'partners',
  title: 'Partners Block',
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
          name: 'partner',
          fields: [
            defineField({
              name: 'logo',
              title: 'Logo',
              type: 'image',
              options: {
                hotspot: true,
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'name',
              title: 'Name',
              type: 'string',
              description: 'Used for alt text and accessibility',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'url',
              description: 'Optional link to partner website',
            }),
          ],
          preview: {
            select: {
              title: 'name',
              media: 'logo',
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      headline: 'headline',
      partners: 'partners',
    },
    prepare({ headline, partners }) {
      return {
        title: headline || 'Partners',
        subtitle: `${partners?.length || 0} partners`,
      };
    },
  },
});
