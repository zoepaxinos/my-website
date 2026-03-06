import { defineType, defineField } from 'sanity';

export const mediaCarousel = defineType({
  name: 'mediaCarousel',
  title: 'Media Carousel Block',
  type: 'object',
  fields: [
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
    }),
    defineField({
      name: 'alignment',
      title: 'Alignment',
      type: 'string',
      options: {
        list: [
          { title: 'Left', value: 'left' },
          { title: 'Center', value: 'center' },
        ],
        layout: 'radio',
      },
      initialValue: 'left',
    }),
    defineField({
      name: 'items',
      title: 'Media Items',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'mediaItem',
          fields: [
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {
                hotspot: true,
              },
            }),
            defineField({
              name: 'videoUrl',
              title: 'Video URL',
              type: 'url',
              description: 'YouTube or Vimeo URL (used instead of image if provided)',
            }),
            defineField({
              name: 'caption',
              title: 'Caption',
              type: 'string',
            }),
          ],
          preview: {
            select: {
              caption: 'caption',
              media: 'image',
              videoUrl: 'videoUrl',
            },
            prepare({ caption, media, videoUrl }) {
              return {
                title: caption || (videoUrl ? 'Video' : 'Image'),
                subtitle: videoUrl || 'Image',
                media,
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
      items: 'items',
    },
    prepare({ headline, items }) {
      return {
        title: headline || 'Media Carousel',
        subtitle: `${items?.length || 0} items`,
      };
    },
  },
});
