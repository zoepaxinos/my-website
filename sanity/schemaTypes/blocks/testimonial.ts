import { defineType, defineField } from 'sanity';

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial Block',
  type: 'object',
  fields: [
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'authorName',
      title: 'Author Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'authorRole',
      title: 'Author Role',
      type: 'string',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'City, Country',
    }),
    defineField({
      name: 'video',
      title: 'Video',
      type: 'object',
      fields: [
        { name: 'thumbnail', title: 'Thumbnail', type: 'image' },
        { name: 'url', title: 'Video URL', type: 'url' },
      ],
    }),
  ],
  preview: {
    select: {
      quote: 'quote',
      author: 'authorName',
    },
    prepare({ quote, author }) {
      return {
        title: author || 'Testimonial',
        subtitle: quote?.substring(0, 50) + '...',
      };
    },
  },
});
