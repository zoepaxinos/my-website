'use client';

import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import { Carousel } from '@/components/ui/Carousel';

interface MediaItem {
  _key: string;
  image?: {
    asset: {
      _ref: string;
    };
  };
  videoUrl?: string;
  caption?: string;
}

interface MediaCarouselProps {
  headline?: string;
  alignment?: 'left' | 'center';
  items?: MediaItem[];
}

function getVideoEmbedUrl(url: string): string | null {
  // YouTube
  const youtubeMatch = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]+)/
  );
  if (youtubeMatch) {
    return `https://www.youtube.com/embed/${youtubeMatch[1]}`;
  }

  // Vimeo
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch) {
    return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
  }

  return null;
}

export function MediaCarousel({
  headline,
  alignment = 'left',
  items = [],
}: MediaCarouselProps) {
  return (
    <section className="w-full px-[var(--spacing-20)] py-[var(--spacing-60)]">
      <div className="mx-auto max-w-[1440px]">
        {headline && (
          <div
            className={`mb-[var(--spacing-32)] ${
              alignment === 'center' ? 'text-center' : 'text-left'
            }`}
          >
            <h2 className="font-[var(--font-display)] text-[var(--text-h3)] leading-[var(--leading-s)] text-[var(--color-foreground-base)]">
              {headline}
            </h2>
          </div>
        )}

        <Carousel showDots showArrows>
          {items.map((item) => {
            const imageUrl = item.image
              ? urlFor(item.image).width(600).height(400).fit('crop').url()
              : null;
            const embedUrl = item.videoUrl
              ? getVideoEmbedUrl(item.videoUrl)
              : null;

            return (
              <div
                key={item._key}
                className="w-[600px] flex-shrink-0 snap-start"
              >
                <div className="relative aspect-[3/2] w-full overflow-hidden rounded-[var(--radius-12)] bg-[var(--color-background-muted)]">
                  {embedUrl ? (
                    <iframe
                      src={embedUrl}
                      className="h-full w-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title={item.caption || 'Video'}
                    />
                  ) : imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt={item.caption || 'Media item'}
                      fill
                      className="object-cover"
                    />
                  ) : null}
                </div>
                {item.caption && (
                  <p className="mt-[var(--spacing-12)] text-[var(--text-body-2)] leading-[var(--leading-m)] text-[var(--color-foreground-subtle)]">
                    {item.caption}
                  </p>
                )}
              </div>
            );
          })}
        </Carousel>
      </div>
    </section>
  );
}
