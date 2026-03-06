import { Button } from '@/components/ui/Button';

interface CTAProps {
  size?: 'default' | 'display';
  alignment?: 'center' | 'left';
  headline: string;
  subheadline?: string;
  primaryCta?: {
    label: string;
    href: string;
  };
  secondaryCta?: {
    label: string;
    href: string;
  };
}

export function CTA({
  size = 'default',
  alignment = 'center',
  headline,
  subheadline,
  primaryCta,
  secondaryCta,
}: CTAProps) {
  const isDisplay = size === 'display';
  const isCenter = alignment === 'center';

  return (
    <section
      className={`w-full px-[var(--spacing-20)] py-[var(--spacing-60)] ${
        isCenter ? 'text-center' : 'text-left'
      }`}
    >
      <div className={`mx-auto max-w-[1440px] ${isCenter ? 'flex flex-col items-center' : ''}`}>
        <h2
          className={`font-[var(--font-display)] text-[var(--color-foreground-base)] ${
            isDisplay
              ? 'text-[var(--text-h3)] leading-[var(--leading-h3)]'
              : 'text-[var(--text-h5)] leading-[var(--leading-h5)]'
          }`}
        >
          {headline}
        </h2>

        {subheadline && (
          <p
            className={`mt-[var(--spacing-12)] text-[var(--text-body-1)] leading-[var(--leading-l)] text-[var(--color-foreground-subtle)] ${
              isCenter ? 'max-w-[600px]' : 'max-w-[800px]'
            }`}
          >
            {subheadline}
          </p>
        )}

        {(primaryCta || secondaryCta) && (
          <div className={`mt-[var(--spacing-32)] flex gap-[var(--spacing-12)] ${isCenter ? 'justify-center' : ''}`}>
            {primaryCta && (
              <Button type="yellow" size="l" href={primaryCta.href}>
                {primaryCta.label}
              </Button>
            )}
            {secondaryCta && (
              <Button type="outline" size="l" href={secondaryCta.href}>
                {secondaryCta.label}
              </Button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
