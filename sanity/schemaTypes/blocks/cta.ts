import { defineType, defineField } from 'sanity';

export const cta = defineType({
  name: 'cta',
  title: 'CTA Block',
  type: 'object',
  fields: [
    defineField({
      name: 'size',
      title: 'Size',
      type: 'string',
      options: {
        list: [
          { title: 'Default', value: 'default' },
          { title: 'Display (Large)', value: 'display' },
        ],
        layout: 'radio',
      },
      initialValue: 'default',
    }),
    defineField({
      name: 'alignment',
      title: 'Alignment',
      type: 'string',
      options: {
        list: [
          { title: 'Center', value: 'center' },
          { title: 'Left', value: 'left' },
        ],
        layout: 'radio',
      },
      initialValue: 'center',
    }),
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subheadline',
      title: 'Subheadline',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'primaryCta',
      title: 'Primary Button',
      type: 'object',
      fields: [
        { name: 'label', title: 'Label', type: 'string' },
        { name: 'href', title: 'Link', type: 'url' },
      ],
    }),
    defineField({
      name: 'secondaryCta',
      title: 'Secondary Button',
      type: 'object',
      fields: [
        { name: 'label', title: 'Label', type: 'string' },
        { name: 'href', title: 'Link', type: 'url' },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'headline',
      size: 'size',
    },
    prepare({ title, size }) {
      return {
        title: title || 'CTA Block',
        subtitle: `Size: ${size || 'default'}`,
      };
    },
  },
});
