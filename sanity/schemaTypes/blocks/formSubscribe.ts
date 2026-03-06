import { defineType, defineField } from 'sanity';

export const formSubscribe = defineType({
  name: 'formSubscribe',
  title: 'Form Subscribe Block',
  type: 'object',
  fields: [
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
    }),
    defineField({
      name: 'placeholder',
      title: 'Placeholder',
      type: 'string',
      description: 'Placeholder text for the email input',
      initialValue: 'Enter your email',
    }),
    defineField({
      name: 'buttonText',
      title: 'Button Text',
      type: 'string',
      initialValue: 'Subscribe',
    }),
  ],
  preview: {
    select: {
      headline: 'headline',
    },
    prepare({ headline }) {
      return {
        title: headline || 'Subscribe Form',
        subtitle: 'Email subscription block',
      };
    },
  },
});
