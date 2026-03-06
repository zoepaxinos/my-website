import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { urlFor } from '@/sanity/lib/image';

interface CTABannerProps {
  image: {
    asset: {
      _ref: string;
    };
    hotspot?: {
      x: number;
      y: number;
    };
  };
  headline: string;
  subheadline?: string;
  cta?: {
    label: string;
    href: string;
  };
}

export function CTABanner({
  image,
  headline,
  subheadline,
  cta,
}: CTABannerProps) {
  const imageUrl = urlFor(image).width(1920).height(800).fit('crop').url();

  return (
    <section className="relative w-full overflow-hidden">
      <div className="relative h-[400px] w-full md:h-[500px] lg:h-[600px]">
        {/* Background Image */}
        <Image
          src={imageUrl}
          alt={headline}
          fill
          className="object-cover"
          style={{
            objectPosition: image.hotspot
              ? `${image.hotspot.x * 100}% ${image.hotspot.y * 100}%`
              : 'center',
          }}
          priority
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-[var(--spacing-20)]">
          <div className="max-w-[800px] text-center">
            <h2 className="font-[var(--font-display)] text-[var(--text-h3)] leading-[var(--leading-h3)] text-white md:text-[var(--text-h2)] md:leading-[var(--leading-h2)]">
              {headline}
            </h2>

            {subheadline && (
              <p className="mx-auto mt-[var(--spacing-16)] max-w-[600px] text-[var(--text-body-1)] leading-[var(--leading-l)] text-white/90">
                {subheadline}
              </p>
            )}

            {cta && cta.label && cta.href && (
              <div className="mt-[var(--spacing-24)]">
                <Button variant="white" size="l" href={cta.href}>
                  {cta.label}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
