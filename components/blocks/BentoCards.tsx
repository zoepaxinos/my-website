import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';

interface Card {
  _key: string;
  title: string;
  description?: string;
  image?: {
    asset: {
      _ref: string;
    };
  };
  style?: 'default' | 'contrast';
}

interface BentoCardsProps {
  cards?: Card[];
}

export function BentoCards({ cards = [] }: BentoCardsProps) {
  return (
    <section className="w-full px-[var(--spacing-20)] py-[var(--spacing-60)]">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid grid-cols-2 gap-[var(--spacing-16)] md:grid-cols-3">
          {cards.map((card) => {
            const isContrast = card.style === 'contrast';
            const imageUrl = card.image
              ? urlFor(card.image).width(600).height(400).fit('crop').url()
              : null;

            return (
              <div
                key={card._key}
                className={`overflow-hidden rounded-[var(--radius-16)] p-[var(--spacing-24)] ${
                  isContrast
                    ? 'bg-[var(--color-foreground-base)] text-[var(--color-background-base)]'
                    : 'bg-[var(--color-background-secondary)]'
                }`}
              >
                {imageUrl && (
                  <div className="mb-[var(--spacing-16)] overflow-hidden rounded-[var(--radius-8)]">
                    <Image
                      src={imageUrl}
                      alt={card.title}
                      width={600}
                      height={400}
                      className="h-auto w-full object-cover"
                    />
                  </div>
                )}
                <h3
                  className={`font-[var(--font-display)] text-[var(--text-h6)] leading-[var(--leading-s)] ${
                    isContrast
                      ? 'text-[var(--color-background-base)]'
                      : 'text-[var(--color-foreground-base)]'
                  }`}
                >
                  {card.title}
                </h3>
                {card.description && (
                  <p
                    className={`mt-[var(--spacing-8)] text-[var(--text-body-2)] leading-[var(--leading-m)] ${
                      isContrast
                        ? 'text-[var(--color-background-secondary)]'
                        : 'text-[var(--color-foreground-subtle)]'
                    }`}
                  >
                    {card.description}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
