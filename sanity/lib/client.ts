import { createClient } from '@sanity/client';
import { apiVersion, dataset, projectId, useCdn } from '../env';

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn,
  perspective: 'published',
});

export const previewClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  perspective: 'previewDrafts',
  token: process.env.SANITY_API_READ_TOKEN,
});

export function getClient(preview = false) {
  return preview ? previewClient : client;
}
