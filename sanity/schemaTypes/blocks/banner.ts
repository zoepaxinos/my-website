import { defineType, defineField } from 'sanity';

export const banner = defineType({
  name: 'banner',
  title: 'Banner Block',
  type: 'object',
  fields: [
    defineField({
      name: 'image',
      title: 'Background Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'hoverImage',
      title: 'Hover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Optional image shown on hover',
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
      name: 'cta',
      title: 'Call to Action',
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
      media: 'image',
    },
    prepare({ title, media }) {
      return {
        title: title || 'Banner',
        subtitle: 'Banner Block',
        media,
      };
    },
  },
});
