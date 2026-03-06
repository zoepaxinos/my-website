import { defineType, defineField } from 'sanity';

export const featureGrid = defineType({
  name: 'featureGrid',
  title: 'Feature Grid Block',
  type: 'object',
  fields: [
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'feature',
          fields: [
            defineField({
              name: 'icon',
              title: 'Icon',
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
          ],
          preview: {
            select: {
              title: 'title',
              media: 'icon',
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      features: 'features',
    },
    prepare({ features }) {
      return {
        title: 'Feature Grid',
        subtitle: `${features?.length || 0} features`,
      };
    },
  },
});
