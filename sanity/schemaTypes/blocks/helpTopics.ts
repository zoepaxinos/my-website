import { defineType, defineField } from 'sanity';

export const helpTopics = defineType({
  name: 'helpTopics',
  title: 'Help Topics Block',
  type: 'object',
  fields: [
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
    }),
    defineField({
      name: 'topics',
      title: 'Topics',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'topic',
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
              rows: 2,
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'url',
              description: 'Optional link to topic page',
            }),
          ],
          preview: {
            select: {
              title: 'title',
              description: 'description',
            },
            prepare({ title, description }) {
              return {
                title: title,
                subtitle: description,
              };
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      headline: 'headline',
      topics: 'topics',
    },
    prepare({ headline, topics }) {
      return {
        title: headline || 'Help Topics',
        subtitle: `${topics?.length || 0} topics`,
      };
    },
  },
});
