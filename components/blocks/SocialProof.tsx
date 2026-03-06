import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';

interface StatItem {
  _key: string;
  value: string;
  label: string;
}

interface LogoItem {
  _key: string;
  logo: {
    asset: {
      _ref: string;
    };
  };
  name: string;
}

interface SocialProofProps {
  headline?: string;
  stats?: StatItem[];
  logos?: LogoItem[];
}

export function SocialProof({
  headline,
  stats = [],
  logos = [],
}: SocialProofProps) {
  return (
    <section className="w-full px-[var(--spacing-20)] py-[var(--spacing-60)]">
      <div className="mx-auto max-w-[1440px]">
        {headline && (
          <div className="mb-[var(--spacing-40)] text-center">
            <h2 className="font-[var(--font-display)] text-[var(--text-h4)] leading-[var(--leading-h4)] text-[var(--color-foreground-base)]">
              {headline}
            </h2>
          </div>
        )}

        {/* Stats Row */}
        {stats.length > 0 && (
          <div className="mb-[var(--spacing-48)] flex flex-wrap items-center justify-center gap-[var(--spacing-32)] md:gap-[var(--spacing-60)]">
            {stats.map((stat) => (
              <div key={stat._key} className="text-center">
                <span className="block font-[var(--font-display)] text-[var(--text-h2)] leading-[var(--leading-h2)] text-[var(--color-foreground-base)]">
                  {stat.value}
                </span>
                <span className="mt-[var(--spacing-4)] block text-[var(--text-body-2)] leading-[var(--leading-m)] text-[var(--color-foreground-subtle)]">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Logos Row */}
        {logos.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-[var(--spacing-24)] md:gap-[var(--spacing-40)]">
            {logos.map((logoItem) => {
              const logoUrl = urlFor(logoItem.logo)
                .width(160)
                .height(60)
                .fit('max')
                .url();

              return (
                <div
                  key={logoItem._key}
                  className="flex h-[60px] items-center justify-center grayscale"
                >
                  <Image
                    src={logoUrl}
                    alt={logoItem.name}
                    width={160}
                    height={60}
                    className="h-auto max-h-[60px] w-auto max-w-[160px] object-contain"
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
