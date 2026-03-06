import { notFound } from 'next/navigation';
import { draftMode } from 'next/headers';
import { getClient } from '@/sanity/lib/client';
import { pageBySlugQuery } from '@/sanity/lib/queries';
import { BlockRenderer } from '@/components/blocks/BlockRenderer';

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const slugPath = slug?.join('/') || '';
  const { isEnabled: preview } = await draftMode();

  const client = getClient(preview);
  const page = await client.fetch(pageBySlugQuery, { slug: slugPath });

  if (!page) {
    notFound();
  }

  return (
    <main>
      <BlockRenderer blocks={page.blocks} />
    </main>
  );
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const slugPath = slug?.join('/') || '';
  const client = getClient();
  const page = await client.fetch(pageBySlugQuery, { slug: slugPath });

  if (!page) {
    return {};
  }

  return {
    title: page.seo?.metaTitle || page.title,
    description: page.seo?.metaDescription,
  };
}
