import { Button } from '@/components/ui/Button';

interface PricingTier {
  _key: string;
  type?: 'default' | 'enterprise';
  title: string;
  description?: string;
  price?: string;
  billingPeriod?: string;
  features?: string[];
  cta?: {
    label: string;
    href: string;
  };
  highlighted?: boolean;
}

interface PricingProps {
  heading?: string;
  tiers?: PricingTier[];
}

export function Pricing({ heading, tiers = [] }: PricingProps) {
  return (
    <section className="w-full px-[var(--spacing-20)] py-[var(--spacing-60)]">
      <div className="mx-auto max-w-[1200px]">
        {heading && (
          <h2 className="mb-[var(--spacing-40)] text-center font-[var(--font-display)] text-[var(--text-h3)] leading-[var(--leading-h3)] text-[var(--color-foreground-base)]">
            {heading}
          </h2>
        )}

        <div className="grid gap-[var(--spacing-24)] md:grid-cols-2 lg:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier._key}
              className={`relative flex flex-col rounded-[var(--radius-16)] p-[var(--spacing-24)] ${
                tier.highlighted
                  ? 'bg-[var(--color-foreground-base)] text-white'
                  : 'bg-[var(--color-background-secondary)]'
              }`}
            >
              {tier.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[var(--color-button-yellow)] px-3 py-1 text-[12px] font-medium text-[var(--color-foreground-base)]">
                  Most Popular
                </div>
              )}

              <div className="mb-[var(--spacing-24)]">
                <h3
                  className={`font-[var(--font-display)] text-[var(--text-h5)] leading-[var(--leading-h5)] ${
                    tier.highlighted
                      ? 'text-white'
                      : 'text-[var(--color-foreground-base)]'
                  }`}
                >
                  {tier.title}
                </h3>
                {tier.description && (
                  <p
                    className={`mt-[var(--spacing-8)] text-[var(--text-body-2)] leading-[var(--leading-m)] ${
                      tier.highlighted
                        ? 'text-white/80'
                        : 'text-[var(--color-foreground-subtle)]'
                    }`}
                  >
                    {tier.description}
                  </p>
                )}
              </div>

              <div className="mb-[var(--spacing-24)]">
                {tier.price && (
                  <span
                    className={`font-[var(--font-display)] text-[var(--text-h2)] leading-[var(--leading-h2)] ${
                      tier.highlighted
                        ? 'text-white'
                        : 'text-[var(--color-foreground-base)]'
                    }`}
                  >
                    {tier.price}
                  </span>
                )}
                {tier.billingPeriod && (
                  <span
                    className={`ml-1 text-[var(--text-body-2)] ${
                      tier.highlighted
                        ? 'text-white/60'
                        : 'text-[var(--color-foreground-subtle)]'
                    }`}
                  >
                    {tier.billingPeriod}
                  </span>
                )}
              </div>

              {tier.features && tier.features.length > 0 && (
                <ul className="mb-[var(--spacing-24)] flex-grow space-y-[var(--spacing-12)]">
                  {tier.features.map((feature, index) => (
                    <li
                      key={index}
                      className={`flex items-start gap-[var(--spacing-8)] text-[var(--text-body-2)] leading-[var(--leading-m)] ${
                        tier.highlighted
                          ? 'text-white/90'
                          : 'text-[var(--color-foreground-subtle)]'
                      }`}
                    >
                      <svg
                        className={`mt-0.5 h-4 w-4 flex-shrink-0 ${
                          tier.highlighted
                            ? 'text-[var(--color-button-yellow)]'
                            : 'text-[var(--color-foreground-base)]'
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              )}

              {tier.cta && tier.cta.label && tier.cta.href && (
                <div className="mt-auto">
                  <Button
                    variant={tier.highlighted ? 'yellow' : 'dark'}
                    size="l"
                    href={tier.cta.href}
                    className="w-full"
                  >
                    {tier.cta.label}
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
