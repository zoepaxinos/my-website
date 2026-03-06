import { defineType, defineField } from 'sanity';

export const faq = defineType({
  name: 'faq',
  title: 'FAQ Block',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Section Heading',
      type: 'string',
    }),
    defineField({
      name: 'questions',
      title: 'Questions',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'faqItem',
          fields: [
            defineField({
              name: 'question',
              title: 'Question',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'answer',
              title: 'Answer',
              type: 'text',
              rows: 4,
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { title: 'question' },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      heading: 'heading',
      questions: 'questions',
    },
    prepare({ heading, questions }) {
      return {
        title: heading || 'FAQ',
        subtitle: `${questions?.length || 0} questions`,
      };
    },
  },
});
