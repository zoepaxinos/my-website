import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';

interface Badge {
  _key: string;
  image: {
    asset: {
      _ref: string;
    };
  };
  name: string;
}

interface TrustBadgesProps {
  title?: string;
  subtitle?: string;
  badges?: Badge[];
}

export function TrustBadges({ title, subtitle, badges = [] }: TrustBadgesProps) {
  return (
    <section className="w-full px-[var(--spacing-20)] py-[var(--spacing-40)]">
      <div className="mx-auto max-w-[1440px]">
        {(title || subtitle) && (
          <div className="mb-[var(--spacing-32)] text-center">
            {title && (
              <h2 className="font-[var(--font-mono)] text-[12px] font-medium uppercase tracking-wider text-[var(--color-foreground-subtle)]">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mt-[var(--spacing-8)] text-[var(--text-body-2)] leading-[var(--leading-m)] text-[var(--color-foreground-subtle)]">
                {subtitle}
              </p>
            )}
          </div>
        )}

        <div className="flex flex-wrap items-center justify-center gap-[var(--spacing-24)] md:gap-[var(--spacing-40)]">
          {badges.map((badge) => {
            const imageUrl = urlFor(badge.image)
              .width(160)
              .height(60)
              .fit('max')
              .url();

            return (
              <div
                key={badge._key}
                className="flex h-[60px] items-center justify-center opacity-70 grayscale transition-all hover:opacity-100 hover:grayscale-0"
              >
                <Image
                  src={imageUrl}
                  alt={badge.name}
                  width={160}
                  height={60}
                  className="h-auto max-h-[60px] w-auto max-w-[160px] object-contain"
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
