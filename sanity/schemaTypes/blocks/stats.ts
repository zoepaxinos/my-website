import { defineType, defineField } from 'sanity';

export const stats = defineType({
  name: 'stats',
  title: 'Stats Block',
  type: 'object',
  fields: [
    defineField({
      name: 'showDescription',
      title: 'Show Description Section',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      hidden: ({ parent }) => !parent?.showDescription,
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      hidden: ({ parent }) => !parent?.showDescription,
    }),
    defineField({
      name: 'stats',
      title: 'Statistics',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'statItem',
          fields: [
            defineField({
              name: 'value',
              title: 'Value',
              type: 'string',
              description: 'e.g., "99%", "$2M+", "500+"',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              value: 'value',
              label: 'label',
            },
            prepare({ value, label }) {
              return {
                title: value,
                subtitle: label,
              };
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      stats: 'stats',
    },
    prepare({ title, stats }) {
      return {
        title: title || 'Stats Block',
        subtitle: `${stats?.length || 0} statistics`,
      };
    },
  },
});
