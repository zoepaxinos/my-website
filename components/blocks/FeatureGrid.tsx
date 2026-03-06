import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';

interface Feature {
  _key: string;
  icon?: {
    asset: {
      _ref: string;
    };
  };
  title: string;
  description?: string;
}

interface FeatureGridProps {
  features?: Feature[];
}

export function FeatureGrid({ features = [] }: FeatureGridProps) {
  return (
    <section className="w-full px-[var(--spacing-20)] py-[var(--spacing-60)]">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid grid-cols-2 gap-[var(--spacing-24)] md:grid-cols-4">
          {features.map((feature) => {
            const iconUrl = feature.icon
              ? urlFor(feature.icon).width(64).height(64).fit('max').url()
              : null;

            return (
              <div
                key={feature._key}
                className="flex flex-col items-center text-center"
              >
                {iconUrl && (
                  <div className="mb-[var(--spacing-16)] flex h-[64px] w-[64px] items-center justify-center">
                    <Image
                      src={iconUrl}
                      alt={feature.title}
                      width={64}
                      height={64}
                      className="h-auto max-h-[64px] w-auto max-w-[64px] object-contain"
                    />
                  </div>
                )}
                <h3 className="font-[var(--font-display)] text-[var(--text-h6)] leading-[var(--leading-s)] text-[var(--color-foreground-base)]">
                  {feature.title}
                </h3>
                {feature.description && (
                  <p className="mt-[var(--spacing-8)] text-[var(--text-body-2)] leading-[var(--leading-m)] text-[var(--color-foreground-subtle)]">
                    {feature.description}
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
