import { defineType, defineField } from 'sanity';

export const trustBadges = defineType({
  name: 'trustBadges',
  title: 'Trust Badges Block',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
    }),
    defineField({
      name: 'badges',
      title: 'Badges',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'badge',
          fields: [
            defineField({
              name: 'image',
              title: 'Badge Image',
              type: 'image',
              options: {
                hotspot: true,
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'name',
              title: 'Badge Name',
              type: 'string',
              description: 'Used for alt text and accessibility',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'name',
              media: 'image',
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      badges: 'badges',
    },
    prepare({ title, badges }) {
      return {
        title: title || 'Trust Badges',
        subtitle: `${badges?.length || 0} badges`,
      };
    },
  },
});
