'use client';

import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import { Carousel } from '@/components/ui/Carousel';

interface NewsCard {
  _key: string;
  image?: {
    asset: {
      _ref: string;
    };
  };
  title: string;
  description?: string;
  url?: string;
}

interface NewsCarouselProps {
  headline?: string;
  cards?: NewsCard[];
}

export function NewsCarousel({ headline, cards = [] }: NewsCarouselProps) {
  return (
    <section className="w-full px-[var(--spacing-20)] py-[var(--spacing-60)]">
      <div className="mx-auto max-w-[1440px]">
        {headline && (
          <div className="mb-[var(--spacing-32)]">
            <h2 className="font-[var(--font-display)] text-[var(--text-h3)] leading-[var(--leading-s)] text-[var(--color-foreground-base)]">
              {headline}
            </h2>
          </div>
        )}

        <Carousel showDots showArrows>
          {cards.map((card) => {
            const imageUrl = card.image
              ? urlFor(card.image).width(320).height(200).fit('crop').url()
              : null;

            const cardContent = (
              <div className="w-[320px] flex-shrink-0 snap-start">
                {imageUrl && (
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[var(--radius-12)] bg-[var(--color-background-muted)]">
                    <Image
                      src={imageUrl}
                      alt={card.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="mt-[var(--spacing-16)]">
                  <h3 className="font-[var(--font-display)] text-[var(--text-h6)] leading-[var(--leading-s)] text-[var(--color-foreground-base)]">
                    {card.title}
                  </h3>
                  {card.description && (
                    <p className="mt-[var(--spacing-8)] line-clamp-2 text-[var(--text-body-2)] leading-[var(--leading-m)] text-[var(--color-foreground-subtle)]">
                      {card.description}
                    </p>
                  )}
                </div>
              </div>
            );

            if (card.url) {
              return (
                <a
                  key={card._key}
                  href={card.url}
                  className="block transition-opacity hover:opacity-80"
                >
                  {cardContent}
                </a>
              );
            }

            return <div key={card._key}>{cardContent}</div>;
          })}
        </Carousel>
      </div>
    </section>
  );
}
