import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';

interface LearnPost {
  _key: string;
  image: {
    asset: {
      _ref: string;
    };
  };
  title: string;
  description?: string;
  url?: string;
}

interface GridLearnPostsProps {
  headline?: string;
  cards?: LearnPost[];
}

export function GridLearnPosts({ headline, cards = [] }: GridLearnPostsProps) {
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

        <div className="grid grid-cols-2 gap-[var(--spacing-24)] md:grid-cols-4">
          {cards.map((card) => {
            const imageUrl = urlFor(card.image)
              .width(400)
              .height(300)
              .fit('crop')
              .url();

            const cardContent = (
              <div className="group">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[var(--radius-12)] bg-[var(--color-background-muted)]">
                  <Image
                    src={imageUrl}
                    alt={card.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
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
                  className="block"
                >
                  {cardContent}
                </a>
              );
            }

            return <div key={card._key}>{cardContent}</div>;
          })}
        </div>
      </div>
    </section>
  );
}
