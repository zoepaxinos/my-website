import { defineType, defineField } from 'sanity';

export const enquiries = defineType({
  name: 'enquiries',
  title: 'Enquiries Block',
  type: 'object',
  fields: [
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
    }),
    defineField({
      name: 'subheadline',
      title: 'Subheadline',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
      validation: (Rule) =>
        Rule.regex(
          /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
          { name: 'email', invert: false }
        ).error('Please enter a valid email address'),
    }),
    defineField({
      name: 'showForm',
      title: 'Show Contact Form',
      type: 'boolean',
      description: 'If enabled, displays a contact form. If disabled, shows an email button.',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      headline: 'headline',
      showForm: 'showForm',
    },
    prepare({ headline, showForm }) {
      return {
        title: headline || 'Enquiries',
        subtitle: showForm ? 'Contact Form' : 'Email Button',
      };
    },
  },
});
