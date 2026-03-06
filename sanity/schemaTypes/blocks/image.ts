import { defineType, defineField } from 'sanity';

export const imageBlock = defineType({
  name: 'imageBlock',
  title: 'Image Block',
  type: 'object',
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'alt',
      title: 'Alt Text',
      type: 'string',
      description: 'Describes the image for accessibility',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'size',
      title: 'Size',
      type: 'string',
      options: {
        list: [
          { title: 'Small', value: 'small' },
          { title: 'Medium', value: 'medium' },
          { title: 'Large', value: 'large' },
        ],
        layout: 'radio',
      },
      initialValue: 'medium',
    }),
  ],
  preview: {
    select: {
      alt: 'alt',
      media: 'image',
      size: 'size',
    },
    prepare({ alt, media, size }) {
      return {
        title: alt || 'Image Block',
        subtitle: `Size: ${size || 'medium'}`,
        media,
      };
    },
  },
});
