import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { presentationTool } from '@sanity/presentation';
import { schema } from './sanity/schemaTypes';

export default defineConfig({
  name: 'default',
  title: 'Programa',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',

  plugins: [
    structureTool(),
    presentationTool({
      previewUrl: {
        draftMode: {
          enable: process.env.SANITY_STUDIO_PREVIEW_URL || 'http://localhost:3000/api/draft-mode/enable',
        },
      },
    }),
  ],

  schema,
});
