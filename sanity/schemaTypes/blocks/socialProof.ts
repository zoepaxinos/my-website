import { defineType, defineField } from 'sanity';

export const socialProof = defineType({
  name: 'socialProof',
  title: 'Social Proof Block',
  type: 'object',
  fields: [
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
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
    defineField({
      name: 'logos',
      title: 'Company Logos',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'logoItem',
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
              title: 'Company Name',
              type: 'string',
              description: 'Used for alt text and accessibility',
              validation: (Rule) => Rule.required(),
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
      stats: 'stats',
      logos: 'logos',
    },
    prepare({ headline, stats, logos }) {
      return {
        title: headline || 'Social Proof',
        subtitle: `${stats?.length || 0} stats, ${logos?.length || 0} logos`,
      };
    },
  },
});
