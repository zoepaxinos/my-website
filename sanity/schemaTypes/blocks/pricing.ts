import { defineType, defineField } from 'sanity';

export const pricing = defineType({
  name: 'pricing',
  title: 'Pricing Block',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Section Heading',
      type: 'string',
    }),
    defineField({
      name: 'tiers',
      title: 'Pricing Tiers',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'pricingTier',
          fields: [
            defineField({
              name: 'type',
              title: 'Tier Type',
              type: 'string',
              options: {
                list: [
                  { title: 'Default', value: 'default' },
                  { title: 'Enterprise', value: 'enterprise' },
                ],
              },
              initialValue: 'default',
            }),
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
              name: 'price',
              title: 'Price',
              type: 'string',
              description: 'e.g., "$149" or "Custom"',
            }),
            defineField({
              name: 'billingPeriod',
              title: 'Billing Period',
              type: 'string',
              description: 'e.g., "per month"',
            }),
            defineField({
              name: 'features',
              title: 'Features',
              type: 'array',
              of: [{ type: 'string' }],
            }),
            defineField({
              name: 'cta',
              title: 'CTA Button',
              type: 'object',
              fields: [
                { name: 'label', title: 'Label', type: 'string' },
                { name: 'href', title: 'Link', type: 'url' },
              ],
            }),
            defineField({
              name: 'highlighted',
              title: 'Highlight This Tier',
              type: 'boolean',
              initialValue: false,
            }),
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      heading: 'heading',
      tiers: 'tiers',
    },
    prepare({ heading, tiers }) {
      return {
        title: heading || 'Pricing',
        subtitle: `${tiers?.length || 0} tiers`,
      };
    },
  },
});
