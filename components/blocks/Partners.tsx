import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';

interface Partner {
  _key: string;
  logo: {
    asset: {
      _ref: string;
    };
  };
  name: string;
  url?: string;
}

interface PartnersProps {
  headline?: string;
  partners?: Partner[];
}

export function Partners({ headline, partners = [] }: PartnersProps) {
  return (
    <section className="w-full px-[var(--spacing-20)] py-[var(--spacing-40)]">
      <div className="mx-auto max-w-[1440px]">
        {headline && (
          <div className="mb-[var(--spacing-32)] text-center">
            <h2 className="font-[var(--font-mono)] text-[12px] font-medium uppercase tracking-wider text-[var(--color-foreground-subtle)]">
              {headline}
            </h2>
          </div>
        )}

        <div className="flex flex-wrap items-center justify-center gap-[var(--spacing-24)] md:gap-[var(--spacing-40)]">
          {partners.map((partner) => {
            const logoUrl = urlFor(partner.logo)
              .width(160)
              .height(60)
              .fit('max')
              .url();

            const logoContent = (
              <div className="flex h-[60px] items-center justify-center grayscale transition-all hover:grayscale-0">
                <Image
                  src={logoUrl}
                  alt={partner.name}
                  width={160}
                  height={60}
                  className="h-auto max-h-[60px] w-auto max-w-[160px] object-contain"
                />
              </div>
            );

            if (partner.url) {
              return (
                <a
                  key={partner._key}
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  {logoContent}
                </a>
              );
            }

            return (
              <div key={partner._key}>
                {logoContent}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
