import { defineType, defineField } from 'sanity';

export const madeWithPrograma = defineType({
  name: 'madeWithPrograma',
  title: 'Made with Programa Block',
  type: 'object',
  fields: [
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
    }),
    defineField({
      name: 'projects',
      title: 'Projects',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'project',
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
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'designer',
              title: 'Designer',
              type: 'string',
              description: 'Name of the designer',
            }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'designer',
              media: 'image',
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      headline: 'headline',
      projects: 'projects',
    },
    prepare({ headline, projects }) {
      return {
        title: headline || 'Made with Programa',
        subtitle: `${projects?.length || 0} projects`,
      };
    },
  },
});
